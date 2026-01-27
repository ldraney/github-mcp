import { Octokit } from '@octokit/rest';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const searchTools: Tool[] = [
  {
    name: 'github_search_repos',
    description: 'Search repositories',
    inputSchema: {
      type: 'object',
      properties: {
        q: {
          type: 'string',
          description: 'Search query. Use qualifiers like language:javascript, stars:>1000, user:username',
        },
        sort: {
          type: 'string',
          enum: ['stars', 'forks', 'help-wanted-issues', 'updated'],
          description: 'Sort field',
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
        },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['q'],
    },
  },
  {
    name: 'github_search_code',
    description: 'Search code in repositories',
    inputSchema: {
      type: 'object',
      properties: {
        q: {
          type: 'string',
          description: 'Search query. Use qualifiers like repo:owner/name, language:python, extension:py',
        },
        sort: {
          type: 'string',
          enum: ['indexed'],
          description: 'Sort field',
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
        },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['q'],
    },
  },
  {
    name: 'github_search_issues',
    description: 'Search issues and pull requests',
    inputSchema: {
      type: 'object',
      properties: {
        q: {
          type: 'string',
          description: 'Search query. Use qualifiers like repo:owner/name, is:issue, is:pr, state:open, label:bug',
        },
        sort: {
          type: 'string',
          enum: ['comments', 'reactions', 'reactions-+1', 'reactions--1', 'reactions-smile', 'reactions-thinking_face', 'reactions-heart', 'reactions-tada', 'interactions', 'created', 'updated'],
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
        },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['q'],
    },
  },
  {
    name: 'github_search_users',
    description: 'Search users',
    inputSchema: {
      type: 'object',
      properties: {
        q: {
          type: 'string',
          description: 'Search query. Use qualifiers like type:user, type:org, location:city, followers:>100',
        },
        sort: {
          type: 'string',
          enum: ['followers', 'repositories', 'joined'],
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
        },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['q'],
    },
  },
  {
    name: 'github_search_commits',
    description: 'Search commits',
    inputSchema: {
      type: 'object',
      properties: {
        q: {
          type: 'string',
          description: 'Search query. Use qualifiers like repo:owner/name, author:username, committer:username',
        },
        sort: {
          type: 'string',
          enum: ['author-date', 'committer-date'],
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
        },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['q'],
    },
  },
  {
    name: 'github_search_topics',
    description: 'Search topics',
    inputSchema: {
      type: 'object',
      properties: {
        q: {
          type: 'string',
          description: 'Search query for topics',
        },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['q'],
    },
  },
  {
    name: 'github_search_labels',
    description: 'Search labels in a repository',
    inputSchema: {
      type: 'object',
      properties: {
        repository_id: { type: 'number', description: 'Repository ID to search in' },
        q: {
          type: 'string',
          description: 'Search query for labels',
        },
        sort: {
          type: 'string',
          enum: ['created', 'updated'],
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
        },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['repository_id', 'q'],
    },
  },
];

export async function handleSearchTool(
  octokit: Octokit,
  args: Record<string, unknown>
): Promise<unknown> {
  const q = args.q as string;

  // Determine search type based on args or query content
  if ('repository_id' in args) {
    const { data } = await octokit.search.labels(args as Parameters<typeof octokit.search.labels>[0]);
    return data;
  }

  // Check for type hints in the query or sort field
  const sort = args.sort as string | undefined;

  if (sort === 'indexed') {
    const { data } = await octokit.search.code(args as Parameters<typeof octokit.search.code>[0]);
    return data;
  }

  if (sort === 'author-date' || sort === 'committer-date') {
    const { data } = await octokit.search.commits(args as Parameters<typeof octokit.search.commits>[0]);
    return data;
  }

  if (sort === 'followers' || sort === 'repositories' || sort === 'joined') {
    const { data } = await octokit.search.users(args as Parameters<typeof octokit.search.users>[0]);
    return data;
  }

  if (sort === 'comments' || sort === 'reactions' || sort === 'interactions' || sort?.startsWith('reactions-')) {
    const { data } = await octokit.search.issuesAndPullRequests(args as Parameters<typeof octokit.search.issuesAndPullRequests>[0]);
    return data;
  }

  if (sort === 'stars' || sort === 'forks' || sort === 'help-wanted-issues' || sort === 'updated') {
    const { data } = await octokit.search.repos(args as Parameters<typeof octokit.search.repos>[0]);
    return data;
  }

  // Check query content for hints
  const lowerQ = q.toLowerCase();

  if (lowerQ.includes('is:issue') || lowerQ.includes('is:pr') || lowerQ.includes('is:open') || lowerQ.includes('is:closed') || lowerQ.includes('label:')) {
    const { data } = await octokit.search.issuesAndPullRequests(args as Parameters<typeof octokit.search.issuesAndPullRequests>[0]);
    return data;
  }

  if (lowerQ.includes('type:user') || lowerQ.includes('type:org') || lowerQ.includes('followers:') || lowerQ.includes('location:')) {
    const { data } = await octokit.search.users(args as Parameters<typeof octokit.search.users>[0]);
    return data;
  }

  if (lowerQ.includes('author:') || lowerQ.includes('committer:') || lowerQ.includes('author-date:') || lowerQ.includes('committer-date:')) {
    const { data } = await octokit.search.commits(args as Parameters<typeof octokit.search.commits>[0]);
    return data;
  }

  if (lowerQ.includes('extension:') || lowerQ.includes('filename:') || lowerQ.includes('path:') || (lowerQ.includes('repo:') && !lowerQ.includes('is:'))) {
    const { data } = await octokit.search.code(args as Parameters<typeof octokit.search.code>[0]);
    return data;
  }

  // Default: search repos
  const { data } = await octokit.search.repos(args as Parameters<typeof octokit.search.repos>[0]);
  return data;
}
