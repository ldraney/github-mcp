import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const checksCategory: ToolCategory = {
  name: 'checks',
  description: 'GitHub checks tools',
  tools: [
    // list_for_ref - List check runs for a Git reference
    {
      definition: {
        name: 'github_checks_list_for_ref',
        description: 'List check runs for a commit ref (branch name, tag, or SHA)',
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
            ref: {
              type: 'string',
              description: 'The commit reference (branch name, tag, or SHA)',
            },
            check_name: {
              type: 'string',
              description: 'Filter by check run name',
            },
            status: {
              type: 'string',
              enum: ['queued', 'in_progress', 'completed'],
              description: 'Filter by check run status',
            },
            filter: {
              type: 'string',
              enum: ['latest', 'all'],
              description: 'Filter check runs (latest per check name or all)',
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
          required: ['owner', 'repo', 'ref'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.checks.listForRef({
          owner: args.owner as string,
          repo: args.repo as string,
          ref: args.ref as string,
          check_name: args.check_name as string | undefined,
          status: args.status as 'queued' | 'in_progress' | 'completed' | undefined,
          filter: args.filter as 'latest' | 'all' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_for_suite - List check runs in a check suite
    {
      definition: {
        name: 'github_checks_list_for_suite',
        description: 'List check runs in a check suite',
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
            check_suite_id: {
              type: 'number',
              description: 'The unique identifier of the check suite',
            },
            check_name: {
              type: 'string',
              description: 'Filter by check run name',
            },
            status: {
              type: 'string',
              enum: ['queued', 'in_progress', 'completed'],
              description: 'Filter by check run status',
            },
            filter: {
              type: 'string',
              enum: ['latest', 'all'],
              description: 'Filter check runs (latest per check name or all)',
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
          required: ['owner', 'repo', 'check_suite_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.checks.listForSuite({
          owner: args.owner as string,
          repo: args.repo as string,
          check_suite_id: args.check_suite_id as number,
          check_name: args.check_name as string | undefined,
          status: args.status as 'queued' | 'in_progress' | 'completed' | undefined,
          filter: args.filter as 'latest' | 'all' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get - Get a check run
    {
      definition: {
        name: 'github_checks_get',
        description: 'Get a specific check run by ID',
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
            check_run_id: {
              type: 'number',
              description: 'The unique identifier of the check run',
            },
          },
          required: ['owner', 'repo', 'check_run_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.checks.get({
          owner: args.owner as string,
          repo: args.repo as string,
          check_run_id: args.check_run_id as number,
        });
        return successResult(data);
      },
    },

    // create - Create a check run
    {
      definition: {
        name: 'github_checks_create',
        description: 'Create a new check run for a specific commit SHA. Requires GitHub App authentication.',
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
            name: {
              type: 'string',
              description: 'The name of the check run',
            },
            head_sha: {
              type: 'string',
              description: 'The SHA of the commit to associate with this check run',
            },
            details_url: {
              type: 'string',
              description: 'URL with full details of the check run',
            },
            external_id: {
              type: 'string',
              description: 'A reference for the run on the integrator system',
            },
            status: {
              type: 'string',
              enum: ['queued', 'in_progress', 'completed'],
              description: 'The current status of the check run',
            },
            started_at: {
              type: 'string',
              description: 'ISO 8601 timestamp when the check run started',
            },
            conclusion: {
              type: 'string',
              enum: ['action_required', 'cancelled', 'failure', 'neutral', 'success', 'skipped', 'stale', 'timed_out'],
              description: 'The final conclusion of the check (required if status is completed)',
            },
            completed_at: {
              type: 'string',
              description: 'ISO 8601 timestamp when the check run completed',
            },
            output_title: {
              type: 'string',
              description: 'Title of the check run output',
            },
            output_summary: {
              type: 'string',
              description: 'Summary of the check run output (supports Markdown)',
            },
            output_text: {
              type: 'string',
              description: 'Details of the check run output (supports Markdown)',
            },
          },
          required: ['owner', 'repo', 'name', 'head_sha'],
        },
      },
      handler: async (octokit, args) => {
        const params: Record<string, unknown> = {
          owner: args.owner as string,
          repo: args.repo as string,
          name: args.name as string,
          head_sha: args.head_sha as string,
        };

        if (args.details_url) params.details_url = args.details_url;
        if (args.external_id) params.external_id = args.external_id;
        if (args.status) params.status = args.status;
        if (args.started_at) params.started_at = args.started_at;
        if (args.conclusion) params.conclusion = args.conclusion;
        if (args.completed_at) params.completed_at = args.completed_at;

        // Build output object if any output fields are provided
        if (args.output_title || args.output_summary) {
          const output: { title: string; summary: string; text?: string } = {
            title: args.output_title as string,
            summary: args.output_summary as string,
          };
          if (args.output_text) output.text = args.output_text as string;
          params.output = output;
        }

        const { data } = await octokit.checks.create(params as Parameters<typeof octokit.checks.create>[0]);
        return successResult(data);
      },
    },

    // update - Update a check run
    {
      definition: {
        name: 'github_checks_update',
        description: 'Update an existing check run. Requires GitHub App authentication.',
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
            check_run_id: {
              type: 'number',
              description: 'The unique identifier of the check run',
            },
            name: {
              type: 'string',
              description: 'The name of the check run',
            },
            details_url: {
              type: 'string',
              description: 'URL with full details of the check run',
            },
            external_id: {
              type: 'string',
              description: 'A reference for the run on the integrator system',
            },
            status: {
              type: 'string',
              enum: ['queued', 'in_progress', 'completed'],
              description: 'The current status of the check run',
            },
            started_at: {
              type: 'string',
              description: 'ISO 8601 timestamp when the check run started',
            },
            conclusion: {
              type: 'string',
              enum: ['action_required', 'cancelled', 'failure', 'neutral', 'success', 'skipped', 'stale', 'timed_out'],
              description: 'The final conclusion of the check (required if status is completed)',
            },
            completed_at: {
              type: 'string',
              description: 'ISO 8601 timestamp when the check run completed',
            },
            output_title: {
              type: 'string',
              description: 'Title of the check run output',
            },
            output_summary: {
              type: 'string',
              description: 'Summary of the check run output (supports Markdown)',
            },
            output_text: {
              type: 'string',
              description: 'Details of the check run output (supports Markdown)',
            },
          },
          required: ['owner', 'repo', 'check_run_id'],
        },
      },
      handler: async (octokit, args) => {
        const params: Record<string, unknown> = {
          owner: args.owner as string,
          repo: args.repo as string,
          check_run_id: args.check_run_id as number,
        };

        if (args.name) params.name = args.name;
        if (args.details_url) params.details_url = args.details_url;
        if (args.external_id) params.external_id = args.external_id;
        if (args.status) params.status = args.status;
        if (args.started_at) params.started_at = args.started_at;
        if (args.conclusion) params.conclusion = args.conclusion;
        if (args.completed_at) params.completed_at = args.completed_at;

        // Build output object if any output fields are provided
        if (args.output_title || args.output_summary) {
          const output: { title: string; summary: string; text?: string } = {
            title: args.output_title as string,
            summary: args.output_summary as string,
          };
          if (args.output_text) output.text = args.output_text as string;
          params.output = output;
        }

        const { data } = await octokit.checks.update(params as Parameters<typeof octokit.checks.update>[0]);
        return successResult(data);
      },
    },

    // list_suites_for_ref - List check suites for a Git reference
    {
      definition: {
        name: 'github_checks_list_suites_for_ref',
        description: 'List check suites for a commit ref (branch name, tag, or SHA)',
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
            ref: {
              type: 'string',
              description: 'The commit reference (branch name, tag, or SHA)',
            },
            app_id: {
              type: 'number',
              description: 'Filter by GitHub App ID',
            },
            check_name: {
              type: 'string',
              description: 'Filter by check name',
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
          required: ['owner', 'repo', 'ref'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.checks.listSuitesForRef({
          owner: args.owner as string,
          repo: args.repo as string,
          ref: args.ref as string,
          app_id: args.app_id as number | undefined,
          check_name: args.check_name as string | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_suite - Get a check suite
    {
      definition: {
        name: 'github_checks_get_suite',
        description: 'Get a specific check suite by ID',
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
            check_suite_id: {
              type: 'number',
              description: 'The unique identifier of the check suite',
            },
          },
          required: ['owner', 'repo', 'check_suite_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.checks.getSuite({
          owner: args.owner as string,
          repo: args.repo as string,
          check_suite_id: args.check_suite_id as number,
        });
        return successResult(data);
      },
    },

    // create_suite - Create a check suite
    {
      definition: {
        name: 'github_checks_create_suite',
        description: 'Manually create a check suite for a commit. Requires GitHub App authentication.',
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
            head_sha: {
              type: 'string',
              description: 'The SHA of the commit to associate with this check suite',
            },
          },
          required: ['owner', 'repo', 'head_sha'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.checks.createSuite({
          owner: args.owner as string,
          repo: args.repo as string,
          head_sha: args.head_sha as string,
        });
        return successResult(data);
      },
    },

    // rerequest_suite - Rerequest a check suite
    {
      definition: {
        name: 'github_checks_rerequest_suite',
        description: 'Trigger a rerequest of a check suite. Causes GitHub to re-send the check_suite webhook event.',
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
            check_suite_id: {
              type: 'number',
              description: 'The unique identifier of the check suite',
            },
          },
          required: ['owner', 'repo', 'check_suite_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.checks.rerequestSuite({
          owner: args.owner as string,
          repo: args.repo as string,
          check_suite_id: args.check_suite_id as number,
        });
        return successResult({ success: true, message: 'Check suite rerequest triggered' });
      },
    },

    // list_annotations - List check run annotations
    {
      definition: {
        name: 'github_checks_list_annotations',
        description: 'List annotations for a check run (issues, warnings, or notices)',
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
            check_run_id: {
              type: 'number',
              description: 'The unique identifier of the check run',
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
          required: ['owner', 'repo', 'check_run_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.checks.listAnnotations({
          owner: args.owner as string,
          repo: args.repo as string,
          check_run_id: args.check_run_id as number,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },
  ],
};
