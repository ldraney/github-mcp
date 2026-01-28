import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Octokit } from '@octokit/rest';

/**
 * Start the MCP server with authenticated Octokit
 */
export async function startServer(token: string): Promise<void> {
  const octokit = new Octokit({ auth: token });

  // Verify token works
  try {
    const { data: user } = await octokit.users.getAuthenticated();
    console.error(`Authenticated as ${user.login}`);
  } catch (error) {
    throw new Error('Failed to authenticate with GitHub. Token may be invalid.');
  }

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
      tools: [
        {
          name: 'github_repos_list',
          description: 'List repositories for the authenticated user',
          inputSchema: {
            type: 'object',
            properties: {
              visibility: {
                type: 'string',
                enum: ['all', 'public', 'private'],
                description: 'Filter by visibility',
              },
              sort: {
                type: 'string',
                enum: ['created', 'updated', 'pushed', 'full_name'],
                description: 'Sort field',
              },
              per_page: {
                type: 'number',
                description: 'Results per page (max 100)',
              },
            },
          },
        },
        {
          name: 'github_repos_get',
          description: 'Get a repository by owner and name',
          inputSchema: {
            type: 'object',
            properties: {
              owner: {
                type: 'string',
                description: 'Repository owner',
              },
              repo: {
                type: 'string',
                description: 'Repository name',
              },
            },
            required: ['owner', 'repo'],
          },
        },
        {
          name: 'github_issues_list',
          description: 'List issues for a repository',
          inputSchema: {
            type: 'object',
            properties: {
              owner: {
                type: 'string',
                description: 'Repository owner',
              },
              repo: {
                type: 'string',
                description: 'Repository name',
              },
              state: {
                type: 'string',
                enum: ['open', 'closed', 'all'],
                description: 'Issue state filter',
              },
              per_page: {
                type: 'number',
                description: 'Results per page (max 100)',
              },
            },
            required: ['owner', 'repo'],
          },
        },
        {
          name: 'github_issues_create',
          description: 'Create a new issue',
          inputSchema: {
            type: 'object',
            properties: {
              owner: {
                type: 'string',
                description: 'Repository owner',
              },
              repo: {
                type: 'string',
                description: 'Repository name',
              },
              title: {
                type: 'string',
                description: 'Issue title',
              },
              body: {
                type: 'string',
                description: 'Issue body',
              },
              labels: {
                type: 'array',
                items: { type: 'string' },
                description: 'Labels to add',
              },
            },
            required: ['owner', 'repo', 'title'],
          },
        },
        {
          name: 'github_pulls_list',
          description: 'List pull requests for a repository',
          inputSchema: {
            type: 'object',
            properties: {
              owner: {
                type: 'string',
                description: 'Repository owner',
              },
              repo: {
                type: 'string',
                description: 'Repository name',
              },
              state: {
                type: 'string',
                enum: ['open', 'closed', 'all'],
                description: 'PR state filter',
              },
              per_page: {
                type: 'number',
                description: 'Results per page (max 100)',
              },
            },
            required: ['owner', 'repo'],
          },
        },
        {
          name: 'github_user_get',
          description: 'Get the authenticated user',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
      ],
    };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case 'github_repos_list': {
          const { data } = await octokit.repos.listForAuthenticatedUser({
            visibility: args?.visibility as 'all' | 'public' | 'private' | undefined,
            sort: args?.sort as 'created' | 'updated' | 'pushed' | 'full_name' | undefined,
            per_page: args?.per_page as number | undefined,
          });
          return {
            content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
          };
        }

        case 'github_repos_get': {
          const { data } = await octokit.repos.get({
            owner: args?.owner as string,
            repo: args?.repo as string,
          });
          return {
            content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
          };
        }

        case 'github_issues_list': {
          const { data } = await octokit.issues.listForRepo({
            owner: args?.owner as string,
            repo: args?.repo as string,
            state: args?.state as 'open' | 'closed' | 'all' | undefined,
            per_page: args?.per_page as number | undefined,
          });
          return {
            content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
          };
        }

        case 'github_issues_create': {
          const { data } = await octokit.issues.create({
            owner: args?.owner as string,
            repo: args?.repo as string,
            title: args?.title as string,
            body: args?.body as string | undefined,
            labels: args?.labels as string[] | undefined,
          });
          return {
            content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
          };
        }

        case 'github_pulls_list': {
          const { data } = await octokit.pulls.list({
            owner: args?.owner as string,
            repo: args?.repo as string,
            state: args?.state as 'open' | 'closed' | 'all' | undefined,
            per_page: args?.per_page as number | undefined,
          });
          return {
            content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
          };
        }

        case 'github_user_get': {
          const { data } = await octokit.users.getAuthenticated();
          return {
            content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
          };
        }

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: 'text', text: `Error: ${message}` }],
        isError: true,
      };
    }
  });

  // Connect via stdio
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('MCP server started');
}
