import { Octokit } from '@octokit/rest';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const orgsTools: Tool[] = [
  {
    name: 'github_orgs_list',
    description: 'List organizations for the authenticated user',
    inputSchema: {
      type: 'object',
      properties: {
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
    },
  },
  {
    name: 'github_orgs_listForUser',
    description: 'List organizations for a user',
    inputSchema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'GitHub username' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['username'],
    },
  },
  {
    name: 'github_orgs_get',
    description: 'Get an organization',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
      },
      required: ['org'],
    },
  },
  {
    name: 'github_orgs_update',
    description: 'Update an organization',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        billing_email: { type: 'string', description: 'Billing email address' },
        company: { type: 'string', description: 'Company name' },
        email: { type: 'string', description: 'Public email' },
        twitter_username: { type: 'string', description: 'Twitter username' },
        location: { type: 'string', description: 'Location' },
        name: { type: 'string', description: 'Display name' },
        description: { type: 'string', description: 'Organization description' },
        default_repository_permission: {
          type: 'string',
          enum: ['read', 'write', 'admin', 'none'],
          description: 'Default permission for new repos',
        },
        members_can_create_repositories: { type: 'boolean' },
      },
      required: ['org'],
    },
  },
  {
    name: 'github_orgs_listMembers',
    description: 'List members of an organization',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        filter: {
          type: 'string',
          enum: ['2fa_disabled', 'all'],
          description: 'Filter members',
        },
        role: {
          type: 'string',
          enum: ['all', 'admin', 'member'],
          description: 'Filter by role',
        },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['org'],
    },
  },
  {
    name: 'github_orgs_checkMembership',
    description: 'Check if a user is a member of an organization',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        username: { type: 'string', description: 'GitHub username' },
      },
      required: ['org', 'username'],
    },
  },
  {
    name: 'github_orgs_getMembership',
    description: 'Get organization membership for a user',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        username: { type: 'string', description: 'GitHub username' },
      },
      required: ['org', 'username'],
    },
  },
  {
    name: 'github_orgs_setMembership',
    description: 'Set organization membership for a user',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        username: { type: 'string', description: 'GitHub username' },
        role: {
          type: 'string',
          enum: ['admin', 'member'],
          description: 'Role to assign',
        },
      },
      required: ['org', 'username', 'role'],
    },
  },
  {
    name: 'github_orgs_removeMember',
    description: 'Remove a member from an organization',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        username: { type: 'string', description: 'GitHub username' },
      },
      required: ['org', 'username'],
    },
  },
  {
    name: 'github_orgs_listTeams',
    description: 'List teams in an organization',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['org'],
    },
  },
  {
    name: 'github_orgs_getTeam',
    description: 'Get a team by slug',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        team_slug: { type: 'string', description: 'Team slug' },
      },
      required: ['org', 'team_slug'],
    },
  },
  {
    name: 'github_orgs_createTeam',
    description: 'Create a team',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        name: { type: 'string', description: 'Team name' },
        description: { type: 'string', description: 'Team description' },
        maintainers: {
          type: 'array',
          items: { type: 'string' },
          description: 'GitHub usernames of team maintainers',
        },
        repo_names: {
          type: 'array',
          items: { type: 'string' },
          description: 'Full repo names (org/repo) to add',
        },
        privacy: {
          type: 'string',
          enum: ['secret', 'closed'],
          description: 'Team privacy level',
        },
        permission: {
          type: 'string',
          enum: ['pull', 'push', 'admin'],
          description: 'Default permission for repos',
        },
        parent_team_id: { type: 'number', description: 'Parent team ID for nested teams' },
      },
      required: ['org', 'name'],
    },
  },
  {
    name: 'github_orgs_updateTeam',
    description: 'Update a team',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        team_slug: { type: 'string', description: 'Team slug' },
        name: { type: 'string', description: 'Team name' },
        description: { type: 'string', description: 'Team description' },
        privacy: {
          type: 'string',
          enum: ['secret', 'closed'],
        },
        permission: {
          type: 'string',
          enum: ['pull', 'push', 'admin'],
        },
        parent_team_id: { type: 'number' },
      },
      required: ['org', 'team_slug'],
    },
  },
  {
    name: 'github_orgs_deleteTeam',
    description: 'Delete a team',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        team_slug: { type: 'string', description: 'Team slug' },
      },
      required: ['org', 'team_slug'],
    },
  },
  {
    name: 'github_orgs_listTeamMembers',
    description: 'List members of a team',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        team_slug: { type: 'string', description: 'Team slug' },
        role: {
          type: 'string',
          enum: ['member', 'maintainer', 'all'],
        },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['org', 'team_slug'],
    },
  },
  {
    name: 'github_orgs_addTeamMember',
    description: 'Add a member to a team',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        team_slug: { type: 'string', description: 'Team slug' },
        username: { type: 'string', description: 'GitHub username' },
        role: {
          type: 'string',
          enum: ['member', 'maintainer'],
          description: 'Role in the team',
        },
      },
      required: ['org', 'team_slug', 'username'],
    },
  },
  {
    name: 'github_orgs_removeTeamMember',
    description: 'Remove a member from a team',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        team_slug: { type: 'string', description: 'Team slug' },
        username: { type: 'string', description: 'GitHub username' },
      },
      required: ['org', 'team_slug', 'username'],
    },
  },
  {
    name: 'github_orgs_listTeamRepos',
    description: 'List repositories for a team',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        team_slug: { type: 'string', description: 'Team slug' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['org', 'team_slug'],
    },
  },
  {
    name: 'github_orgs_addTeamRepo',
    description: 'Add a repository to a team',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        team_slug: { type: 'string', description: 'Team slug' },
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        permission: {
          type: 'string',
          enum: ['pull', 'push', 'admin', 'maintain', 'triage'],
          description: 'Permission level',
        },
      },
      required: ['org', 'team_slug', 'owner', 'repo'],
    },
  },
  {
    name: 'github_orgs_listInvitations',
    description: 'List pending organization invitations',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['org'],
    },
  },
  {
    name: 'github_orgs_createInvitation',
    description: 'Create an organization invitation',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        invitee_id: { type: 'number', description: 'GitHub user ID to invite' },
        email: { type: 'string', description: 'Email address to invite' },
        role: {
          type: 'string',
          enum: ['admin', 'direct_member', 'billing_manager'],
        },
        team_ids: {
          type: 'array',
          items: { type: 'number' },
          description: 'Team IDs to add user to',
        },
      },
      required: ['org'],
    },
  },
];

