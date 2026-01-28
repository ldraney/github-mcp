import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const activityCategory: ToolCategory = {
  name: 'activity',
  description: 'GitHub activity tools',
  tools: [
    // Events

    // list_public_events - List public events
    {
      definition: {
        name: 'github_activity_list_public_events',
        description: 'List public events across GitHub',
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
        const { data } = await octokit.activity.listPublicEvents({
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_repo_events - List repository events
    {
      definition: {
        name: 'github_activity_list_repo_events',
        description: 'List events for a repository',
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
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
          },
          required: ['owner', 'repo'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.activity.listRepoEvents({
          owner: args.owner as string,
          repo: args.repo as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_events_for_authenticated_user - List events for authenticated user
    {
      definition: {
        name: 'github_activity_list_events_for_authenticated_user',
        description: 'List events for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'GitHub username of the authenticated user',
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
        const { data } = await octokit.activity.listEventsForAuthenticatedUser({
          username: args.username as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // Notifications

    // list_notifications_for_authenticated_user - List notifications
    {
      definition: {
        name: 'github_activity_list_notifications_for_authenticated_user',
        description: 'List notifications for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            all: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Show notifications marked as read (default: false)',
            },
            participating: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Only show notifications where user is directly participating (default: false)',
            },
            since: {
              type: 'string',
              description: 'Only show notifications updated after the given time (ISO 8601 format)',
            },
            before: {
              type: 'string',
              description: 'Only show notifications updated before the given time (ISO 8601 format)',
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
        const { data } = await octokit.activity.listNotificationsForAuthenticatedUser({
          all: args.all !== undefined ? args.all === 'true' : undefined,
          participating: args.participating !== undefined ? args.participating === 'true' : undefined,
          since: args.since as string | undefined,
          before: args.before as string | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_thread - Get a notification thread
    {
      definition: {
        name: 'github_activity_get_thread',
        description: 'Get a notification thread by ID',
        inputSchema: {
          type: 'object',
          properties: {
            thread_id: {
              type: 'number',
              description: 'The unique identifier of the notification thread',
            },
          },
          required: ['thread_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.activity.getThread({
          thread_id: args.thread_id as number,
        });
        return successResult(data);
      },
    },

    // mark_thread_as_read - Mark a thread as read
    {
      definition: {
        name: 'github_activity_mark_thread_as_read',
        description: 'Mark a notification thread as read',
        inputSchema: {
          type: 'object',
          properties: {
            thread_id: {
              type: 'number',
              description: 'The unique identifier of the notification thread',
            },
          },
          required: ['thread_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.activity.markThreadAsRead({
          thread_id: args.thread_id as number,
        });
        return successResult({ success: true, message: 'Thread marked as read' });
      },
    },

    // mark_notifications_as_read - Mark all notifications as read
    {
      definition: {
        name: 'github_activity_mark_notifications_as_read',
        description: 'Mark all notifications as read',
        inputSchema: {
          type: 'object',
          properties: {
            last_read_at: {
              type: 'string',
              description: 'Describes the last point that notifications were checked (ISO 8601 format). Default: current time',
            },
            read: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Whether the notification has been read',
            },
          },
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.activity.markNotificationsAsRead({
          last_read_at: args.last_read_at as string | undefined,
          read: args.read !== undefined ? args.read === 'true' : undefined,
        });
        return successResult(data || { success: true, message: 'Notifications marked as read' });
      },
    },

    // Stargazers

    // list_stargazers_for_repo - List stargazers for a repository
    {
      definition: {
        name: 'github_activity_list_stargazers_for_repo',
        description: 'List users who have starred a repository',
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
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
          },
          required: ['owner', 'repo'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.activity.listStargazersForRepo({
          owner: args.owner as string,
          repo: args.repo as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_repos_starred_by_authenticated_user - List repositories starred by authenticated user
    {
      definition: {
        name: 'github_activity_list_repos_starred_by_authenticated_user',
        description: 'List repositories starred by the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            sort: {
              type: 'string',
              enum: ['created', 'updated'],
              description: 'Sort by created or updated time (default: created)',
            },
            direction: {
              type: 'string',
              enum: ['asc', 'desc'],
              description: 'Sort direction (default: desc)',
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
        const { data } = await octokit.activity.listReposStarredByAuthenticatedUser({
          sort: args.sort as 'created' | 'updated' | undefined,
          direction: args.direction as 'asc' | 'desc' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // star_repo_for_authenticated_user - Star a repository
    {
      definition: {
        name: 'github_activity_star_repo_for_authenticated_user',
        description: 'Star a repository for the authenticated user',
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
      handler: async (octokit, args) => {
        await octokit.activity.starRepoForAuthenticatedUser({
          owner: args.owner as string,
          repo: args.repo as string,
        });
        return successResult({ success: true, message: `Starred ${args.owner}/${args.repo}` });
      },
    },

    // unstar_repo_for_authenticated_user - Unstar a repository
    {
      definition: {
        name: 'github_activity_unstar_repo_for_authenticated_user',
        description: 'Unstar a repository for the authenticated user',
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
      handler: async (octokit, args) => {
        await octokit.activity.unstarRepoForAuthenticatedUser({
          owner: args.owner as string,
          repo: args.repo as string,
        });
        return successResult({ success: true, message: `Unstarred ${args.owner}/${args.repo}` });
      },
    },

    // check_repo_is_starred_by_authenticated_user - Check if a repository is starred
    {
      definition: {
        name: 'github_activity_check_repo_is_starred_by_authenticated_user',
        description: 'Check if a repository is starred by the authenticated user',
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
      handler: async (octokit, args) => {
        try {
          await octokit.activity.checkRepoIsStarredByAuthenticatedUser({
            owner: args.owner as string,
            repo: args.repo as string,
          });
          return successResult({ starred: true });
        } catch (error) {
          if ((error as { status?: number }).status === 404) {
            return successResult({ starred: false });
          }
          throw error;
        }
      },
    },

    // Watchers

    // list_watchers_for_repo - List watchers for a repository
    {
      definition: {
        name: 'github_activity_list_watchers_for_repo',
        description: 'List users watching a repository',
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
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
          },
          required: ['owner', 'repo'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.activity.listWatchersForRepo({
          owner: args.owner as string,
          repo: args.repo as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_repos_watched_by_authenticated_user - List repositories watched by authenticated user
    {
      definition: {
        name: 'github_activity_list_repos_watched_by_authenticated_user',
        description: 'List repositories watched by the authenticated user',
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
        const { data } = await octokit.activity.listWatchedReposForAuthenticatedUser({
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // set_repo_subscription - Set a repository subscription
    {
      definition: {
        name: 'github_activity_set_repo_subscription',
        description: 'Set a repository subscription (watch/ignore) for the authenticated user',
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
            subscribed: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Determines if notifications should be received from this repository',
            },
            ignored: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Determines if all notifications should be blocked from this repository',
            },
          },
          required: ['owner', 'repo'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.activity.setRepoSubscription({
          owner: args.owner as string,
          repo: args.repo as string,
          subscribed: args.subscribed !== undefined ? args.subscribed === 'true' : undefined,
          ignored: args.ignored !== undefined ? args.ignored === 'true' : undefined,
        });
        return successResult(data);
      },
    },

    // delete_repo_subscription - Delete a repository subscription
    {
      definition: {
        name: 'github_activity_delete_repo_subscription',
        description: 'Delete a repository subscription (unwatch) for the authenticated user',
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
      handler: async (octokit, args) => {
        await octokit.activity.deleteRepoSubscription({
          owner: args.owner as string,
          repo: args.repo as string,
        });
        return successResult({ success: true, message: `Unwatched ${args.owner}/${args.repo}` });
      },
    },
  ],
};
