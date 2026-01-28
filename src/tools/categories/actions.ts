import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const actionsCategory: ToolCategory = {
  name: 'actions',
  description: 'GitHub Actions workflow tools',
  tools: [
    // list_repo_workflows - List repository workflows
    {
      definition: {
        name: 'github_actions_list_repo_workflows',
        description: 'List all workflows in a repository',
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
        const { data } = await octokit.actions.listRepoWorkflows({
          owner: args.owner as string,
          repo: args.repo as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_workflow - Get a workflow
    {
      definition: {
        name: 'github_actions_get_workflow',
        description: 'Get a specific workflow by ID or filename',
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
            workflow_id: {
              type: 'string',
              description: 'Workflow ID or workflow filename (e.g., main.yml)',
            },
          },
          required: ['owner', 'repo', 'workflow_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.actions.getWorkflow({
          owner: args.owner as string,
          repo: args.repo as string,
          workflow_id: args.workflow_id as string | number,
        });
        return successResult(data);
      },
    },

    // get_workflow_usage - Get workflow usage
    {
      definition: {
        name: 'github_actions_get_workflow_usage',
        description: 'Get the number of billable minutes used by a workflow',
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
            workflow_id: {
              type: 'string',
              description: 'Workflow ID or workflow filename',
            },
          },
          required: ['owner', 'repo', 'workflow_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.actions.getWorkflowUsage({
          owner: args.owner as string,
          repo: args.repo as string,
          workflow_id: args.workflow_id as string | number,
        });
        return successResult(data);
      },
    },

    // list_workflow_runs - List workflow runs
    {
      definition: {
        name: 'github_actions_list_workflow_runs',
        description: 'List all workflow runs for a repository or specific workflow',
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
            workflow_id: {
              type: 'string',
              description: 'Workflow ID or filename (optional, lists all runs if omitted)',
            },
            actor: {
              type: 'string',
              description: 'Filter by actor (username)',
            },
            branch: {
              type: 'string',
              description: 'Filter by branch name',
            },
            event: {
              type: 'string',
              description: 'Filter by event type (e.g., push, pull_request)',
            },
            status: {
              type: 'string',
              enum: ['completed', 'action_required', 'cancelled', 'failure', 'neutral', 'skipped', 'stale', 'success', 'timed_out', 'in_progress', 'queued', 'requested', 'waiting', 'pending'],
              description: 'Filter by status',
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
        if (args.workflow_id) {
          const { data } = await octokit.actions.listWorkflowRuns({
            owner: args.owner as string,
            repo: args.repo as string,
            workflow_id: args.workflow_id as string | number,
            actor: args.actor as string | undefined,
            branch: args.branch as string | undefined,
            event: args.event as string | undefined,
            status: args.status as 'completed' | 'action_required' | 'cancelled' | 'failure' | 'neutral' | 'skipped' | 'stale' | 'success' | 'timed_out' | 'in_progress' | 'queued' | 'requested' | 'waiting' | 'pending' | undefined,
            per_page: args.per_page as number | undefined,
            page: args.page as number | undefined,
          });
          return successResult(data);
        } else {
          const { data } = await octokit.actions.listWorkflowRunsForRepo({
            owner: args.owner as string,
            repo: args.repo as string,
            actor: args.actor as string | undefined,
            branch: args.branch as string | undefined,
            event: args.event as string | undefined,
            status: args.status as 'completed' | 'action_required' | 'cancelled' | 'failure' | 'neutral' | 'skipped' | 'stale' | 'success' | 'timed_out' | 'in_progress' | 'queued' | 'requested' | 'waiting' | 'pending' | undefined,
            per_page: args.per_page as number | undefined,
            page: args.page as number | undefined,
          });
          return successResult(data);
        }
      },
    },

    // get_workflow_run - Get a workflow run
    {
      definition: {
        name: 'github_actions_get_workflow_run',
        description: 'Get a specific workflow run by ID',
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
            run_id: {
              type: 'number',
              description: 'The unique identifier of the workflow run',
            },
          },
          required: ['owner', 'repo', 'run_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.actions.getWorkflowRun({
          owner: args.owner as string,
          repo: args.repo as string,
          run_id: args.run_id as number,
        });
        return successResult(data);
      },
    },

    // cancel_workflow_run - Cancel a workflow run
    {
      definition: {
        name: 'github_actions_cancel_workflow_run',
        description: 'Cancel a workflow run that is in progress',
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
            run_id: {
              type: 'number',
              description: 'The unique identifier of the workflow run',
            },
          },
          required: ['owner', 'repo', 'run_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.actions.cancelWorkflowRun({
          owner: args.owner as string,
          repo: args.repo as string,
          run_id: args.run_id as number,
        });
        return successResult({ success: true, message: 'Workflow run cancelled' });
      },
    },

    // rerun_workflow - Re-run a workflow
    {
      definition: {
        name: 'github_actions_rerun_workflow',
        description: 'Re-run an entire workflow run',
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
            run_id: {
              type: 'number',
              description: 'The unique identifier of the workflow run',
            },
            enable_debug_logging: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Enable debug logging for the re-run',
            },
          },
          required: ['owner', 'repo', 'run_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.actions.reRunWorkflow({
          owner: args.owner as string,
          repo: args.repo as string,
          run_id: args.run_id as number,
          enable_debug_logging: args.enable_debug_logging === 'true',
        });
        return successResult({ success: true, message: 'Workflow re-run triggered' });
      },
    },

    // list_jobs_for_workflow_run - List jobs for a workflow run
    {
      definition: {
        name: 'github_actions_list_jobs_for_workflow_run',
        description: 'List all jobs for a specific workflow run',
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
            run_id: {
              type: 'number',
              description: 'The unique identifier of the workflow run',
            },
            filter: {
              type: 'string',
              enum: ['latest', 'all'],
              description: 'Filter jobs by completion status',
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
          required: ['owner', 'repo', 'run_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.actions.listJobsForWorkflowRun({
          owner: args.owner as string,
          repo: args.repo as string,
          run_id: args.run_id as number,
          filter: args.filter as 'latest' | 'all' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_job - Get a job for a workflow run
    {
      definition: {
        name: 'github_actions_get_job',
        description: 'Get a specific job from a workflow run',
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
            job_id: {
              type: 'number',
              description: 'The unique identifier of the job',
            },
          },
          required: ['owner', 'repo', 'job_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.actions.getJobForWorkflowRun({
          owner: args.owner as string,
          repo: args.repo as string,
          job_id: args.job_id as number,
        });
        return successResult(data);
      },
    },

    // download_job_logs - Download job logs
    {
      definition: {
        name: 'github_actions_download_job_logs',
        description: 'Get the download URL for job logs',
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
            job_id: {
              type: 'number',
              description: 'The unique identifier of the job',
            },
          },
          required: ['owner', 'repo', 'job_id'],
        },
      },
      handler: async (octokit, args) => {
        const { url } = await octokit.actions.downloadJobLogsForWorkflowRun({
          owner: args.owner as string,
          repo: args.repo as string,
          job_id: args.job_id as number,
        });
        return successResult({ download_url: url });
      },
    },

    // list_artifacts - List artifacts for a repository
    {
      definition: {
        name: 'github_actions_list_artifacts',
        description: 'List all artifacts for a repository',
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
            name: {
              type: 'string',
              description: 'Filter artifacts by exact name match',
            },
          },
          required: ['owner', 'repo'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.actions.listArtifactsForRepo({
          owner: args.owner as string,
          repo: args.repo as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
          name: args.name as string | undefined,
        });
        return successResult(data);
      },
    },

    // get_artifact - Get an artifact
    {
      definition: {
        name: 'github_actions_get_artifact',
        description: 'Get a specific artifact by ID',
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
            artifact_id: {
              type: 'number',
              description: 'The unique identifier of the artifact',
            },
          },
          required: ['owner', 'repo', 'artifact_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.actions.getArtifact({
          owner: args.owner as string,
          repo: args.repo as string,
          artifact_id: args.artifact_id as number,
        });
        return successResult(data);
      },
    },

    // delete_artifact - Delete an artifact
    {
      definition: {
        name: 'github_actions_delete_artifact',
        description: 'Delete an artifact by ID',
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
            artifact_id: {
              type: 'number',
              description: 'The unique identifier of the artifact',
            },
          },
          required: ['owner', 'repo', 'artifact_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.actions.deleteArtifact({
          owner: args.owner as string,
          repo: args.repo as string,
          artifact_id: args.artifact_id as number,
        });
        return successResult({ success: true, message: 'Artifact deleted' });
      },
    },

    // list_repo_secrets - List repository secrets
    {
      definition: {
        name: 'github_actions_list_repo_secrets',
        description: 'List all secrets available in a repository (names only, not values)',
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
        const { data } = await octokit.actions.listRepoSecrets({
          owner: args.owner as string,
          repo: args.repo as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_repo_secret - Get a repository secret
    {
      definition: {
        name: 'github_actions_get_repo_secret',
        description: 'Get metadata about a repository secret (not the value)',
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
        const { data } = await octokit.actions.getRepoSecret({
          owner: args.owner as string,
          repo: args.repo as string,
          secret_name: args.secret_name as string,
        });
        return successResult(data);
      },
    },

    // create_or_update_repo_secret - Create or update a repository secret
    {
      definition: {
        name: 'github_actions_create_or_update_repo_secret',
        description: 'Create or update a repository secret. Value must be encrypted with the repository public key.',
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
        await octokit.actions.createOrUpdateRepoSecret({
          owner: args.owner as string,
          repo: args.repo as string,
          secret_name: args.secret_name as string,
          encrypted_value: args.encrypted_value as string,
          key_id: args.key_id as string,
        });
        return successResult({ success: true, message: 'Secret created or updated' });
      },
    },

    // delete_repo_secret - Delete a repository secret
    {
      definition: {
        name: 'github_actions_delete_repo_secret',
        description: 'Delete a repository secret by name',
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
        await octokit.actions.deleteRepoSecret({
          owner: args.owner as string,
          repo: args.repo as string,
          secret_name: args.secret_name as string,
        });
        return successResult({ success: true, message: 'Secret deleted' });
      },
    },
  ],
};
