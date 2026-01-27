import { Octokit } from '@octokit/rest';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const pullsTools: Tool[] = [
  {
    name: 'github_pulls_list',
    description: 'List pull requests for a repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        state: {
          type: 'string',
          enum: ['open', 'closed', 'all'],
          description: 'Filter by state',
        },
        head: { type: 'string', description: 'Filter by head user:ref-name' },
        base: { type: 'string', description: 'Filter by base branch' },
        sort: {
          type: 'string',
          enum: ['created', 'updated', 'popularity', 'long-running'],
        },
        direction: {
          type: 'string',
          enum: ['asc', 'desc'],
        },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_pulls_get',
    description: 'Get a specific pull request',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pull_number: { type: 'number', description: 'Pull request number' },
      },
      required: ['owner', 'repo', 'pull_number'],
    },
  },
  {
    name: 'github_pulls_create',
    description: 'Create a pull request',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        title: { type: 'string', description: 'PR title' },
        head: { type: 'string', description: 'Branch containing changes' },
        base: { type: 'string', description: 'Branch to merge into' },
        body: { type: 'string', description: 'PR description' },
        draft: { type: 'boolean', description: 'Create as draft PR' },
        maintainer_can_modify: { type: 'boolean', description: 'Allow maintainer edits' },
      },
      required: ['owner', 'repo', 'title', 'head', 'base'],
    },
  },
  {
    name: 'github_pulls_update',
    description: 'Update a pull request',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pull_number: { type: 'number', description: 'Pull request number' },
        title: { type: 'string', description: 'PR title' },
        body: { type: 'string', description: 'PR description' },
        state: {
          type: 'string',
          enum: ['open', 'closed'],
        },
        base: { type: 'string', description: 'New base branch' },
        maintainer_can_modify: { type: 'boolean' },
      },
      required: ['owner', 'repo', 'pull_number'],
    },
  },
  {
    name: 'github_pulls_merge',
    description: 'Merge a pull request',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pull_number: { type: 'number', description: 'Pull request number' },
        commit_title: { type: 'string', description: 'Merge commit title' },
        commit_message: { type: 'string', description: 'Merge commit message' },
        sha: { type: 'string', description: 'SHA that head must match to merge' },
        merge_method: {
          type: 'string',
          enum: ['merge', 'squash', 'rebase'],
          description: 'Merge method to use',
        },
      },
      required: ['owner', 'repo', 'pull_number'],
    },
  },
  {
    name: 'github_pulls_listFiles',
    description: 'List files changed in a pull request',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pull_number: { type: 'number', description: 'Pull request number' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo', 'pull_number'],
    },
  },
  {
    name: 'github_pulls_listCommits',
    description: 'List commits in a pull request',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pull_number: { type: 'number', description: 'Pull request number' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo', 'pull_number'],
    },
  },
  {
    name: 'github_pulls_listReviews',
    description: 'List reviews on a pull request',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pull_number: { type: 'number', description: 'Pull request number' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo', 'pull_number'],
    },
  },
  {
    name: 'github_pulls_createReview',
    description: 'Create a review on a pull request',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pull_number: { type: 'number', description: 'Pull request number' },
        commit_id: { type: 'string', description: 'SHA of commit to review' },
        body: { type: 'string', description: 'Review comment body' },
        event: {
          type: 'string',
          enum: ['APPROVE', 'REQUEST_CHANGES', 'COMMENT'],
          description: 'Review action',
        },
        comments: {
          type: 'array',
          description: 'Line comments for the review',
          items: {
            type: 'object',
            properties: {
              path: { type: 'string', description: 'File path' },
              position: { type: 'number', description: 'Line position in diff' },
              body: { type: 'string', description: 'Comment text' },
            },
            required: ['path', 'body'],
          },
        },
      },
      required: ['owner', 'repo', 'pull_number'],
    },
  },
  {
    name: 'github_pulls_listReviewComments',
    description: 'List review comments on a pull request',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pull_number: { type: 'number', description: 'Pull request number' },
        sort: {
          type: 'string',
          enum: ['created', 'updated'],
        },
        direction: {
          type: 'string',
          enum: ['asc', 'desc'],
        },
        since: { type: 'string', description: 'ISO 8601 date' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo', 'pull_number'],
    },
  },
  {
    name: 'github_pulls_createReviewComment',
    description: 'Create a review comment on a pull request',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pull_number: { type: 'number', description: 'Pull request number' },
        body: { type: 'string', description: 'Comment text' },
        commit_id: { type: 'string', description: 'SHA of commit to comment on' },
        path: { type: 'string', description: 'File path' },
        line: { type: 'number', description: 'Line number in file' },
        side: {
          type: 'string',
          enum: ['LEFT', 'RIGHT'],
          description: 'Side of the diff',
        },
        start_line: { type: 'number', description: 'Start line for multi-line comment' },
        start_side: {
          type: 'string',
          enum: ['LEFT', 'RIGHT'],
        },
      },
      required: ['owner', 'repo', 'pull_number', 'body', 'commit_id', 'path'],
    },
  },
  {
    name: 'github_pulls_requestReviewers',
    description: 'Request reviewers for a pull request',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pull_number: { type: 'number', description: 'Pull request number' },
        reviewers: {
          type: 'array',
          items: { type: 'string' },
          description: 'Usernames to request review from',
        },
        team_reviewers: {
          type: 'array',
          items: { type: 'string' },
          description: 'Team slugs to request review from',
        },
      },
      required: ['owner', 'repo', 'pull_number'],
    },
  },
  {
    name: 'github_pulls_listRequestedReviewers',
    description: 'List requested reviewers for a pull request',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pull_number: { type: 'number', description: 'Pull request number' },
      },
      required: ['owner', 'repo', 'pull_number'],
    },
  },
  {
    name: 'github_pulls_checkMerged',
    description: 'Check if a pull request has been merged',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pull_number: { type: 'number', description: 'Pull request number' },
      },
      required: ['owner', 'repo', 'pull_number'],
    },
  },
  {
    name: 'github_pulls_updateBranch',
    description: 'Update a pull request branch with latest base',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        pull_number: { type: 'number', description: 'Pull request number' },
        expected_head_sha: { type: 'string', description: 'Expected SHA of head ref' },
      },
      required: ['owner', 'repo', 'pull_number'],
    },
  },
];

