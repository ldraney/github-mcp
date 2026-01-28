import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const searchCategory: ToolCategory = {
  name: 'search',
  description: 'GitHub search tools',
  tools: [
    // repos - Search repositories
    {
      definition: {
        name: 'github_search_repos',
        description: 'Search for repositories on GitHub',
        inputSchema: {
          type: 'object',
          properties: {
            q: {
              type: 'string',
              description: 'Search query (e.g., "tetris language:assembly")',
            },
            sort: {
              type: 'string',
              enum: ['stars', 'forks', 'help-wanted-issues', 'updated'],
              description: 'Sort field',
            },
            order: {
              type: 'string',
              enum: ['asc', 'desc'],
              description: 'Sort order',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
          },
          required: ['q'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.search.repos({
          q: args.q as string,
          sort: args.sort as 'stars' | 'forks' | 'help-wanted-issues' | 'updated' | undefined,
          order: args.order as 'asc' | 'desc' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // code - Search code
    {
      definition: {
        name: 'github_search_code',
        description: 'Search for code across GitHub repositories',
        inputSchema: {
          type: 'object',
          properties: {
            q: {
              type: 'string',
              description: 'Search query (e.g., "addClass in:file language:js repo:jquery/jquery")',
            },
            sort: {
              type: 'string',
              enum: ['indexed'],
              description: 'Sort field (only indexed is supported)',
            },
            order: {
              type: 'string',
              enum: ['asc', 'desc'],
              description: 'Sort order',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
          },
          required: ['q'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.search.code({
          q: args.q as string,
          sort: args.sort as 'indexed' | undefined,
          order: args.order as 'asc' | 'desc' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // issues_and_pull_requests - Search issues and PRs
    {
      definition: {
        name: 'github_search_issues_and_pull_requests',
        description: 'Search for issues and pull requests across GitHub',
        inputSchema: {
          type: 'object',
          properties: {
            q: {
              type: 'string',
              description: 'Search query (e.g., "repo:octocat/hello-world is:open is:issue")',
            },
            sort: {
              type: 'string',
              enum: ['comments', 'reactions', 'reactions-+1', 'reactions--1', 'reactions-smile', 'reactions-thinking_face', 'reactions-heart', 'reactions-tada', 'interactions', 'created', 'updated'],
              description: 'Sort field',
            },
            order: {
              type: 'string',
              enum: ['asc', 'desc'],
              description: 'Sort order',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
          },
          required: ['q'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.search.issuesAndPullRequests({
          q: args.q as string,
          sort: args.sort as 'comments' | 'reactions' | 'reactions-+1' | 'reactions--1' | 'reactions-smile' | 'reactions-thinking_face' | 'reactions-heart' | 'reactions-tada' | 'interactions' | 'created' | 'updated' | undefined,
          order: args.order as 'asc' | 'desc' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // users - Search users
    {
      definition: {
        name: 'github_search_users',
        description: 'Search for users on GitHub',
        inputSchema: {
          type: 'object',
          properties: {
            q: {
              type: 'string',
              description: 'Search query (e.g., "tom repos:>42 followers:>1000")',
            },
            sort: {
              type: 'string',
              enum: ['followers', 'repositories', 'joined'],
              description: 'Sort field',
            },
            order: {
              type: 'string',
              enum: ['asc', 'desc'],
              description: 'Sort order',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
          },
          required: ['q'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.search.users({
          q: args.q as string,
          sort: args.sort as 'followers' | 'repositories' | 'joined' | undefined,
          order: args.order as 'asc' | 'desc' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // commits - Search commits
    {
      definition: {
        name: 'github_search_commits',
        description: 'Search for commits across GitHub repositories',
        inputSchema: {
          type: 'object',
          properties: {
            q: {
              type: 'string',
              description: 'Search query (e.g., "repo:octocat/hello-world css")',
            },
            sort: {
              type: 'string',
              enum: ['author-date', 'committer-date'],
              description: 'Sort field',
            },
            order: {
              type: 'string',
              enum: ['asc', 'desc'],
              description: 'Sort order',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
          },
          required: ['q'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.search.commits({
          q: args.q as string,
          sort: args.sort as 'author-date' | 'committer-date' | undefined,
          order: args.order as 'asc' | 'desc' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // topics - Search topics
    {
      definition: {
        name: 'github_search_topics',
        description: 'Search for topics on GitHub',
        inputSchema: {
          type: 'object',
          properties: {
            q: {
              type: 'string',
              description: 'Search query (e.g., "ruby is:featured")',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
          },
          required: ['q'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.search.topics({
          q: args.q as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // labels - Search labels
    {
      definition: {
        name: 'github_search_labels',
        description: 'Search for labels in a repository',
        inputSchema: {
          type: 'object',
          properties: {
            repository_id: {
              type: 'number',
              description: 'The ID of the repository to search labels in',
            },
            q: {
              type: 'string',
              description: 'Search query for label names and descriptions',
            },
            sort: {
              type: 'string',
              enum: ['created', 'updated'],
              description: 'Sort field',
            },
            order: {
              type: 'string',
              enum: ['asc', 'desc'],
              description: 'Sort order',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
          },
          required: ['repository_id', 'q'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.search.labels({
          repository_id: args.repository_id as number,
          q: args.q as string,
          sort: args.sort as 'created' | 'updated' | undefined,
          order: args.order as 'asc' | 'desc' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },
  ],
};
