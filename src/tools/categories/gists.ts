import { Octokit } from '@octokit/rest';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const gistsTools: Tool[] = [
  {
    name: 'github_gists_list',
    description: 'List gists for the authenticated user',
    inputSchema: {
      type: 'object',
      properties: {
        since: { type: 'string', description: 'ISO 8601 date - only gists updated after this' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
    },
  },
  {
    name: 'github_gists_listForUser',
    description: 'List public gists for a user',
    inputSchema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'GitHub username' },
        since: { type: 'string', description: 'ISO 8601 date' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['username'],
    },
  },
  {
    name: 'github_gists_listPublic',
    description: 'List public gists',
    inputSchema: {
      type: 'object',
      properties: {
        since: { type: 'string', description: 'ISO 8601 date' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
    },
  },
  {
    name: 'github_gists_listStarred',
    description: 'List starred gists for the authenticated user',
    inputSchema: {
      type: 'object',
      properties: {
        since: { type: 'string', description: 'ISO 8601 date' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
    },
  },
  {
    name: 'github_gists_get',
    description: 'Get a specific gist',
    inputSchema: {
      type: 'object',
      properties: {
        gist_id: { type: 'string', description: 'Gist ID' },
      },
      required: ['gist_id'],
    },
  },
  {
    name: 'github_gists_create',
    description: 'Create a gist',
    inputSchema: {
      type: 'object',
      properties: {
        description: { type: 'string', description: 'Gist description' },
        files: {
          type: 'object',
          description: 'Files in the gist. Keys are filenames, values are objects with content property',
          additionalProperties: {
            type: 'object',
            properties: {
              content: { type: 'string', description: 'File content' },
            },
            required: ['content'],
          },
        },
        public: { type: 'boolean', description: 'Whether the gist is public' },
      },
      required: ['files'],
    },
  },
  {
    name: 'github_gists_update',
    description: 'Update a gist',
    inputSchema: {
      type: 'object',
      properties: {
        gist_id: { type: 'string', description: 'Gist ID' },
        description: { type: 'string', description: 'Gist description' },
        files: {
          type: 'object',
          description: 'Files to update. Set content to empty string to delete, or provide new content',
          additionalProperties: {
            type: 'object',
            properties: {
              content: { type: 'string', description: 'File content' },
              filename: { type: 'string', description: 'New filename to rename to' },
            },
          },
        },
      },
      required: ['gist_id'],
    },
  },
  {
    name: 'github_gists_delete',
    description: 'Delete a gist',
    inputSchema: {
      type: 'object',
      properties: {
        gist_id: { type: 'string', description: 'Gist ID' },
      },
      required: ['gist_id'],
    },
  },
  {
    name: 'github_gists_star',
    description: 'Star a gist',
    inputSchema: {
      type: 'object',
      properties: {
        gist_id: { type: 'string', description: 'Gist ID' },
      },
      required: ['gist_id'],
    },
  },
  {
    name: 'github_gists_unstar',
    description: 'Unstar a gist',
    inputSchema: {
      type: 'object',
      properties: {
        gist_id: { type: 'string', description: 'Gist ID' },
      },
      required: ['gist_id'],
    },
  },
  {
    name: 'github_gists_checkIsStarred',
    description: 'Check if a gist is starred',
    inputSchema: {
      type: 'object',
      properties: {
        gist_id: { type: 'string', description: 'Gist ID' },
      },
      required: ['gist_id'],
    },
  },
  {
    name: 'github_gists_fork',
    description: 'Fork a gist',
    inputSchema: {
      type: 'object',
      properties: {
        gist_id: { type: 'string', description: 'Gist ID' },
      },
      required: ['gist_id'],
    },
  },
  {
    name: 'github_gists_listForks',
    description: 'List forks of a gist',
    inputSchema: {
      type: 'object',
      properties: {
        gist_id: { type: 'string', description: 'Gist ID' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['gist_id'],
    },
  },
  {
    name: 'github_gists_listComments',
    description: 'List comments on a gist',
    inputSchema: {
      type: 'object',
      properties: {
        gist_id: { type: 'string', description: 'Gist ID' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['gist_id'],
    },
  },
  {
    name: 'github_gists_createComment',
    description: 'Create a comment on a gist',
    inputSchema: {
      type: 'object',
      properties: {
        gist_id: { type: 'string', description: 'Gist ID' },
        body: { type: 'string', description: 'Comment body' },
      },
      required: ['gist_id', 'body'],
    },
  },
  {
    name: 'github_gists_getRevision',
    description: 'Get a specific revision of a gist',
    inputSchema: {
      type: 'object',
      properties: {
        gist_id: { type: 'string', description: 'Gist ID' },
        sha: { type: 'string', description: 'Revision SHA' },
      },
      required: ['gist_id', 'sha'],
    },
  },
  {
    name: 'github_gists_listCommits',
    description: 'List commits for a gist',
    inputSchema: {
      type: 'object',
      properties: {
        gist_id: { type: 'string', description: 'Gist ID' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['gist_id'],
    },
  },
];

export async function handleGistsTool(
  octokit: Octokit,
  args: Record<string, unknown>
): Promise<unknown> {
  const gistId = args.gist_id as string | undefined;
  const username = args.username as string | undefined;

  // List for authenticated user
  if (!gistId && !username && !('public' in args) && !('starred' in args)) {
    const { data } = await octokit.gists.list(args as Parameters<typeof octokit.gists.list>[0]);
    return data;
  }

  // List for user
  if (username) {
    const { data } = await octokit.gists.listForUser(args as Parameters<typeof octokit.gists.listForUser>[0]);
    return data;
  }

  // List public
  if ('public' in args) {
    const { data } = await octokit.gists.listPublic(args as Parameters<typeof octokit.gists.listPublic>[0]);
    return data;
  }

  // List starred
  if ('starred' in args) {
    const { data } = await octokit.gists.listStarred(args as Parameters<typeof octokit.gists.listStarred>[0]);
    return data;
  }

  // Get gist
  if (gistId && !('files' in args) && !('description' in args) && !('body' in args) && !('sha' in args) && Object.keys(args).filter(k => !['gist_id', 'per_page', 'page'].includes(k)).length === 0) {
    // Could be get, listComments, listForks, listCommits
    if ('per_page' in args || 'page' in args) {
      const { data } = await octokit.gists.listComments(args as Parameters<typeof octokit.gists.listComments>[0]);
      return data;
    }
    const { data } = await octokit.gists.get({ gist_id: gistId });
    return data;
  }

  // Create gist
  if ('files' in args && !gistId) {
    const { data } = await octokit.gists.create(args as Parameters<typeof octokit.gists.create>[0]);
    return data;
  }

  // Update gist
  if (gistId && ('files' in args || 'description' in args)) {
    const { data } = await octokit.gists.update(args as Parameters<typeof octokit.gists.update>[0]);
    return data;
  }

  // Delete gist
  if (gistId && Object.keys(args).length === 1) {
    await octokit.gists.delete({ gist_id: gistId });
    return { success: true, message: 'Gist deleted' };
  }

  // Star gist
  if (gistId && 'star' in args) {
    await octokit.gists.star({ gist_id: gistId });
    return { success: true, message: 'Gist starred' };
  }

  // Unstar gist
  if (gistId && 'unstar' in args) {
    await octokit.gists.unstar({ gist_id: gistId });
    return { success: true, message: 'Gist unstarred' };
  }

  // Check if starred
  if (gistId && 'check_starred' in args) {
    try {
      await octokit.gists.checkIsStarred({ gist_id: gistId });
      return { starred: true };
    } catch {
      return { starred: false };
    }
  }

  // Fork gist
  if (gistId && 'fork' in args) {
    const { data } = await octokit.gists.fork({ gist_id: gistId });
    return data;
  }

  // Create comment
  if (gistId && 'body' in args) {
    const { data } = await octokit.gists.createComment(args as Parameters<typeof octokit.gists.createComment>[0]);
    return data;
  }

  // Get revision
  if (gistId && 'sha' in args) {
    const { data } = await octokit.gists.getRevision(args as Parameters<typeof octokit.gists.getRevision>[0]);
    return data;
  }

  // Default: list for authenticated user
  const { data } = await octokit.gists.list();
  return data;
}