export async function handlePullsTool(
  octokit: Octokit,
  args: Record<string, unknown>
): Promise<unknown> {
  const owner = args.owner as string;
  const repo = args.repo as string;
  const pullNumber = args.pull_number as number | undefined;

  // List pull requests
  if (!pullNumber && !('title' in args)) {
    const { data } = await octokit.pulls.list(args as Parameters<typeof octokit.pulls.list>[0]);
    return data;
  }

  // Create pull request
  if ('title' in args && 'head' in args && 'base' in args && !pullNumber) {
    const { data } = await octokit.pulls.create(args as Parameters<typeof octokit.pulls.create>[0]);
    return data;
  }

  // Get pull request
  if (pullNumber && !('title' in args) && !('body' in args) && !('merge_method' in args) && !('event' in args) && !('reviewers' in args) && !('expected_head_sha' in args) && !('path' in args) && !('commit_id' in args)) {
    // Could be get, listFiles, listCommits, listReviews, listReviewComments, listRequestedReviewers, checkMerged
    if ('sort' in args || 'since' in args) {
      const { data } = await octokit.pulls.listReviewComments(args as Parameters<typeof octokit.pulls.listReviewComments>[0]);
      return data;
    }
    const { data } = await octokit.pulls.get(args as Parameters<typeof octokit.pulls.get>[0]);
    return data;
  }

  // Update pull request
  if (pullNumber && ('title' in args || ('body' in args && !('event' in args) && !('path' in args)) || 'state' in args)) {
    const { data } = await octokit.pulls.update(args as Parameters<typeof octokit.pulls.update>[0]);
    return data;
  }

  // Merge pull request
  if (pullNumber && 'merge_method' in args) {
    const { data } = await octokit.pulls.merge(args as Parameters<typeof octokit.pulls.merge>[0]);
    return data;
  }

  // List files
  if (pullNumber && Object.keys(args).filter(k => !['owner', 'repo', 'pull_number', 'per_page', 'page'].includes(k)).length === 0) {
    const { data } = await octokit.pulls.listFiles(args as Parameters<typeof octokit.pulls.listFiles>[0]);
    return data;
  }

  // Create review
  if (pullNumber && 'event' in args) {
    const { data } = await octokit.pulls.createReview(args as Parameters<typeof octokit.pulls.createReview>[0]);
    return data;
  }

  // Create review comment
  if (pullNumber && 'body' in args && 'path' in args && 'commit_id' in args) {
    const { data } = await octokit.pulls.createReviewComment(args as Parameters<typeof octokit.pulls.createReviewComment>[0]);
    return data;
  }

  // Request reviewers
  if (pullNumber && ('reviewers' in args || 'team_reviewers' in args)) {
    const { data } = await octokit.pulls.requestReviewers(args as Parameters<typeof octokit.pulls.requestReviewers>[0]);
    return data;
  }

  // Update branch
  if (pullNumber && 'expected_head_sha' in args) {
    const { data } = await octokit.pulls.updateBranch(args as Parameters<typeof octokit.pulls.updateBranch>[0]);
    return data;
  }

  // Check merged
  if (pullNumber) {
    try {
      await octokit.pulls.checkIfMerged({ owner, repo, pull_number: pullNumber });
      return { merged: true };
    } catch {
      return { merged: false };
    }
  }

  // Default: list
  const { data } = await octokit.pulls.list({ owner, repo });
  return data;
}
