import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const dependabotCategory: ToolCategory = {
  name: 'dependabot',
  description: 'Dependabot alerts and secrets management tools',
  tools: [
    // list_alerts_for_repo - List Dependabot alerts for a repository
    {
      definition: {
        name: 'github_dependabot_list_alerts_for_repo',
        description: 'List Dependabot alerts for a repository',
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
            state: {
              type: 'string',
              enum: ['auto_dismissed', 'dismissed', 'fixed', 'open'],
              description: 'Filter by alert state',
            },
            severity: {
              type: 'string',
              enum: ['low', 'medium', 'high', 'critical'],
              description: 'Filter by severity',
            },
            ecosystem: {
              type: 'string',
              description: 'Filter by package ecosystem (e.g., npm, pip, maven)',
            },
            package: {
              type: 'string',
              description: 'Filter by package name',
            },
            scope: {
              type: 'string',
              enum: ['development', 'runtime'],
              description: 'Filter by dependency scope',
            },
            sort: {
              type: 'string',
              enum: ['created', 'updated'],
              description: 'Sort order for results',
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
          },
          required: ['owner', 'repo'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.dependabot.listAlertsForRepo({
          owner: args.owner as string,
          repo: args.repo as string,
          state: args.state as 'auto_dismissed' | 'dismissed' | 'fixed' | 'open' | undefined,
          severity: args.severity as 'low' | 'medium' | 'high' | 'critical' | undefined,
          ecosystem: args.ecosystem as string | undefined,
          package: args.package as string | undefined,
          scope: args.scope as 'development' | 'runtime' | undefined,
          sort: args.sort as 'created' | 'updated' | undefined,
          direction: args.direction as 'asc' | 'desc' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_alert - Get a Dependabot alert
    {
      definition: {
        name: 'github_dependabot_get_alert',
        description: 'Get a specific Dependabot alert by number',
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
            alert_number: {
              type: 'number',
              description: 'The number that identifies the Dependabot alert',
            },
          },
          required: ['owner', 'repo', 'alert_number'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.dependabot.getAlert({
          owner: args.owner as string,
          repo: args.repo as string,
          alert_number: args.alert_number as number,
        });
        return successResult(data);
      },
    },

    // update_alert - Update a Dependabot alert
    {
      definition: {
        name: 'github_dependabot_update_alert',
        description: 'Update a Dependabot alert (dismiss or reopen)',
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
            alert_number: {
              type: 'number',
              description: 'The number that identifies the Dependabot alert',
            },
            state: {
              type: 'string',
              enum: ['dismissed', 'open'],
              description: 'The state of the alert',
            },
            dismissed_reason: {
              type: 'string',
              enum: ['fix_started', 'inaccurate', 'no_bandwidth', 'not_used', 'tolerable_risk'],
              description: 'Required when state is dismissed. Reason for dismissal.',
            },
            dismissed_comment: {
              type: 'string',
              description: 'Optional comment when dismissing the alert',
            },
          },
          required: ['owner', 'repo', 'alert_number', 'state'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.dependabot.updateAlert({
          owner: args.owner as string,
          repo: args.repo as string,
          alert_number: args.alert_number as number,
          state: args.state as 'dismissed' | 'open',
          dismissed_reason: args.dismissed_reason as 'fix_started' | 'inaccurate' | 'no_bandwidth' | 'not_used' | 'tolerable_risk' | undefined,
          dismissed_comment: args.dismissed_comment as string | undefined,
        });
        return successResult(data);
      },
    },

    // list_org_secrets - List organization secrets for Dependabot
    {
      definition: {
        name: 'github_dependabot_list_org_secrets',
        description: 'List all Dependabot secrets available in an organization (names only, not values)',
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
        const { data } = await octokit.dependabot.listOrgSecrets({
          org: args.org as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_org_secret - Get an organization secret for Dependabot
    {
      definition: {
        name: 'github_dependabot_get_org_secret',
        description: 'Get metadata about an organization Dependabot secret (not the value)',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            secret_name: {
              type: 'string',
              description: 'The name of the secret',
            },
          },
          required: ['org', 'secret_name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.dependabot.getOrgSecret({
          org: args.org as string,
          secret_name: args.secret_name as string,
        });
        return successResult(data);
      },
    },

    // create_or_update_org_secret - Create or update an organization secret for Dependabot
    {
      definition: {
        name: 'github_dependabot_create_or_update_org_secret',
        description: 'Create or update an organization Dependabot secret. Value must be encrypted with the organization public key.',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            secret_name: {
              type: 'string',
              description: 'The name of the secret',
            },
            encrypted_value: {
              type: 'string',
              description: 'Value for your secret, encrypted with LibSodium using the organization public key',
            },
            key_id: {
              type: 'string',
              description: 'ID of the key used to encrypt the secret',
            },
            visibility: {
              type: 'string',
              enum: ['all', 'private', 'selected'],
              description: 'Which repositories can access the secret',
            },
            selected_repository_ids: {
              type: 'array',
              items: { type: 'number' },
              description: 'Array of repository IDs that can access the secret (required when visibility is selected)',
            },
          },
          required: ['org', 'secret_name', 'visibility'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.dependabot.createOrUpdateOrgSecret({
          org: args.org as string,
          secret_name: args.secret_name as string,
          encrypted_value: args.encrypted_value as string | undefined,
          key_id: args.key_id as string | undefined,
          visibility: args.visibility as 'all' | 'private' | 'selected',
          selected_repository_ids: args.selected_repository_ids as number[] | undefined,
        });
        return successResult({ success: true, message: 'Organization Dependabot secret created or updated' });
      },
    },

    // delete_org_secret - Delete an organization secret for Dependabot
    {
      definition: {
        name: 'github_dependabot_delete_org_secret',
        description: 'Delete an organization Dependabot secret by name',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            secret_name: {
              type: 'string',
              description: 'The name of the secret',
            },
          },
          required: ['org', 'secret_name'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.dependabot.deleteOrgSecret({
          org: args.org as string,
          secret_name: args.secret_name as string,
        });
        return successResult({ success: true, message: 'Organization Dependabot secret deleted' });
      },
    },

    // list_repo_secrets - List repository secrets for Dependabot
    {
      definition: {
        name: 'github_dependabot_list_repo_secrets',
        description: 'List all Dependabot secrets available in a repository (names only, not values)',
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
        const { data } = await octokit.dependabot.listRepoSecrets({
          owner: args.owner as string,
          repo: args.repo as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_repo_secret - Get a repository secret for Dependabot
    {
      definition: {
        name: 'github_dependabot_get_repo_secret',
        description: 'Get metadata about a repository Dependabot secret (not the value)',
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
            secret_name: {
              type: 'string',
              description: 'The name of the secret',
            },
          },
          required: ['owner', 'repo', 'secret_name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.dependabot.getRepoSecret({
          owner: args.owner as string,
          repo: args.repo as string,
          secret_name: args.secret_name as string,
        });
        return successResult(data);
      },
    },

    // create_or_update_repo_secret - Create or update a repository secret for Dependabot
    {
      definition: {
        name: 'github_dependabot_create_or_update_repo_secret',
        description: 'Create or update a repository Dependabot secret. Value must be encrypted with the repository public key.',
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
            secret_name: {
              type: 'string',
              description: 'The name of the secret',
            },
            encrypted_value: {
              type: 'string',
              description: 'Value for your secret, encrypted with LibSodium using the repository public key',
            },
            key_id: {
              type: 'string',
              description: 'ID of the key used to encrypt the secret',
            },
          },
          required: ['owner', 'repo', 'secret_name', 'encrypted_value', 'key_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.dependabot.createOrUpdateRepoSecret({
          owner: args.owner as string,
          repo: args.repo as string,
          secret_name: args.secret_name as string,
          encrypted_value: args.encrypted_value as string,
          key_id: args.key_id as string,
        });
        return successResult({ success: true, message: 'Repository Dependabot secret created or updated' });
      },
    },

    // delete_repo_secret - Delete a repository secret for Dependabot
    {
      definition: {
        name: 'github_dependabot_delete_repo_secret',
        description: 'Delete a repository Dependabot secret by name',
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
            secret_name: {
              type: 'string',
              description: 'The name of the secret',
            },
          },
          required: ['owner', 'repo', 'secret_name'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.dependabot.deleteRepoSecret({
          owner: args.owner as string,
          repo: args.repo as string,
          secret_name: args.secret_name as string,
        });
        return successResult({ success: true, message: 'Repository Dependabot secret deleted' });
      },
    },
  ],
};
