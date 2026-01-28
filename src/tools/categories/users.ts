import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const usersCategory: ToolCategory = {
  name: 'users',
  description: 'User management tools',
  tools: [
    // get_authenticated - Get the authenticated user
    {
      definition: {
        name: 'github_users_get_authenticated',
        description: 'Get the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      handler: async (octokit) => {
        const { data } = await octokit.users.getAuthenticated();
        return successResult(data);
      },
    },

    // get_by_username - Get a user by username
    {
      definition: {
        name: 'github_users_get_by_username',
        description: 'Get a user by username',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'GitHub username',
            },
          },
          required: ['username'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.users.getByUsername({
          username: args.username as string,
        });
        return successResult(data);
      },
    },

    // update_authenticated - Update the authenticated user
    {
      definition: {
        name: 'github_users_update_authenticated',
        description: 'Update the authenticated user profile',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Display name',
            },
            email: {
              type: 'string',
              description: 'Public email address',
            },
            blog: {
              type: 'string',
              description: 'Blog URL',
            },
            twitter_username: {
              type: 'string',
              description: 'Twitter username',
            },
            company: {
              type: 'string',
              description: 'Company name',
            },
            location: {
              type: 'string',
              description: 'Location',
            },
            hireable: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Available for hire',
            },
            bio: {
              type: 'string',
              description: 'Short biography',
            },
          },
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.users.updateAuthenticated({
          name: args.name as string | undefined,
          email: args.email as string | undefined,
          blog: args.blog as string | undefined,
          twitter_username: args.twitter_username as string | undefined,
          company: args.company as string | undefined,
          location: args.location as string | undefined,
          hireable: args.hireable !== undefined ? args.hireable === 'true' : undefined,
          bio: args.bio as string | undefined,
        });
        return successResult(data);
      },
    },

    // list - List users
    {
      definition: {
        name: 'github_users_list',
        description: 'List all users (paginated)',
        inputSchema: {
          type: 'object',
          properties: {
            since: {
              type: 'number',
              description: 'User ID to start after',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
          },
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.users.list({
          since: args.since as number | undefined,
          per_page: args.per_page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_followers - List followers
    {
      definition: {
        name: 'github_users_list_followers',
        description: 'List followers of a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'GitHub username (omit for authenticated user)',
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
        if (args.username) {
          const { data } = await octokit.users.listFollowersForUser({
            username: args.username as string,
            per_page: args.per_page as number | undefined,
            page: args.page as number | undefined,
          });
          return successResult(data);
        } else {
          const { data } = await octokit.users.listFollowersForAuthenticatedUser({
            per_page: args.per_page as number | undefined,
            page: args.page as number | undefined,
          });
          return successResult(data);
        }
      },
    },

    // list_following - List users the user is following
    {
      definition: {
        name: 'github_users_list_following',
        description: 'List users that a user is following',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'GitHub username (omit for authenticated user)',
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
        if (args.username) {
          const { data } = await octokit.users.listFollowingForUser({
            username: args.username as string,
            per_page: args.per_page as number | undefined,
            page: args.page as number | undefined,
          });
          return successResult(data);
        } else {
          const { data } = await octokit.users.listFollowedByAuthenticatedUser({
            per_page: args.per_page as number | undefined,
            page: args.page as number | undefined,
          });
          return successResult(data);
        }
      },
    },

    // check_following - Check if the authenticated user follows another user
    {
      definition: {
        name: 'github_users_check_following',
        description: 'Check if the authenticated user follows another user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'GitHub username to check',
            },
          },
          required: ['username'],
        },
      },
      handler: async (octokit, args) => {
        try {
          await octokit.users.checkPersonIsFollowedByAuthenticated({
            username: args.username as string,
          });
          return successResult({ following: true });
        } catch (error) {
          if ((error as { status?: number }).status === 404) {
            return successResult({ following: false });
          }
          throw error;
        }
      },
    },

    // follow - Follow a user
    {
      definition: {
        name: 'github_users_follow',
        description: 'Follow a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'GitHub username to follow',
            },
          },
          required: ['username'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.users.follow({
          username: args.username as string,
        });
        return successResult({ success: true, message: `Now following ${args.username}` });
      },
    },

    // unfollow - Unfollow a user
    {
      definition: {
        name: 'github_users_unfollow',
        description: 'Unfollow a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'GitHub username to unfollow',
            },
          },
          required: ['username'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.users.unfollow({
          username: args.username as string,
        });
        return successResult({ success: true, message: `Unfollowed ${args.username}` });
      },
    },

    // list_blocked - List blocked users
    {
      definition: {
        name: 'github_users_list_blocked',
        description: 'List users blocked by the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
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
        const { data } = await octokit.users.listBlockedByAuthenticatedUser({
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // block - Block a user
    {
      definition: {
        name: 'github_users_block',
        description: 'Block a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'GitHub username to block',
            },
          },
          required: ['username'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.users.block({
          username: args.username as string,
        });
        return successResult({ success: true, message: `Blocked ${args.username}` });
      },
    },

    // unblock - Unblock a user
    {
      definition: {
        name: 'github_users_unblock',
        description: 'Unblock a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'GitHub username to unblock',
            },
          },
          required: ['username'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.users.unblock({
          username: args.username as string,
        });
        return successResult({ success: true, message: `Unblocked ${args.username}` });
      },
    },

    // list_emails - List email addresses
    {
      definition: {
        name: 'github_users_list_emails',
        description: 'List email addresses for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
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
        const { data } = await octokit.users.listEmailsForAuthenticatedUser({
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // add_email - Add email addresses
    {
      definition: {
        name: 'github_users_add_email',
        description: 'Add email addresses to the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            emails: {
              type: 'array',
              items: { type: 'string' },
              description: 'Email addresses to add',
            },
          },
          required: ['emails'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.users.addEmailForAuthenticatedUser({
          emails: args.emails as string[],
        });
        return successResult(data);
      },
    },

    // list_ssh_keys - List SSH signing keys
    {
      definition: {
        name: 'github_users_list_ssh_keys',
        description: 'List SSH signing keys for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
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
        const { data } = await octokit.users.listSshSigningKeysForAuthenticatedUser({
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_context - Get contextual information about a user
    {
      definition: {
        name: 'github_users_get_context',
        description: 'Get contextual information about a user (hovercard)',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'GitHub username',
            },
            subject_type: {
              type: 'string',
              enum: ['organization', 'repository', 'issue', 'pull_request'],
              description: 'Context type for the hovercard',
            },
            subject_id: {
              type: 'string',
              description: 'ID of the subject (required if subject_type is set)',
            },
          },
          required: ['username'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.users.getContextForUser({
          username: args.username as string,
          subject_type: args.subject_type as 'organization' | 'repository' | 'issue' | 'pull_request' | undefined,
          subject_id: args.subject_id as string | undefined,
        });
        return successResult(data);
      },
    },
  ],
};
