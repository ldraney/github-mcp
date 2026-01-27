import { Octokit } from '@octokit/rest';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const issuesTools: Tool[] = [
  {
    name: 'github_issues_list',
    description: 'List issues assigned to the authenticated user',
    inputSchema: {
      type: 'object',
      properties: {
        filter: {
          type: 'string',
          enum: ['assigned', 'created', 'mentioned', 'subscribed', 'repos', 'all'],
          description: 'Filter by relationship to authenticated user',
        },
        state: {
          type: 'string',
          enum: ['open', 'closed', 'all'],
          description: 'Filter by state',
        },
        labels: {
          type: 'string',
          description: 'Comma-separated list of label names',
        },
        sort: {
          type: 'string',
          enum: ['created', 'updated', 'comments'],
        },
        direction: {
          type: 'string',
          enum: ['asc', 'desc'],
        },
        since: {
          type: 'string',
          description: 'ISO 8601 date - only issues updated after this',
        },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
    },
  },
  {
    name: 'github_issues_listForRepo',
    description: 'List issues for a repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        milestone: { type: 'string', description: 'Milestone number or "*" or "none"' },
        state: {
          type: 'string',
          enum: ['open', 'closed', 'all'],
        },
        assignee: { type: 'string', description: 'Username, "*" for any, "none" for unassigned' },
        creator: { type: 'string', description: 'Username of issue creator' },
        mentioned: { type: 'string', description: 'Username mentioned in issue' },
        labels: { type: 'string', description: 'Comma-separated label names' },
        sort: {
          type: 'string',
          enum: ['created', 'updated', 'comments'],
        },
        direction: {
          type: 'string',
          enum: ['asc', 'desc'],
        },
        since: { type: 'string', description: 'ISO 8601 date' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_issues_get',
    description: 'Get a specific issue',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        issue_number: { type: 'number', description: 'Issue number' },
      },
      required: ['owner', 'repo', 'issue_number'],
    },
  },
  {
    name: 'github_issues_create',
    description: 'Create an issue',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        title: { type: 'string', description: 'Issue title' },
        body: { type: 'string', description: 'Issue body/description' },
        assignees: {
          type: 'array',
          items: { type: 'string' },
          description: 'Usernames to assign',
        },
        milestone: { type: 'number', description: 'Milestone number' },
        labels: {
          type: 'array',
          items: { type: 'string' },
          description: 'Label names',
        },
      },
      required: ['owner', 'repo', 'title'],
    },
  },
  {
    name: 'github_issues_update',
    description: 'Update an issue',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        issue_number: { type: 'number', description: 'Issue number' },
        title: { type: 'string', description: 'Issue title' },
        body: { type: 'string', description: 'Issue body' },
        state: {
          type: 'string',
          enum: ['open', 'closed'],
        },
        state_reason: {
          type: 'string',
          enum: ['completed', 'not_planned', 'reopened'],
        },
        assignees: {
          type: 'array',
          items: { type: 'string' },
        },
        milestone: { type: 'number' },
        labels: {
          type: 'array',
          items: { type: 'string' },
        },
      },
      required: ['owner', 'repo', 'issue_number'],
    },
  },
  {
    name: 'github_issues_listComments',
    description: 'List comments on an issue',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        issue_number: { type: 'number', description: 'Issue number' },
        since: { type: 'string', description: 'ISO 8601 date' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo', 'issue_number'],
    },
  },
  {
    name: 'github_issues_createComment',
    description: 'Create a comment on an issue',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        issue_number: { type: 'number', description: 'Issue number' },
        body: { type: 'string', description: 'Comment body' },
      },
      required: ['owner', 'repo', 'issue_number', 'body'],
    },
  },
  {
    name: 'github_issues_updateComment',
    description: 'Update a comment on an issue',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        comment_id: { type: 'number', description: 'Comment ID' },
        body: { type: 'string', description: 'New comment body' },
      },
      required: ['owner', 'repo', 'comment_id', 'body'],
    },
  },
  {
    name: 'github_issues_deleteComment',
    description: 'Delete a comment on an issue',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        comment_id: { type: 'number', description: 'Comment ID' },
      },
      required: ['owner', 'repo', 'comment_id'],
    },
  },
  {
    name: 'github_issues_listLabels',
    description: 'List labels for a repository',
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
    name: 'github_issues_createLabel',
    description: 'Create a label',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        name: { type: 'string', description: 'Label name' },
        color: { type: 'string', description: 'Hex color code (without #)' },
        description: { type: 'string', description: 'Label description' },
      },
      required: ['owner', 'repo', 'name', 'color'],
    },
  },
  {
    name: 'github_issues_addLabels',
    description: 'Add labels to an issue',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        issue_number: { type: 'number', description: 'Issue number' },
        labels: {
          type: 'array',
          items: { type: 'string' },
          description: 'Label names to add',
        },
      },
      required: ['owner', 'repo', 'issue_number', 'labels'],
    },
  },
  {
    name: 'github_issues_removeLabel',
    description: 'Remove a label from an issue',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        issue_number: { type: 'number', description: 'Issue number' },
        name: { type: 'string', description: 'Label name to remove' },
      },
      required: ['owner', 'repo', 'issue_number', 'name'],
    },
  },
  {
    name: 'github_issues_listMilestones',
    description: 'List milestones for a repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        state: {
          type: 'string',
          enum: ['open', 'closed', 'all'],
        },
        sort: {
          type: 'string',
          enum: ['due_on', 'completeness'],
        },
        direction: {
          type: 'string',
          enum: ['asc', 'desc'],
        },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_issues_createMilestone',
    description: 'Create a milestone',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        title: { type: 'string', description: 'Milestone title' },
        state: {
          type: 'string',
          enum: ['open', 'closed'],
        },
        description: { type: 'string', description: 'Milestone description' },
        due_on: { type: 'string', description: 'ISO 8601 due date' },
      },
      required: ['owner', 'repo', 'title'],
    },
  },
  {
    name: 'github_issues_addAssignees',
    description: 'Add assignees to an issue',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        issue_number: { type: 'number', description: 'Issue number' },
        assignees: {
          type: 'array',
          items: { type: 'string' },
          description: 'Usernames to assign',
        },
      },
      required: ['owner', 'repo', 'issue_number', 'assignees'],
    },
  },
  {
    name: 'github_issues_removeAssignees',
    description: 'Remove assignees from an issue',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        issue_number: { type: 'number', description: 'Issue number' },
        assignees: {
          type: 'array',
          items: { type: 'string' },
          description: 'Usernames to remove',
        },
      },
      required: ['owner', 'repo', 'issue_number', 'assignees'],
    },
  },
];

