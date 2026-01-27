import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Octokit } from '@octokit/rest';
import { getToken } from './auth/token-storage.js';
import { login } from './auth/oauth-device-flow.js';
import { registerTools, handleToolCall, getToolDefinitions } from './tools/generator.js';
import { startWebhookClient, getWebhookResources, getWebhookEvents } from './webhooks/smee-client.js';

export interface ServerOptions {
  smeeUrl?: string;
  categories?: string;
}

export async function startServer(options: ServerOptions = {}): Promise<void> {
  // Get authentication token
  let token: string | undefined = process.env.GITHUB_TOKEN;

  if (!token) {
    const storedToken = await getToken();
    token = storedToken ?? undefined;
  }

  if (!token) {
    console.error('No GitHub token found. Running OAuth login flow...');
    const newToken = await login();
    token = newToken ?? undefined;
    if (!token) {
      console.error('Authentication failed. Please run: github-mcp auth login');
      process.exit(1);
    }
  }

  // Initialize Octokit
  const octokit = new Octokit({ auth: token });

  // Verify token works
  try {
    const { data: user } = await octokit.users.getAuthenticated();
    console.error(`Authenticated as: ${user.login}`);
  } catch (error) {
    console.error('Token validation failed. Please re-authenticate.');
    process.exit(1);
  }

  // Parse enabled categories
  const enabledCategories = options.categories
    ? options.categories.split(',').map(c => c.trim())
    : undefined;

  // Register tools
  registerTools(octokit, enabledCategories);

  // Start webhook client if smee URL provided
  if (options.smeeUrl) {
    startWebhookClient(options.smeeUrl);
  }

  // Create MCP server
  const server = new Server(
    {
      name: 'github-mcp',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
        resources: options.smeeUrl ? {} : undefined,
      },
    }
  );

  // Handle list tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: getToolDefinitions(),
    };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      const result = await handleToolCall(name, args || {});
      return {
        content: [
          {
            type: 'text',
            text: typeof result === 'string' ? result : JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${message}`,
          },
        ],
        isError: true,
      };
    }
  });

  // Handle list resources (webhooks)
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: getWebhookResources(),
    };
  });

  // Handle read resource
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    const events = getWebhookEvents(uri);

    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(events, null, 2),
        },
      ],
    };
  });

  // Start server with stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('GitHub MCP server started');
}
