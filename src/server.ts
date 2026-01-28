import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Octokit } from '@octokit/rest';
import { createToolGenerator, ToolGenerator } from './tools/generator.js';
import { activityPrompts, getActivityPrompt } from './prompts/activity-summary.js';
import { codeReviewPrompts, getCodeReviewPrompt } from './prompts/code-review.js';
import { issueTriagePrompts, getIssueTriagePrompt } from './prompts/issue-triage.js';
import { releaseNotesPrompts, getReleaseNotesPrompt } from './prompts/release-notes.js';
import { helpPrompts, getHelpPrompt } from './prompts/help.js';

// Combine all prompts
const allPrompts = [
  ...helpPrompts,
  ...activityPrompts,
  ...codeReviewPrompts,
  ...issueTriagePrompts,
  ...releaseNotesPrompts,
];

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
        prompts: {},
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

  // List available prompts
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
      prompts: allPrompts,
    };
  });

  // Handle prompt requests
  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const promptArgs = args ?? {};

    // Try each prompt handler
    const result =
      getHelpPrompt(name, promptArgs) ??
      getCodeReviewPrompt(name, promptArgs) ??
      getIssueTriagePrompt(name, promptArgs) ??
      getReleaseNotesPrompt(name, promptArgs) ??
      getActivityPrompt(name, promptArgs);

    return result;
  });

  // Connect via stdio
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('MCP server started');
}
