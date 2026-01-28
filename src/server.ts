import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Octokit } from '@octokit/rest';
import { createToolGenerator, ToolGenerator } from './tools/generator.js';

/**
 * Server startup options
 */
export interface ServerOptions {
  /** Categories to load (default: all) */
  categories?: string[];
}

/**
 * Start the MCP server with authenticated Octokit
 */
export async function startServer(
  token: string,
  options: ServerOptions = {}
): Promise<void> {
  const octokit = new Octokit({ auth: token });

  // Verify token works
  try {
    const { data: user } = await octokit.users.getAuthenticated();
    console.error(`Authenticated as ${user.login}`);
  } catch (error) {
    throw new Error('Failed to authenticate with GitHub. Token may be invalid.');
  }

  // Initialize tool generator with specified categories
  const generator = createToolGenerator(options.categories);

  const server = new Server(
    {
      name: 'github-mcp',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: generator.getTools(),
    };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    return generator.executeTool(octokit, name, args ?? {});
  });

  // Connect via stdio
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('MCP server started');
}
