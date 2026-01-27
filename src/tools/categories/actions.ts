import { Octokit } from '@octokit/rest';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const actionsTools: Tool[] = [
  {
    name: 'github_actions_listWorkflows',
    description: 'List workflows in a repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_actions_getWorkflow',
    description: 'Get a specific workflow',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        workflow_id: {
          type: ['string', 'number'],
          description: 'Workflow ID or filename',
        },
      },
      required: ['owner', 'repo', 'workflow_id'],
    },
  },
  {
    name: 'github_actions_listWorkflowRuns',
    description: 'List workflow runs for a repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        workflow_id: {
          type: ['string', 'number'],
          description: 'Workflow ID or filename (optional)',
        },
        actor: { type: 'string', description: 'Filter by user who triggered' },
        branch: { type: 'string', description: 'Filter by branch' },
        event: { type: 'string', description: 'Filter by event type' },
        status: {
          type: 'string',
          enum: ['completed', 'action_required', 'cancelled', 'failure', 'neutral', 'skipped', 'stale', 'success', 'timed_out', 'in_progress', 'queued', 'requested', 'waiting', 'pending'],
        },
        created: { type: 'string', description: 'Filter by creation date range' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_actions_getWorkflowRun',
    description: 'Get a specific workflow run',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        run_id: { type: 'number', description: 'Workflow run ID' },
      },
      required: ['owner', 'repo', 'run_id'],
    },
  },
  {
    name: 'github_actions_rerunWorkflow',
    description: 'Re-run a workflow',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        run_id: { type: 'number', description: 'Workflow run ID' },
        enable_debug_logging: { type: 'boolean', description: 'Enable debug logging' },
      },
      required: ['owner', 'repo', 'run_id'],
    },
  },
  {
    name: 'github_actions_cancelWorkflowRun',
    description: 'Cancel a workflow run',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        run_id: { type: 'number', description: 'Workflow run ID' },
      },
      required: ['owner', 'repo', 'run_id'],
    },
  },
  {
    name: 'github_actions_listWorkflowRunJobs',
    description: 'List jobs for a workflow run',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        run_id: { type: 'number', description: 'Workflow run ID' },
        filter: {
          type: 'string',
          enum: ['latest', 'all'],
          description: 'Filter jobs',
        },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo', 'run_id'],
    },
  },
  {
    name: 'github_actions_getJob',
    description: 'Get a specific job',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        job_id: { type: 'number', description: 'Job ID' },
      },
      required: ['owner', 'repo', 'job_id'],
    },
  },
  {
    name: 'github_actions_downloadJobLogs',
    description: 'Download job logs URL',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        job_id: { type: 'number', description: 'Job ID' },
      },
      required: ['owner', 'repo', 'job_id'],
    },
  },
  {
    name: 'github_actions_listArtifacts',
    description: 'List artifacts for a repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_actions_listWorkflowRunArtifacts',
    description: 'List artifacts for a workflow run',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        run_id: { type: 'number', description: 'Workflow run ID' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo', 'run_id'],
    },
  },
  {
    name: 'github_actions_getArtifact',
    description: 'Get a specific artifact',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        artifact_id: { type: 'number', description: 'Artifact ID' },
      },
      required: ['owner', 'repo', 'artifact_id'],
    },
  },
  {
    name: 'github_actions_deleteArtifact',
    description: 'Delete an artifact',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        artifact_id: { type: 'number', description: 'Artifact ID' },
      },
      required: ['owner', 'repo', 'artifact_id'],
    },
  },
  {
    name: 'github_actions_createWorkflowDispatch',
    description: 'Trigger a workflow dispatch event',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        workflow_id: {
          type: ['string', 'number'],
          description: 'Workflow ID or filename',
        },
        ref: { type: 'string', description: 'Branch or tag to run workflow on' },
        inputs: {
          type: 'object',
          description: 'Input parameters for the workflow',
          additionalProperties: { type: 'string' },
        },
      },
      required: ['owner', 'repo', 'workflow_id', 'ref'],
    },
  },
  {
    name: 'github_actions_listSecrets',
    description: 'List repository secrets',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_actions_getRepoPublicKey',
    description: 'Get repository public key for encrypting secrets',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_actions_listVariables',
    description: 'List repository variables',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_actions_createVariable',
    description: 'Create a repository variable',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        name: { type: 'string', description: 'Variable name' },
        value: { type: 'string', description: 'Variable value' },
      },
      required: ['owner', 'repo', 'name', 'value'],
    },
  },
  {
    name: 'github_actions_listRunners',
    description: 'List self-hosted runners for a repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo'],
    },
  },
];

