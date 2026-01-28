import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const teamsCategory: ToolCategory = {
  name: 'teams',
  description: 'GitHub teams tools',
  tools: [
    // list - List teams in an organization
    {
      definition: {
        name: 'github_teams_list',
        description: 'List all teams in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
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
          required: ['org'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.teams.list({
          org: args.org as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_by_name - Get a team by name
    {
      definition: {
        name: 'github_teams_get_by_name',
        description: 'Get a team by its slug name',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            team_slug: {
              type: 'string',
              description: 'Team slug (e.g., "justice-league")',
            },
          },
          required: ['org', 'team_slug'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.teams.getByName({
          org: args.org as string,
          team_slug: args.team_slug as string,
        });
        return successResult(data);
      },
    },

    // create - Create a team
    {
      definition: {
        name: 'github_teams_create',
        description: 'Create a new team in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            name: {
              type: 'string',
              description: 'Team name',
            },
            description: {
              type: 'string',
              description: 'Team description',
            },
            maintainers: {
              type: 'string',
              description: 'Comma-separated list of GitHub usernames for team maintainers',
            },
            repo_names: {
              type: 'string',
              description: 'Comma-separated list of repository names (org/repo format)',
            },
            privacy: {
              type: 'string',
              enum: ['secret', 'closed'],
              description: 'Team privacy level',
            },
            notification_setting: {
              type: 'string',
              enum: ['notifications_enabled', 'notifications_disabled'],
              description: 'Notification setting for the team',
            },
            parent_team_id: {
              type: 'number',
              description: 'ID of the parent team for nested teams',
            },
          },
          required: ['org', 'name'],
        },
      },
      handler: async (octokit, args) => {
        const maintainers = args.maintainers
          ? (args.maintainers as string).split(',').map((m) => m.trim())
          : undefined;
        const repoNames = args.repo_names
          ? (args.repo_names as string).split(',').map((r) => r.trim())
          : undefined;
        const { data } = await octokit.teams.create({
          org: args.org as string,
          name: args.name as string,
          description: args.description as string | undefined,
          maintainers,
          repo_names: repoNames,
          privacy: args.privacy as 'secret' | 'closed' | undefined,
          notification_setting: args.notification_setting as 'notifications_enabled' | 'notifications_disabled' | undefined,
          parent_team_id: args.parent_team_id as number | undefined,
        });
        return successResult(data);
      },
    },

    // update - Update a team
    {
      definition: {
        name: 'github_teams_update',
        description: 'Update a team in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            team_slug: {
              type: 'string',
              description: 'Team slug',
            },
            name: {
              type: 'string',
              description: 'New team name',
            },
            description: {
              type: 'string',
              description: 'Team description',
            },
            privacy: {
              type: 'string',
              enum: ['secret', 'closed'],
              description: 'Team privacy level',
            },
            notification_setting: {
              type: 'string',
              enum: ['notifications_enabled', 'notifications_disabled'],
              description: 'Notification setting for the team',
            },
            parent_team_id: {
              type: 'number',
              description: 'ID of the parent team for nested teams (use -1 to remove parent)',
            },
          },
          required: ['org', 'team_slug'],
        },
      },
      handler: async (octokit, args) => {
        const parentTeamId = args.parent_team_id as number | undefined;
        const { data } = await octokit.teams.updateInOrg({
          org: args.org as string,
          team_slug: args.team_slug as string,
          name: args.name as string | undefined,
          description: args.description as string | undefined,
          privacy: args.privacy as 'secret' | 'closed' | undefined,
          notification_setting: args.notification_setting as 'notifications_enabled' | 'notifications_disabled' | undefined,
          parent_team_id: parentTeamId === -1 ? null : parentTeamId,
        });
        return successResult(data);
      },
    },

    // delete - Delete a team
    {
      definition: {
        name: 'github_teams_delete',
        description: 'Delete a team from an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            team_slug: {
              type: 'string',
              description: 'Team slug',
            },
          },
          required: ['org', 'team_slug'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.teams.deleteInOrg({
          org: args.org as string,
          team_slug: args.team_slug as string,
        });
        return successResult({ success: true, message: 'Team deleted' });
      },
    },

    // list_members_in_org - List team members
    {
      definition: {
        name: 'github_teams_list_members_in_org',
        description: 'List members of a team in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            team_slug: {
              type: 'string',
              description: 'Team slug',
            },
            role: {
              type: 'string',
              enum: ['member', 'maintainer', 'all'],
              description: 'Filter by role',
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
          required: ['org', 'team_slug'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.teams.listMembersInOrg({
          org: args.org as string,
          team_slug: args.team_slug as string,
          role: args.role as 'member' | 'maintainer' | 'all' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_membership_for_user_in_org - Get team membership for a user
    {
      definition: {
        name: 'github_teams_get_membership_for_user_in_org',
        description: 'Get team membership for a user in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            team_slug: {
              type: 'string',
              description: 'Team slug',
            },
            username: {
              type: 'string',
              description: 'GitHub username',
            },
          },
          required: ['org', 'team_slug', 'username'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.teams.getMembershipForUserInOrg({
          org: args.org as string,
          team_slug: args.team_slug as string,
          username: args.username as string,
        });
        return successResult(data);
      },
    },

    // add_or_update_membership_for_user_in_org - Add or update team membership
    {
      definition: {
        name: 'github_teams_add_or_update_membership_for_user_in_org',
        description: 'Add or update team membership for a user in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            team_slug: {
              type: 'string',
              description: 'Team slug',
            },
            username: {
              type: 'string',
              description: 'GitHub username',
            },
            role: {
              type: 'string',
              enum: ['member', 'maintainer'],
              description: 'Role for the user in the team',
            },
          },
          required: ['org', 'team_slug', 'username'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.teams.addOrUpdateMembershipForUserInOrg({
          org: args.org as string,
          team_slug: args.team_slug as string,
          username: args.username as string,
          role: args.role as 'member' | 'maintainer' | undefined,
        });
        return successResult(data);
      },
    },

    // remove_membership_for_user_in_org - Remove team membership
    {
      definition: {
        name: 'github_teams_remove_membership_for_user_in_org',
        description: 'Remove team membership for a user in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            team_slug: {
              type: 'string',
              description: 'Team slug',
            },
            username: {
              type: 'string',
              description: 'GitHub username',
            },
          },
          required: ['org', 'team_slug', 'username'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.teams.removeMembershipForUserInOrg({
          org: args.org as string,
          team_slug: args.team_slug as string,
          username: args.username as string,
        });
        return successResult({ success: true, message: 'User removed from team' });
      },
    },

    // list_repos_in_org - List team repositories
    {
      definition: {
        name: 'github_teams_list_repos_in_org',
        description: 'List repositories for a team in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            team_slug: {
              type: 'string',
              description: 'Team slug',
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
          required: ['org', 'team_slug'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.teams.listReposInOrg({
          org: args.org as string,
          team_slug: args.team_slug as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // add_or_update_repo_permissions_in_org - Add or update team repository permissions
    {
      definition: {
        name: 'github_teams_add_or_update_repo_permissions_in_org',
        description: 'Add or update team repository permissions in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            team_slug: {
              type: 'string',
              description: 'Team slug',
            },
            owner: {
              type: 'string',
              description: 'Repository owner',
            },
            repo: {
              type: 'string',
              description: 'Repository name',
            },
            permission: {
              type: 'string',
              enum: ['pull', 'push', 'admin', 'maintain', 'triage'],
              description: 'Permission level for the repository',
            },
          },
          required: ['org', 'team_slug', 'owner', 'repo'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.teams.addOrUpdateRepoPermissionsInOrg({
          org: args.org as string,
          team_slug: args.team_slug as string,
          owner: args.owner as string,
          repo: args.repo as string,
          permission: args.permission as 'pull' | 'push' | 'admin' | 'maintain' | 'triage' | undefined,
        });
        return successResult({ success: true, message: 'Repository permissions updated' });
      },
    },

    // remove_repo_in_org - Remove team repository
    {
      definition: {
        name: 'github_teams_remove_repo_in_org',
        description: 'Remove a repository from a team in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            team_slug: {
              type: 'string',
              description: 'Team slug',
            },
            owner: {
              type: 'string',
              description: 'Repository owner',
            },
            repo: {
              type: 'string',
              description: 'Repository name',
            },
          },
          required: ['org', 'team_slug', 'owner', 'repo'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.teams.removeRepoInOrg({
          org: args.org as string,
          team_slug: args.team_slug as string,
          owner: args.owner as string,
          repo: args.repo as string,
        });
        return successResult({ success: true, message: 'Repository removed from team' });
      },
    },

    // list_discussions_in_org - List team discussions
    {
      definition: {
        name: 'github_teams_list_discussions_in_org',
        description: 'List discussions for a team in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            team_slug: {
              type: 'string',
              description: 'Team slug',
            },
            direction: {
              type: 'string',
              enum: ['asc', 'desc'],
              description: 'Sort direction',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
            pinned: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Filter to only pinned discussions',
            },
          },
          required: ['org', 'team_slug'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.teams.listDiscussionsInOrg({
          org: args.org as string,
          team_slug: args.team_slug as string,
          direction: args.direction as 'asc' | 'desc' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
          pinned: args.pinned as string | undefined,
        });
        return successResult(data);
      },
    },

    // get_discussion_in_org - Get a team discussion
    {
      definition: {
        name: 'github_teams_get_discussion_in_org',
        description: 'Get a specific discussion for a team in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            team_slug: {
              type: 'string',
              description: 'Team slug',
            },
            discussion_number: {
              type: 'number',
              description: 'Discussion number',
            },
          },
          required: ['org', 'team_slug', 'discussion_number'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.teams.getDiscussionInOrg({
          org: args.org as string,
          team_slug: args.team_slug as string,
          discussion_number: args.discussion_number as number,
        });
        return successResult(data);
      },
    },

    // create_discussion_in_org - Create a team discussion
    {
      definition: {
        name: 'github_teams_create_discussion_in_org',
        description: 'Create a discussion for a team in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            team_slug: {
              type: 'string',
              description: 'Team slug',
            },
            title: {
              type: 'string',
              description: 'Discussion title',
            },
            body: {
              type: 'string',
              description: 'Discussion body (Markdown supported)',
            },
            private: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Whether the discussion is private',
            },
          },
          required: ['org', 'team_slug', 'title', 'body'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.teams.createDiscussionInOrg({
          org: args.org as string,
          team_slug: args.team_slug as string,
          title: args.title as string,
          body: args.body as string,
          private: args.private !== undefined ? args.private === 'true' : undefined,
        });
        return successResult(data);
      },
    },
  ],
};