export async function handleOrgsTool(
  octokit: Octokit,
  args: Record<string, unknown>
): Promise<unknown> {
  const org = args.org as string | undefined;
  const username = args.username as string | undefined;
  const teamSlug = args.team_slug as string | undefined;

  // List for authenticated user
  if (!org && !username) {
    const { data } = await octokit.orgs.listForAuthenticatedUser(args as Parameters<typeof octokit.orgs.listForAuthenticatedUser>[0]);
    return data;
  }

  // List for user
  if (username && !org) {
    const { data } = await octokit.orgs.listForUser(args as Parameters<typeof octokit.orgs.listForUser>[0]);
    return data;
  }

  // Get organization
  if (org && !username && !teamSlug && !('name' in args) && !('filter' in args) && !('role' in args) && !('invitee_id' in args) && !('email' in args)) {
    const { data } = await octokit.orgs.get({ org });
    return data;
  }

  // Update organization
  if (org && !username && !teamSlug && ('billing_email' in args || 'company' in args || 'email' in args || 'twitter_username' in args || 'location' in args || 'name' in args || 'description' in args)) {
    const { data } = await octokit.orgs.update(args as Parameters<typeof octokit.orgs.update>[0]);
    return data;
  }

  // List members
  if (org && !username && !teamSlug && ('filter' in args || 'role' in args)) {
    const { data } = await octokit.orgs.listMembers(args as Parameters<typeof octokit.orgs.listMembers>[0]);
    return data;
  }

  // Check membership
  if (org && username && !teamSlug && !('role' in args)) {
    try {
      await octokit.orgs.checkMembershipForUser({ org, username });
      return { isMember: true };
    } catch {
      return { isMember: false };
    }
  }

  // Get membership
  if (org && username && !teamSlug && !('role' in args)) {
    const { data } = await octokit.orgs.getMembershipForUser({ org, username });
    return data;
  }

  // Set membership
  if (org && username && !teamSlug && 'role' in args) {
    const { data } = await octokit.orgs.setMembershipForUser(args as Parameters<typeof octokit.orgs.setMembershipForUser>[0]);
    return data;
  }

  // List teams
  if (org && !teamSlug && !username && !('name' in args)) {
    const { data } = await octokit.teams.list({ org, ...args } as Parameters<typeof octokit.teams.list>[0]);
    return data;
  }

  // Get team
  if (org && teamSlug && !username && !('name' in args) && !('permission' in args) && Object.keys(args).filter(k => !['org', 'team_slug', 'per_page', 'page'].includes(k)).length === 0) {
    if ('per_page' in args || 'page' in args) {
      // List team members
      const { data } = await octokit.teams.listMembersInOrg(args as Parameters<typeof octokit.teams.listMembersInOrg>[0]);
      return data;
    }
    const { data } = await octokit.teams.getByName({ org, team_slug: teamSlug });
    return data;
  }

  // Create team
  if (org && !teamSlug && 'name' in args) {
    const { data } = await octokit.teams.create(args as Parameters<typeof octokit.teams.create>[0]);
    return data;
  }

  // Update team
  if (org && teamSlug && ('name' in args || 'description' in args || 'privacy' in args)) {
    const { data } = await octokit.teams.updateInOrg(args as Parameters<typeof octokit.teams.updateInOrg>[0]);
    return data;
  }

  // Delete team
  if (org && teamSlug && Object.keys(args).length === 2) {
    await octokit.teams.deleteInOrg({ org, team_slug: teamSlug });
    return { success: true, message: 'Team deleted' };
  }

  // Add team member
  if (org && teamSlug && username) {
    const { data } = await octokit.teams.addOrUpdateMembershipForUserInOrg(args as Parameters<typeof octokit.teams.addOrUpdateMembershipForUserInOrg>[0]);
    return data;
  }

  // Add team repo
  if (org && teamSlug && 'owner' in args && 'repo' in args) {
    await octokit.teams.addOrUpdateRepoPermissionsInOrg(args as Parameters<typeof octokit.teams.addOrUpdateRepoPermissionsInOrg>[0]);
    return { success: true, message: 'Repository added to team' };
  }

  // List invitations
  if (org && !teamSlug && !username && !('name' in args)) {
    const { data } = await octokit.orgs.listPendingInvitations({ org, ...args } as Parameters<typeof octokit.orgs.listPendingInvitations>[0]);
    return data;
  }

  // Create invitation
  if (org && ('invitee_id' in args || 'email' in args)) {
    const { data } = await octokit.orgs.createInvitation(args as Parameters<typeof octokit.orgs.createInvitation>[0]);
    return data;
  }

  // Default: list for authenticated user
  const { data } = await octokit.orgs.listForAuthenticatedUser();
  return data;
}
