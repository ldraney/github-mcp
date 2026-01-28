import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const gistsCategory: ToolCategory = {
  name: 'gists',
  description: 'GitHub gist tools',
  tools: [
    // list - List gists for authenticated user
    {
      definition: {
        name: 'github_gists_list',
        description: 'List gists for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            since: {
              type: 'string',
              description: 'Only show gists updated after this time (ISO 8601 format)',
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
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.gists.list({
          since: args.since as string | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_public - List public gists
    {
      definition: {
        name: 'github_gists_list_public',
        description: 'List all public gists',
        inputSchema: {
          type: 'object',
          properties: {
            since: {
              type: 'string',
              description: 'Only show gists updated after this time (ISO 8601 format)',
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
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.gists.listPublic({
          since: args.since as string | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_starred - List starred gists
    {
      definition: {
        name: 'github_gists_list_starred',
        description: 'List starred gists for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            since: {
              type: 'string',
              description: 'Only show gists updated after this time (ISO 8601 format)',
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
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.gists.listStarred({
          since: args.since as string | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_for_user - List gists for a user
    {
      definition: {
        name: 'github_gists_list_for_user',
        description: 'List public gists for a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'GitHub username',
            },
            since: {
              type: 'string',
              description: 'Only show gists updated after this time (ISO 8601 format)',
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
          required: ['username'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.gists.listForUser({
          username: args.username as string,
          since: args.since as string | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get - Get a gist
    {
      definition: {
        name: 'github_gists_get',
        description: 'Get a gist by ID',
        inputSchema: {
          type: 'object',
          properties: {
            gist_id: {
              type: 'string',
              description: 'The unique identifier of the gist',
            },
          },
          required: ['gist_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.gists.get({
          gist_id: args.gist_id as string,
        });
        return successResult(data);
      },
    },

    // create - Create a gist
    {
      definition: {
        name: 'github_gists_create',
        description: 'Create a new gist',
        inputSchema: {
          type: 'object',
          properties: {
            description: {
              type: 'string',
              description: 'Description of the gist',
            },
            files: {
              type: 'object',
              description: 'Files to include in the gist (object with filename keys and {content} values)',
            },
            public: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Whether the gist is public',
            },
          },
          required: ['files'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.gists.create({
          description: args.description as string | undefined,
          files: args.files as Record<string, { content: string }>,
          public: args.public === 'true',
        });
        return successResult(data);
      },
    },

    // update - Update a gist
    {
      definition: {
        name: 'github_gists_update',
        description: 'Update a gist',
        inputSchema: {
          type: 'object',
          properties: {
            gist_id: {
              type: 'string',
              description: 'The unique identifier of the gist',
            },
            description: {
              type: 'string',
              description: 'Description of the gist',
            },
            files: {
              type: 'object',
              description: 'Files to update (set content to null to delete a file)',
            },
          },
          required: ['gist_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.gists.update({
          gist_id: args.gist_id as string,
          description: args.description as string | undefined,
          files: args.files as Record<string, { content?: string; filename?: string | null }> | undefined,
        });
        return successResult(data);
      },
    },

    // delete - Delete a gist
    {
      definition: {
        name: 'github_gists_delete',
        description: 'Delete a gist',
        inputSchema: {
          type: 'object',
          properties: {
            gist_id: {
              type: 'string',
              description: 'The unique identifier of the gist',
            },
          },
          required: ['gist_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.gists.delete({
          gist_id: args.gist_id as string,
        });
        return successResult({ success: true, message: 'Gist deleted' });
      },
    },

    // fork - Fork a gist
    {
      definition: {
        name: 'github_gists_fork',
        description: 'Fork a gist',
        inputSchema: {
          type: 'object',
          properties: {
            gist_id: {
              type: 'string',
              description: 'The unique identifier of the gist',
            },
          },
          required: ['gist_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.gists.fork({
          gist_id: args.gist_id as string,
        });
        return successResult(data);
      },
    },

    // star - Star a gist
    {
      definition: {
        name: 'github_gists_star',
        description: 'Star a gist',
        inputSchema: {
          type: 'object',
          properties: {
            gist_id: {
              type: 'string',
              description: 'The unique identifier of the gist',
            },
          },
          required: ['gist_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.gists.star({
          gist_id: args.gist_id as string,
        });
        return successResult({ success: true, message: 'Gist starred' });
      },
    },

    // unstar - Unstar a gist
    {
      definition: {
        name: 'github_gists_unstar',
        description: 'Unstar a gist',
        inputSchema: {
          type: 'object',
          properties: {
            gist_id: {
              type: 'string',
              description: 'The unique identifier of the gist',
            },
          },
          required: ['gist_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.gists.unstar({
          gist_id: args.gist_id as string,
        });
        return successResult({ success: true, message: 'Gist unstarred' });
      },
    },

    // check_is_starred - Check if a gist is starred
    {
      definition: {
        name: 'github_gists_check_is_starred',
        description: 'Check if a gist is starred by the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            gist_id: {
              type: 'string',
              description: 'The unique identifier of the gist',
            },
          },
          required: ['gist_id'],
        },
      },
      handler: async (octokit, args) => {
        try {
          await octokit.gists.checkIsStarred({
            gist_id: args.gist_id as string,
          });
          return successResult({ starred: true });
        } catch (error: unknown) {
          if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
            return successResult({ starred: false });
          }
          throw error;
        }
      },
    },

    // list_comments - List comments on a gist
    {
      definition: {
        name: 'github_gists_list_comments',
        description: 'List comments on a gist',
        inputSchema: {
          type: 'object',
          properties: {
            gist_id: {
              type: 'string',
              description: 'The unique identifier of the gist',
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
          required: ['gist_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.gists.listComments({
          gist_id: args.gist_id as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_comment - Get a comment on a gist
    {
      definition: {
        name: 'github_gists_get_comment',
        description: 'Get a comment on a gist',
        inputSchema: {
          type: 'object',
          properties: {
            gist_id: {
              type: 'string',
              description: 'The unique identifier of the gist',
            },
            comment_id: {
              type: 'number',
              description: 'The unique identifier of the comment',
            },
          },
          required: ['gist_id', 'comment_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.gists.getComment({
          gist_id: args.gist_id as string,
          comment_id: args.comment_id as number,
        });
        return successResult(data);
      },
    },

    // create_comment - Create a comment on a gist
    {
      definition: {
        name: 'github_gists_create_comment',
        description: 'Create a comment on a gist',
        inputSchema: {
          type: 'object',
          properties: {
            gist_id: {
              type: 'string',
              description: 'The unique identifier of the gist',
            },
            body: {
              type: 'string',
              description: 'The comment text',
            },
          },
          required: ['gist_id', 'body'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.gists.createComment({
          gist_id: args.gist_id as string,
          body: args.body as string,
        });
        return successResult(data);
      },
    },

    // update_comment - Update a comment on a gist
    {
      definition: {
        name: 'github_gists_update_comment',
        description: 'Update a comment on a gist',
        inputSchema: {
          type: 'object',
          properties: {
            gist_id: {
              type: 'string',
              description: 'The unique identifier of the gist',
            },
            comment_id: {
              type: 'number',
              description: 'The unique identifier of the comment',
            },
            body: {
              type: 'string',
              description: 'The updated comment text',
            },
          },
          required: ['gist_id', 'comment_id', 'body'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.gists.updateComment({
          gist_id: args.gist_id as string,
          comment_id: args.comment_id as number,
          body: args.body as string,
        });
        return successResult(data);
      },
    },

    // delete_comment - Delete a comment on a gist
    {
      definition: {
        name: 'github_gists_delete_comment',
        description: 'Delete a comment on a gist',
        inputSchema: {
          type: 'object',
          properties: {
            gist_id: {
              type: 'string',
              description: 'The unique identifier of the gist',
            },
            comment_id: {
              type: 'number',
              description: 'The unique identifier of the comment',
            },
          },
          required: ['gist_id', 'comment_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.gists.deleteComment({
          gist_id: args.gist_id as string,
          comment_id: args.comment_id as number,
        });
        return successResult({ success: true, message: 'Comment deleted' });
      },
    },
  ],
};
