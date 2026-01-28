import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const secretScanningCategory: ToolCategory = {
  name: 'secretScanning',
  description: 'Secret scanning tools',
  tools: [
    // list_alerts_for_repo - List secret scanning alerts for a repository
    {
      definition: {
        name: 'github_secretScanning_list_alerts_for_repo',
        description: 'List secret scanning alerts for a repository. Requires GitHub Advanced Security.',
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
              enum: ['open', 'resolved'],
              description: 'Filter by alert state',
            },
            secret_type: {
              type: 'string',
              description: 'Filter by secret type (e.g., "github_personal_access_token")',
            },
            resolution: {
              type: 'string',
              enum: ['false_positive', 'wont_fix', 'revoked', 'used_in_tests'],
              description: 'Filter by resolution status',
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
        const { data } = await octokit.secretScanning.listAlertsForRepo({
          owner: args.owner as string,
          repo: args.repo as string,
          state: args.state as 'open' | 'resolved' | undefined,
          secret_type: args.secret_type as string | undefined,
          resolution: args.resolution as 'false_positive' | 'wont_fix' | 'revoked' | 'used_in_tests' | undefined,
          sort: args.sort as 'created' | 'updated' | undefined,
          direction: args.direction as 'asc' | 'desc' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_alerts_for_org - List secret scanning alerts for an organization
    {
      definition: {
        name: 'github_secretScanning_list_alerts_for_org',
        description: 'List secret scanning alerts for an organization. Requires organization admin access and GitHub Advanced Security.',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            state: {
              type: 'string',
              enum: ['open', 'resolved'],
              description: 'Filter by alert state',
            },
            secret_type: {
              type: 'string',
              description: 'Filter by secret type (e.g., "github_personal_access_token")',
            },
            resolution: {
              type: 'string',
              enum: ['false_positive', 'wont_fix', 'revoked', 'used_in_tests'],
              description: 'Filter by resolution status',
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
          required: ['org'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.secretScanning.listAlertsForOrg({
          org: args.org as string,
          state: args.state as 'open' | 'resolved' | undefined,
          secret_type: args.secret_type as string | undefined,
          resolution: args.resolution as 'false_positive' | 'wont_fix' | 'revoked' | 'used_in_tests' | undefined,
          sort: args.sort as 'created' | 'updated' | undefined,
          direction: args.direction as 'asc' | 'desc' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_alerts_for_enterprise - List secret scanning alerts for an enterprise
    {
      definition: {
        name: 'github_secretScanning_list_alerts_for_enterprise',
        description: 'List secret scanning alerts for an enterprise. Requires enterprise admin access and GitHub Advanced Security.',
        inputSchema: {
          type: 'object',
          properties: {
            enterprise: {
              type: 'string',
              description: 'Enterprise slug',
            },
            state: {
              type: 'string',
              enum: ['open', 'resolved'],
              description: 'Filter by alert state',
            },
            secret_type: {
              type: 'string',
              description: 'Filter by secret type (e.g., "github_personal_access_token")',
            },
            resolution: {
              type: 'string',
              enum: ['false_positive', 'wont_fix', 'revoked', 'used_in_tests'],
              description: 'Filter by resolution status',
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
          required: ['enterprise'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.secretScanning.listAlertsForEnterprise({
          enterprise: args.enterprise as string,
          state: args.state as 'open' | 'resolved' | undefined,
          secret_type: args.secret_type as string | undefined,
          resolution: args.resolution as 'false_positive' | 'wont_fix' | 'revoked' | 'used_in_tests' | undefined,
          sort: args.sort as 'created' | 'updated' | undefined,
          direction: args.direction as 'asc' | 'desc' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_alert - Get a secret scanning alert
    {
      definition: {
        name: 'github_secretScanning_get_alert',
        description: 'Get a single secret scanning alert by alert number',
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
              description: 'The number that identifies the alert',
            },
          },
          required: ['owner', 'repo', 'alert_number'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.secretScanning.getAlert({
          owner: args.owner as string,
          repo: args.repo as string,
          alert_number: args.alert_number as number,
        });
        return successResult(data);
      },
    },

    // update_alert - Update a secret scanning alert
    {
      definition: {
        name: 'github_secretScanning_update_alert',
        description: 'Update the state of a secret scanning alert (resolve or reopen)',
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
              description: 'The number that identifies the alert',
            },
            state: {
              type: 'string',
              enum: ['open', 'resolved'],
              description: 'The state to set for the alert',
            },
            resolution: {
              type: 'string',
              enum: ['false_positive', 'wont_fix', 'revoked', 'used_in_tests'],
              description: 'Required when state is "resolved". The reason for resolving the alert.',
            },
            resolution_comment: {
              type: 'string',
              description: 'Optional comment explaining the resolution',
            },
          },
          required: ['owner', 'repo', 'alert_number', 'state'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.secretScanning.updateAlert({
          owner: args.owner as string,
          repo: args.repo as string,
          alert_number: args.alert_number as number,
          state: args.state as 'open' | 'resolved',
          resolution: args.resolution as 'false_positive' | 'wont_fix' | 'revoked' | 'used_in_tests' | undefined,
          resolution_comment: args.resolution_comment as string | undefined,
        });
        return successResult(data);
      },
    },

    // list_locations_for_alert - List locations for a secret scanning alert
    {
      definition: {
        name: 'github_secretScanning_list_locations_for_alert',
        description: 'List all locations where a secret was detected in a repository',
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
              description: 'The number that identifies the alert',
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
          required: ['owner', 'repo', 'alert_number'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.secretScanning.listLocationsForAlert({
          owner: args.owner as string,
          repo: args.repo as string,
          alert_number: args.alert_number as number,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },
  ],
};