export async function handleActionsTool(
  octokit: Octokit,
  args: Record<string, unknown>
): Promise<unknown> {
  const owner = args.owner as string;
  const repo = args.repo as string;
  const workflowId = args.workflow_id as string | number | undefined;
  const runId = args.run_id as number | undefined;
  const jobId = args.job_id as number | undefined;
  const artifactId = args.artifact_id as number | undefined;

  // List workflows
  if (!workflowId && !runId && !jobId && !artifactId && !('name' in args)) {
    const { data } = await octokit.actions.listRepoWorkflows(args as Parameters<typeof octokit.actions.listRepoWorkflows>[0]);
    return data;
  }

  // Get workflow
  if (workflowId && !runId && !('ref' in args)) {
    const { data } = await octokit.actions.getWorkflow({ owner, repo, workflow_id: workflowId });
    return data;
  }

  // List workflow runs
  if (!runId && !jobId && ('actor' in args || 'branch' in args || 'event' in args || 'status' in args || 'created' in args)) {
    if (workflowId) {
      const { data } = await octokit.actions.listWorkflowRuns({ owner, repo, workflow_id: workflowId, ...args } as Parameters<typeof octokit.actions.listWorkflowRuns>[0]);
      return data;
    }
    const { data } = await octokit.actions.listWorkflowRunsForRepo(args as Parameters<typeof octokit.actions.listWorkflowRunsForRepo>[0]);
    return data;
  }

  // Get workflow run
  if (runId && !('enable_debug_logging' in args) && !('filter' in args) && !artifactId) {
    const { data } = await octokit.actions.getWorkflowRun({ owner, repo, run_id: runId });
    return data;
  }

  // Re-run workflow
  if (runId && 'enable_debug_logging' in args) {
    await octokit.actions.reRunWorkflow({ owner, repo, run_id: runId, enable_debug_logging: args.enable_debug_logging as boolean });
    return { success: true, message: 'Workflow re-run triggered' };
  }

  // Cancel workflow run
  if (runId && Object.keys(args).filter(k => !['owner', 'repo', 'run_id'].includes(k)).length === 0) {
    await octokit.actions.cancelWorkflowRun({ owner, repo, run_id: runId });
    return { success: true, message: 'Workflow run cancelled' };
  }

  // List workflow run jobs
  if (runId && 'filter' in args) {
    const { data } = await octokit.actions.listJobsForWorkflowRun(args as Parameters<typeof octokit.actions.listJobsForWorkflowRun>[0]);
    return data;
  }

  // Get job
  if (jobId && !('download' in args)) {
    const { data } = await octokit.actions.getJobForWorkflowRun({ owner, repo, job_id: jobId });
    return data;
  }

  // Download job logs
  if (jobId) {
    const { data } = await octokit.actions.downloadJobLogsForWorkflowRun({ owner, repo, job_id: jobId });
    return { logs_url: data };
  }

  // List artifacts
  if (!artifactId && !runId && !workflowId && !('name' in args)) {
    const { data } = await octokit.actions.listArtifactsForRepo(args as Parameters<typeof octokit.actions.listArtifactsForRepo>[0]);
    return data;
  }

  // List workflow run artifacts
  if (runId && !('filter' in args)) {
    const { data } = await octokit.actions.listWorkflowRunArtifacts(args as Parameters<typeof octokit.actions.listWorkflowRunArtifacts>[0]);
    return data;
  }

  // Get artifact
  if (artifactId) {
    const { data } = await octokit.actions.getArtifact({ owner, repo, artifact_id: artifactId });
    return data;
  }

  // Create workflow dispatch
  if (workflowId && 'ref' in args) {
    await octokit.actions.createWorkflowDispatch(args as Parameters<typeof octokit.actions.createWorkflowDispatch>[0]);
    return { success: true, message: 'Workflow dispatch event created' };
  }

  // List secrets
  if ('secrets' in args || (!workflowId && !runId && !artifactId && !('name' in args) && !('value' in args))) {
    const { data } = await octokit.actions.listRepoSecrets(args as Parameters<typeof octokit.actions.listRepoSecrets>[0]);
    return data;
  }

  // Get public key
  if ('public_key' in args) {
    const { data } = await octokit.actions.getRepoPublicKey({ owner, repo });
    return data;
  }

  // List variables
  if ('variables' in args) {
    const { data } = await octokit.actions.listRepoVariables(args as Parameters<typeof octokit.actions.listRepoVariables>[0]);
    return data;
  }

  // Create variable
  if ('name' in args && 'value' in args) {
    await octokit.actions.createRepoVariable(args as Parameters<typeof octokit.actions.createRepoVariable>[0]);
    return { success: true, message: 'Variable created' };
  }

  // List runners
  if ('runners' in args) {
    const { data } = await octokit.actions.listSelfHostedRunnersForRepo(args as Parameters<typeof octokit.actions.listSelfHostedRunnersForRepo>[0]);
    return data;
  }

  // Default: list workflows
  const { data } = await octokit.actions.listRepoWorkflows({ owner, repo });
  return data;
}
