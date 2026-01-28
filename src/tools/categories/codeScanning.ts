import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const codeScanningCategory: ToolCategory = {
  name: 'codeScanning',
  description: 'Code scanning tools',
  tools: [
    // list_alerts_for_repo - List code scanning alerts for a repository
    {
      definition: {
        name: 'github_codeScanning_list_alerts_for_repo',
        description: 'List code scanning alerts for a repository. Requires GitHub Advanced Security.',
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
            tool_name: {
              type: 'string',
              description: 'The name of the tool used to generate the code scanning analysis',
            },
            tool_guid: {
              type: 'string',
              description: 'The GUID of the tool used to generate the code scanning analysis',
            },
            ref: {
              type: 'string',
              description: 'Git reference (branch name, tag, or SHA)',
            },
            state: {
              type: 'string',
              enum: ['open', 'closed', 'dismissed', 'fixed'],
              description: 'Filter by alert state',
            },
            severity: {
              type: 'string',
              enum: ['critical', 'high', 'medium', 'low', 'warning', 'note', 'error'],
              description: 'Filter by severity',
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
        const { data } = await octokit.codeScanning.listAlertsForRepo({
          owner: args.owner as string,
          repo: args.repo as string,
          tool_name: args.tool_name as string | undefined,
          tool_guid: args.tool_guid as string | undefined,
          ref: args.ref as string | undefined,
          state: args.state as 'open' | 'dismissed' | 'fixed' | undefined,
          severity: args.severity as 'critical' | 'high' | 'medium' | 'low' | 'warning' | 'note' | 'error' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_alert - Get a code scanning alert
    {
      definition: {
        name: 'github_codeScanning_get_alert',
        description: 'Get a specific code scanning alert by number. Requires GitHub Advanced Security.',
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
              description: 'The number of the code scanning alert',
            },
          },
          required: ['owner', 'repo', 'alert_number'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.codeScanning.getAlert({
          owner: args.owner as string,
          repo: args.repo as string,
          alert_number: args.alert_number as number,
        });
        return successResult(data);
      },
    },

    // update_alert - Update a code scanning alert
    {
      definition: {
        name: 'github_codeScanning_update_alert',
        description: 'Update the status of a code scanning alert. Requires GitHub Advanced Security.',
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
              description: 'The number of the code scanning alert',
            },
            state: {
              type: 'string',
              enum: ['open', 'dismissed'],
              description: 'The state of the alert (open or dismissed)',
            },
            dismissed_reason: {
              type: 'string',
              enum: ['false positive', 'won\'t fix', 'used in tests'],
              description: 'The reason for dismissing the alert (required when state is dismissed)',
            },
            dismissed_comment: {
              type: 'string',
              description: 'A comment explaining why the alert was dismissed',
            },
          },
          required: ['owner', 'repo', 'alert_number', 'state'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.codeScanning.updateAlert({
          owner: args.owner as string,
          repo: args.repo as string,
          alert_number: args.alert_number as number,
          state: args.state as 'open' | 'dismissed',
          dismissed_reason: args.dismissed_reason as 'false positive' | 'won\'t fix' | 'used in tests' | undefined,
          dismissed_comment: args.dismissed_comment as string | undefined,
        });
        return successResult(data);
      },
    },

    // list_recent_analyses - List code scanning analyses for a repository
    {
      definition: {
        name: 'github_codeScanning_list_recent_analyses',
        description: 'List code scanning analyses for a repository. Requires GitHub Advanced Security.',
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
            tool_name: {
              type: 'string',
              description: 'The name of the tool used to generate the code scanning analysis',
            },
            tool_guid: {
              type: 'string',
              description: 'The GUID of the tool used to generate the code scanning analysis',
            },
            ref: {
              type: 'string',
              description: 'Git reference (branch name, tag, or SHA)',
            },
            sarif_id: {
              type: 'string',
              description: 'Filter by SARIF ID',
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
        const { data } = await octokit.codeScanning.listRecentAnalyses({
          owner: args.owner as string,
          repo: args.repo as string,
          tool_name: args.tool_name as string | undefined,
          tool_guid: args.tool_guid as string | undefined,
          ref: args.ref as string | undefined,
          sarif_id: args.sarif_id as string | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_analysis - Get a code scanning analysis for a repository
    {
      definition: {
        name: 'github_codeScanning_get_analysis',
        description: 'Get a specific code scanning analysis by ID. Requires GitHub Advanced Security.',
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
            analysis_id: {
              type: 'number',
              description: 'The unique identifier of the analysis',
            },
          },
          required: ['owner', 'repo', 'analysis_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.codeScanning.getAnalysis({
          owner: args.owner as string,
          repo: args.repo as string,
          analysis_id: args.analysis_id as number,
        });
        return successResult(data);
      },
    },

    // delete_analysis - Delete a code scanning analysis
    {
      definition: {
        name: 'github_codeScanning_delete_analysis',
        description: 'Delete a code scanning analysis. Requires GitHub Advanced Security and admin access.',
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
            analysis_id: {
              type: 'number',
              description: 'The unique identifier of the analysis',
            },
            confirm_delete: {
              type: 'string',
              description: 'Set to the analysis ID to confirm deletion of the last analysis for a ref',
            },
          },
          required: ['owner', 'repo', 'analysis_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.codeScanning.deleteAnalysis({
          owner: args.owner as string,
          repo: args.repo as string,
          analysis_id: args.analysis_id as number,
          confirm_delete: args.confirm_delete as string | undefined,
        });
        return successResult(data);
      },
    },

    // upload_sarif - Upload a SARIF file
    {
      definition: {
        name: 'github_codeScanning_upload_sarif',
        description: 'Upload a SARIF file containing code scanning results. Requires GitHub Advanced Security.',
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
            commit_sha: {
              type: 'string',
              description: 'The SHA of the commit to which the analysis applies',
            },
            ref: {
              type: 'string',
              description: 'The full Git reference (e.g., refs/heads/main)',
            },
            sarif: {
              type: 'string',
              description: 'A Base64-encoded, gzip-compressed SARIF file',
            },
            checkout_uri: {
              type: 'string',
              description: 'The URI of the repository checkout (for relative file paths)',
            },
            started_at: {
              type: 'string',
              description: 'ISO 8601 timestamp when the analysis started',
            },
            tool_name: {
              type: 'string',
              description: 'The name of the tool used to generate the code scanning analysis',
            },
          },
          required: ['owner', 'repo', 'commit_sha', 'ref', 'sarif'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.codeScanning.uploadSarif({
          owner: args.owner as string,
          repo: args.repo as string,
          commit_sha: args.commit_sha as string,
          ref: args.ref as string,
          sarif: args.sarif as string,
          checkout_uri: args.checkout_uri as string | undefined,
          started_at: args.started_at as string | undefined,
          tool_name: args.tool_name as string | undefined,
        });
        return successResult(data);
      },
    },

    // get_sarif - Get information about a SARIF upload
    {
      definition: {
        name: 'github_codeScanning_get_sarif',
        description: 'Get information about a SARIF upload. Requires GitHub Advanced Security.',
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
            sarif_id: {
              type: 'string',
              description: 'The SARIF ID obtained from the upload response',
            },
          },
          required: ['owner', 'repo', 'sarif_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.codeScanning.getSarif({
          owner: args.owner as string,
          repo: args.repo as string,
          sarif_id: args.sarif_id as string,
        });
        return successResult(data);
      },
    },
  ],
};
