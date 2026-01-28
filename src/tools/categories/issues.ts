import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const issuesCategory: ToolCategory = {
  name: 'issues',
  description: 'Issue management tools',
  tools: [
    // list - List issues for a repository
    {
      definition: {
        name: 'github_issues_list',
        description: 'List issues for a repository',
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
              enum: ['open', 'closed', 'all'],
              description: 'Issue state filter',
            },
            labels: {
              type: 'string',
              description: 'Comma-separated list of label names',
            },
            sort: {
              type: 'string',
              enum: ['created', 'updated', 'comments'],
              description: 'Sort field',
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
        const { data } = await octokit.issues.listForRepo({
          owner: args.owner as string,
          repo: args.repo as string,
          state: args.state as 'open' | 'closed' | 'all' | undefined,
          labels: args.labels as string | undefined,
          sort: args.sort as 'created' | 'updated' | 'comments' | undefined,
          direction: args.direction as 'asc' | 'desc' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_for_user - List issues assigned to the authenticated user
    {
      definition: {
        name: 'github_issues_list_for_user',
        description: 'List issues assigned to the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            filter: {
              type: 'string',
              enum: ['assigned', 'created', 'mentioned', 'subscribed', 'repos', 'all'],
              description: 'Filter type',
            },
            state: {
              type: 'string',
              enum: ['open', 'closed', 'all'],
              description: 'Issue state filter',
            },
            labels: {
              type: 'string',
              description: 'Comma-separated list of label names',
            },
            sort: {
              type: 'string',
              enum: ['created', 'updated', 'comments'],
              description: 'Sort field',
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
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.issues.list({
          filter: args.filter as 'assigned' | 'created' | 'mentioned' | 'subscribed' | 'repos' | 'all' | undefined,
          state: args.state as 'open' | 'closed' | 'all' | undefined,
          labels: args.labels as string | undefined,
          sort: args.sort as 'created' | 'updated' | 'comments' | undefined,
          direction: args.direction as 'asc' | 'desc' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get - Get an issue
    {
      definition: {
        name: 'github_issues_get',
        description: 'Get an issue by number',
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
            issue_number: {
              type: 'number',
              description: 'Issue number',
            },
          },
          required: ['owner', 'repo', 'issue_number'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.issues.get({
          owner: args.owner as string,
          repo: args.repo as string,
          issue_number: args.issue_number as number,
        });
        return successResult(data);
      },
    },

    // create - Create an issue
    {
      definition: {
        name: 'github_issues_create',
        description: 'Create a new issue',
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
            title: {
              type: 'string',
              description: 'Issue title',
            },
            body: {
              type: 'string',
              description: 'Issue body',
            },
            labels: {
              type: 'array',
              items: { type: 'string' },
              description: 'Labels to add',
            },
            assignees: {
              type: 'array',
              items: { type: 'string' },
              description: 'Usernames to assign',
            },
            milestone: {
              type: 'number',
              description: 'Milestone number',
            },
          },
          required: ['owner', 'repo', 'title'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.issues.create({
          owner: args.owner as string,
          repo: args.repo as string,
          title: args.title as string,
          body: args.body as string | undefined,
          labels: args.labels as string[] | undefined,
          assignees: args.assignees as string[] | undefined,
          milestone: args.milestone as number | undefined,
        });
        return successResult(data);
      },
    },

    // update - Update an issue
    {
      definition: {
        name: 'github_issues_update',
        description: 'Update an issue',
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
            issue_number: {
              type: 'number',
              description: 'Issue number',
            },
            title: {
              type: 'string',
              description: 'Issue title',
            },
            body: {
              type: 'string',
              description: 'Issue body',
            },
            state: {
              type: 'string',
              enum: ['open', 'closed'],
              description: 'Issue state',
            },
            labels: {
              type: 'array',
              items: { type: 'string' },
              description: 'Labels to set',
            },
            assignees: {
              type: 'array',
              items: { type: 'string' },
              description: 'Usernames to assign',
            },
            milestone: {
              type: 'number',
              description: 'Milestone number',
            },
          },
          required: ['owner', 'repo', 'issue_number'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.issues.update({
          owner: args.owner as string,
          repo: args.repo as string,
          issue_number: args.issue_number as number,
          title: args.title as string | undefined,
          body: args.body as string | undefined,
          state: args.state as 'open' | 'closed' | undefined,
          labels: args.labels as string[] | undefined,
          assignees: args.assignees as string[] | undefined,
          milestone: args.milestone as number | undefined,
        });
        return successResult(data);
      },
    },

    // lock - Lock an issue
    {
      definition: {
        name: 'github_issues_lock',
        description: 'Lock an issue',
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
            issue_number: {
              type: 'number',
              description: 'Issue number',
            },
            lock_reason: {
              type: 'string',
              enum: ['off-topic', 'too heated', 'resolved', 'spam'],
              description: 'Reason for locking',
            },
          },
          required: ['owner', 'repo', 'issue_number'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.issues.lock({
          owner: args.owner as string,
          repo: args.repo as string,
          issue_number: args.issue_number as number,
          lock_reason: args.lock_reason as 'off-topic' | 'too heated' | 'resolved' | 'spam' | undefined,
        });
        return successResult({ success: true, message: 'Issue locked' });
      },
    },

    // unlock - Unlock an issue
    {
      definition: {
        name: 'github_issues_unlock',
        description: 'Unlock an issue',
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
            issue_number: {
              type: 'number',
              description: 'Issue number',
            },
          },
          required: ['owner', 'repo', 'issue_number'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.issues.unlock({
          owner: args.owner as string,
          repo: args.repo as string,
          issue_number: args.issue_number as number,
        });
        return successResult({ success: true, message: 'Issue unlocked' });
      },
    },

    // list_comments - List comments on an issue
    {
      definition: {
        name: 'github_issues_list_comments',
        description: 'List comments on an issue',
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
            issue_number: {
              type: 'number',
              description: 'Issue number',
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
          required: ['owner', 'repo', 'issue_number'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.issues.listComments({
          owner: args.owner as string,
          repo: args.repo as string,
          issue_number: args.issue_number as number,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_comment - Get a comment
    {
      definition: {
        name: 'github_issues_get_comment',
        description: 'Get a comment by ID',
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
            comment_id: {
              type: 'number',
              description: 'Comment ID',
            },
          },
          required: ['owner', 'repo', 'comment_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.issues.getComment({
          owner: args.owner as string,
          repo: args.repo as string,
          comment_id: args.comment_id as number,
        });
        return successResult(data);
      },
    },

    // create_comment - Create a comment
    {
      definition: {
        name: 'github_issues_create_comment',
        description: 'Create a comment on an issue',
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
            issue_number: {
              type: 'number',
              description: 'Issue number',
            },
            body: {
              type: 'string',
              description: 'Comment body',
            },
          },
          required: ['owner', 'repo', 'issue_number', 'body'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.issues.createComment({
          owner: args.owner as string,
          repo: args.repo as string,
          issue_number: args.issue_number as number,
          body: args.body as string,
        });
        return successResult(data);
      },
    },

    // update_comment - Update a comment
    {
      definition: {
        name: 'github_issues_update_comment',
        description: 'Update a comment',
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
            comment_id: {
              type: 'number',
              description: 'Comment ID',
            },
            body: {
              type: 'string',
              description: 'Comment body',
            },
          },
          required: ['owner', 'repo', 'comment_id', 'body'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.issues.updateComment({
          owner: args.owner as string,
          repo: args.repo as string,
          comment_id: args.comment_id as number,
          body: args.body as string,
        });
        return successResult(data);
      },
    },

    // delete_comment - Delete a comment
    {
      definition: {
        name: 'github_issues_delete_comment',
        description: 'Delete a comment',
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
            comment_id: {
              type: 'number',
              description: 'Comment ID',
            },
          },
          required: ['owner', 'repo', 'comment_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.issues.deleteComment({
          owner: args.owner as string,
          repo: args.repo as string,
          comment_id: args.comment_id as number,
        });
        return successResult({ success: true, message: 'Comment deleted' });
      },
    },

    // list_labels - List labels for a repository
    {
      definition: {
        name: 'github_issues_list_labels',
        description: 'List labels for a repository',
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
        const { data } = await octokit.issues.listLabelsForRepo({
          owner: args.owner as string,
          repo: args.repo as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // add_labels - Add labels to an issue
    {
      definition: {
        name: 'github_issues_add_labels',
        description: 'Add labels to an issue',
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
            issue_number: {
              type: 'number',
              description: 'Issue number',
            },
            labels: {
              type: 'array',
              items: { type: 'string' },
              description: 'Labels to add',
            },
          },
          required: ['owner', 'repo', 'issue_number', 'labels'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.issues.addLabels({
          owner: args.owner as string,
          repo: args.repo as string,
          issue_number: args.issue_number as number,
          labels: args.labels as string[],
        });
        return successResult(data);
      },
    },

    // set_labels - Set labels for an issue (replaces all)
    {
      definition: {
        name: 'github_issues_set_labels',
        description: 'Set labels for an issue (replaces all existing labels)',
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
            issue_number: {
              type: 'number',
              description: 'Issue number',
            },
            labels: {
              type: 'array',
              items: { type: 'string' },
              description: 'Labels to set',
            },
          },
          required: ['owner', 'repo', 'issue_number', 'labels'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.issues.setLabels({
          owner: args.owner as string,
          repo: args.repo as string,
          issue_number: args.issue_number as number,
          labels: args.labels as string[],
        });
        return successResult(data);
      },
    },

    // remove_label - Remove a label from an issue
    {
      definition: {
        name: 'github_issues_remove_label',
        description: 'Remove a label from an issue',
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
            issue_number: {
              type: 'number',
              description: 'Issue number',
            },
            name: {
              type: 'string',
              description: 'Label name to remove',
            },
          },
          required: ['owner', 'repo', 'issue_number', 'name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.issues.removeLabel({
          owner: args.owner as string,
          repo: args.repo as string,
          issue_number: args.issue_number as number,
          name: args.name as string,
        });
        return successResult(data);
      },
    },

    // list_assignees - List available assignees
    {
      definition: {
        name: 'github_issues_list_assignees',
        description: 'List users who can be assigned to issues',
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
        const { data } = await octokit.issues.listAssignees({
          owner: args.owner as string,
          repo: args.repo as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },
  ],
};