export async function handleIssuesTool(
  octokit: Octokit,
  args: Record<string, unknown>
): Promise<unknown> {
  const owner = args.owner as string | undefined;
  const repo = args.repo as string | undefined;
  const issueNumber = args.issue_number as number | undefined;

  // List issues for authenticated user
  if (!owner && !repo) {
    const { data } = await octokit.issues.list(args as Parameters<typeof octokit.issues.list>[0]);
    return data;
  }

  // List issues for repo
  if (owner && repo && !issueNumber && !('comment_id' in args) && !('labels' in args && Array.isArray(args.labels))) {
    if (!('title' in args) && !('state' in args && ('body' in args || 'assignees' in args))) {
      const { data } = await octokit.issues.listForRepo(args as Parameters<typeof octokit.issues.listForRepo>[0]);
      return data;
    }
  }

  // Get specific issue
  if (owner && repo && issueNumber && !('body' in args) && !('title' in args) && !('labels' in args) && !('assignees' in args)) {
    // Could be get, listComments
    if ('since' in args || 'per_page' in args || 'page' in args) {
      const { data } = await octokit.issues.listComments(args as Parameters<typeof octokit.issues.listComments>[0]);
      return data;
    }
    const { data } = await octokit.issues.get(args as Parameters<typeof octokit.issues.get>[0]);
    return data;
  }

  // Create issue
  if (owner && repo && 'title' in args && !issueNumber) {
    const { data } = await octokit.issues.create(args as Parameters<typeof octokit.issues.create>[0]);
    return data;
  }

  // Update issue
  if (owner && repo && issueNumber && ('title' in args || 'body' in args || 'state' in args)) {
    const { data } = await octokit.issues.update(args as Parameters<typeof octokit.issues.update>[0]);
    return data;
  }

  // Create comment
  if (owner && repo && issueNumber && 'body' in args && !('comment_id' in args)) {
    const { data } = await octokit.issues.createComment(args as Parameters<typeof octokit.issues.createComment>[0]);
    return data;
  }

  // Update comment
  if (owner && repo && 'comment_id' in args && 'body' in args) {
    const { data } = await octokit.issues.updateComment(args as Parameters<typeof octokit.issues.updateComment>[0]);
    return data;
  }

  // Delete comment
  if (owner && repo && 'comment_id' in args && !('body' in args)) {
    await octokit.issues.deleteComment(args as Parameters<typeof octokit.issues.deleteComment>[0]);
    return { success: true, message: 'Comment deleted' };
  }

  // Labels operations
  if (owner && repo && 'name' in args && 'color' in args) {
    const { data } = await octokit.issues.createLabel(args as Parameters<typeof octokit.issues.createLabel>[0]);
    return data;
  }

  if (owner && repo && issueNumber && 'labels' in args && Array.isArray(args.labels)) {
    const { data } = await octokit.issues.addLabels(args as Parameters<typeof octokit.issues.addLabels>[0]);
    return data;
  }

  if (owner && repo && issueNumber && 'name' in args && !('color' in args)) {
    await octokit.issues.removeLabel(args as Parameters<typeof octokit.issues.removeLabel>[0]);
    return { success: true, message: 'Label removed' };
  }

  // List labels
  if (owner && repo && !issueNumber && !('title' in args) && !('name' in args)) {
    const { data } = await octokit.issues.listLabelsForRepo(args as Parameters<typeof octokit.issues.listLabelsForRepo>[0]);
    return data;
  }

  // Milestones
  if (owner && repo && 'title' in args && !issueNumber && !('color' in args)) {
    const { data } = await octokit.issues.createMilestone(args as Parameters<typeof octokit.issues.createMilestone>[0]);
    return data;
  }

  // Assignees
  if (owner && repo && issueNumber && 'assignees' in args) {
    // Check if we're adding or removing based on context
    const { data } = await octokit.issues.addAssignees(args as Parameters<typeof octokit.issues.addAssignees>[0]);
    return data;
  }

  // Default: list for authenticated user
  const { data } = await octokit.issues.list();
  return data;
}
