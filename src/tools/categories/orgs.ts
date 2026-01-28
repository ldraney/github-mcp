import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const orgsCategory: ToolCategory = {
  name: 'orgs',
  description: 'GitHub organization tools',
  tools: [
    // list - List organizations for authenticated user
    {
      definition: {
        name: 'github_orgs_list',
        description: 'List organizations for the authenticated user',
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
        const { data } = await octokit.orgs.listForAuthenticatedUser({
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_for_user - List organizations for a user
    {
      definition: {
        name: 'github_orgs_list_for_user',
        description: 'List public organizations for a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'GitHub username',
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
        const { data } = await octokit.orgs.listForUser({
          username: args.username as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get - Get an organization
    {
      definition: {
        name: 'github_orgs_get',
        description: 'Get an organization by name',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
          },
          required: ['org'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.orgs.get({
          org: args.org as string,
        });
        return successResult(data);
      },
    },

    // update - Update an organization
    {
      definition: {
        name: 'github_orgs_update',
        description: 'Update an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            billing_email: {
              type: 'string',
              description: 'Billing email address',
            },
            company: {
              type: 'string',
              description: 'Company name',
            },
            email: {
              type: 'string',
              description: 'Public email address',
            },
            location: {
              type: 'string',
              description: 'Location',
            },
            name: {
              type: 'string',
              description: 'Display name',
            },
            description: {
              type: 'string',
              description: 'Organization description',
            },
            default_repository_permission: {
              type: 'string',
              enum: ['read', 'write', 'admin', 'none'],
              description: 'Default repository permission for members',
            },
            members_can_create_repositories: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Whether members can create repositories',
            },
          },
          required: ['org'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.orgs.update({
          org: args.org as string,
          billing_email: args.billing_email as string | undefined,
          company: args.company as string | undefined,
          email: args.email as string | undefined,
          location: args.location as string | undefined,
          name: args.name as string | undefined,
          description: args.description as string | undefined,
          default_repository_permission: args.default_repository_permission as 'read' | 'write' | 'admin' | 'none' | undefined,
          members_can_create_repositories: args.members_can_create_repositories !== undefined ? args.members_can_create_repositories === 'true' : undefined,
        });
        return successResult(data);
      },
    },

    // list_members - List organization members
    {
      definition: {
        name: 'github_orgs_list_members',
        description: 'List members of an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            filter: {
              type: 'string',
              enum: ['2fa_disabled', 'all'],
              description: 'Filter members by 2FA status',
            },
            role: {
              type: 'string',
              enum: ['all', 'admin', 'member'],
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
          required: ['org'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.orgs.listMembers({
          org: args.org as string,
          filter: args.filter as '2fa_disabled' | 'all' | undefined,
          role: args.role as 'all' | 'admin' | 'member' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_membership - Get organization membership for a user
    {
      definition: {
        name: 'github_orgs_get_membership',
        description: 'Get organization membership for a user',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            username: {
              type: 'string',
              description: 'GitHub username',
            },
          },
          required: ['org', 'username'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.orgs.getMembershipForUser({
          org: args.org as string,
          username: args.username as string,
        });
        return successResult(data);
      },
    },

    // set_membership - Set organization membership for a user
    {
      definition: {
        name: 'github_orgs_set_membership',
        description: 'Set organization membership for a user',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            username: {
              type: 'string',
              description: 'GitHub username',
            },
            role: {
              type: 'string',
              enum: ['admin', 'member'],
              description: 'Role for the user in the organization',
            },
          },
          required: ['org', 'username'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.orgs.setMembershipForUser({
          org: args.org as string,
          username: args.username as string,
          role: args.role as 'admin' | 'member' | undefined,
        });
        return successResult(data);
      },
    },

    // remove_member - Remove a member from an organization
    {
      definition: {
        name: 'github_orgs_remove_member',
        description: 'Remove a member from an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            username: {
              type: 'string',
              description: 'GitHub username',
            },
          },
          required: ['org', 'username'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.orgs.removeMember({
          org: args.org as string,
          username: args.username as string,
        });
        return successResult({ success: true, message: 'Member removed from organization' });
      },
    },

    // list_pending_invitations - List pending organization invitations
    {
      definition: {
        name: 'github_orgs_list_pending_invitations',
        description: 'List pending invitations for an organization',
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
        const { data } = await octokit.orgs.listPendingInvitations({
          org: args.org as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // create_invitation - Create an organization invitation
    {
      definition: {
        name: 'github_orgs_create_invitation',
        description: 'Create an invitation to join an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            invitee_id: {
              type: 'number',
              description: 'GitHub user ID to invite',
            },
            email: {
              type: 'string',
              description: 'Email address to invite (if not using invitee_id)',
            },
            role: {
              type: 'string',
              enum: ['admin', 'direct_member', 'billing_manager'],
              description: 'Role for the invited user',
            },
            team_ids: {
              type: 'string',
              description: 'Comma-separated list of team IDs to add the user to',
            },
          },
          required: ['org'],
        },
      },
      handler: async (octokit, args) => {
        const teamIds = args.team_ids
          ? (args.team_ids as string).split(',').map((id) => parseInt(id.trim(), 10))
          : undefined;
        const { data } = await octokit.orgs.createInvitation({
          org: args.org as string,
          invitee_id: args.invitee_id as number | undefined,
          email: args.email as string | undefined,
          role: args.role as 'admin' | 'direct_member' | 'billing_manager' | undefined,
          team_ids: teamIds,
        });
        return successResult(data);
      },
    },

    // cancel_invitation - Cancel an organization invitation
    {
      definition: {
        name: 'github_orgs_cancel_invitation',
        description: 'Cancel an organization invitation',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            invitation_id: {
              type: 'number',
              description: 'Invitation ID',
            },
          },
          required: ['org', 'invitation_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.orgs.cancelInvitation({
          org: args.org as string,
          invitation_id: args.invitation_id as number,
        });
        return successResult({ success: true, message: 'Invitation cancelled' });
      },
    },

    // list_webhooks - List organization webhooks
    {
      definition: {
        name: 'github_orgs_list_webhooks',
        description: 'List webhooks for an organization',
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
        const { data } = await octokit.orgs.listWebhooks({
          org: args.org as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_webhook - Get an organization webhook
    {
      definition: {
        name: 'github_orgs_get_webhook',
        description: 'Get a webhook for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            hook_id: {
              type: 'number',
              description: 'Webhook ID',
            },
          },
          required: ['org', 'hook_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.orgs.getWebhook({
          org: args.org as string,
          hook_id: args.hook_id as number,
        });
        return successResult(data);
      },
    },

    // create_webhook - Create an organization webhook
    {
      definition: {
        name: 'github_orgs_create_webhook',
        description: 'Create a webhook for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            name: {
              type: 'string',
              description: 'Webhook name (must be "web")',
            },
            config_url: {
              type: 'string',
              description: 'URL to receive webhook payloads',
            },
            config_content_type: {
              type: 'string',
              enum: ['json', 'form'],
              description: 'Content type for payloads',
            },
            config_secret: {
              type: 'string',
              description: 'Secret for webhook signature',
            },
            config_insecure_ssl: {
              type: 'string',
              enum: ['0', '1'],
              description: 'Allow insecure SSL (0 = no, 1 = yes)',
            },
            events: {
              type: 'string',
              description: 'Comma-separated list of events to subscribe to',
            },
            active: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Whether the webhook is active',
            },
          },
          required: ['org', 'name', 'config_url'],
        },
      },
      handler: async (octokit, args) => {
        const events = args.events
          ? (args.events as string).split(',').map((e) => e.trim())
          : undefined;
        const { data } = await octokit.orgs.createWebhook({
          org: args.org as string,
          name: args.name as string,
          config: {
            url: args.config_url as string,
            content_type: args.config_content_type as 'json' | 'form' | undefined,
            secret: args.config_secret as string | undefined,
            insecure_ssl: args.config_insecure_ssl as '0' | '1' | undefined,
          },
          events,
          active: args.active !== undefined ? args.active === 'true' : undefined,
        });
        return successResult(data);
      },
    },

    // update_webhook - Update an organization webhook
    {
      definition: {
        name: 'github_orgs_update_webhook',
        description: 'Update a webhook for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            hook_id: {
              type: 'number',
              description: 'Webhook ID',
            },
            config_url: {
              type: 'string',
              description: 'URL to receive webhook payloads',
            },
            config_content_type: {
              type: 'string',
              enum: ['json', 'form'],
              description: 'Content type for payloads',
            },
            config_secret: {
              type: 'string',
              description: 'Secret for webhook signature',
            },
            config_insecure_ssl: {
              type: 'string',
              enum: ['0', '1'],
              description: 'Allow insecure SSL (0 = no, 1 = yes)',
            },
            events: {
              type: 'string',
              description: 'Comma-separated list of events to subscribe to',
            },
            active: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Whether the webhook is active',
            },
          },
          required: ['org', 'hook_id'],
        },
      },
      handler: async (octokit, args) => {
        const events = args.events
          ? (args.events as string).split(',').map((e) => e.trim())
          : undefined;
        const config = args.config_url ? {
          url: args.config_url as string,
          content_type: args.config_content_type as string | undefined,
          secret: args.config_secret as string | undefined,
          insecure_ssl: args.config_insecure_ssl as string | undefined,
        } : undefined;

        const { data } = await octokit.orgs.updateWebhook({
          org: args.org as string,
          hook_id: args.hook_id as number,
          config,
          events,
          active: args.active !== undefined ? args.active === 'true' : undefined,
        });
        return successResult(data);
      },
    },

    // delete_webhook - Delete an organization webhook
    {
      definition: {
        name: 'github_orgs_delete_webhook',
        description: 'Delete a webhook for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            hook_id: {
              type: 'number',
              description: 'Webhook ID',
            },
          },
          required: ['org', 'hook_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.orgs.deleteWebhook({
          org: args.org as string,
          hook_id: args.hook_id as number,
        });
        return successResult({ success: true, message: 'Webhook deleted' });
      },
    },
  ],
};
