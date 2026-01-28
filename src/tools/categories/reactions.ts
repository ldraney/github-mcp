import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const reactionsCategory: ToolCategory = {
  name: 'reactions',
  description: 'GitHub reactions tools',
  tools: [
    // list_for_issue - List reactions for an issue
    {
      definition: {
        name: 'github_reactions_list_for_issue',
        description: 'List reactions for an issue',
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
            content: {
              type: 'string',
              enum: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray', 'rocket', 'eyes'],
              description: 'Filter by reaction type',
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
        const { data } = await octokit.reactions.listForIssue({
          owner: args.owner as string,
          repo: args.repo as string,
          issue_number: args.issue_number as number,
          content: args.content as '+1' | '-1' | 'laugh' | 'confused' | 'heart' | 'hooray' | 'rocket' | 'eyes' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_for_issue_comment - List reactions for an issue comment
    {
      definition: {
        name: 'github_reactions_list_for_issue_comment',
        description: 'List reactions for an issue comment',
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
            content: {
              type: 'string',
              enum: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray', 'rocket', 'eyes'],
              description: 'Filter by reaction type',
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
          required: ['owner', 'repo', 'comment_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.reactions.listForIssueComment({
          owner: args.owner as string,
          repo: args.repo as string,
          comment_id: args.comment_id as number,
          content: args.content as '+1' | '-1' | 'laugh' | 'confused' | 'heart' | 'hooray' | 'rocket' | 'eyes' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_for_pull_request_review_comment - List reactions for a pull request review comment
    {
      definition: {
        name: 'github_reactions_list_for_pull_request_review_comment',
        description: 'List reactions for a pull request review comment',
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
            content: {
              type: 'string',
              enum: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray', 'rocket', 'eyes'],
              description: 'Filter by reaction type',
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
          required: ['owner', 'repo', 'comment_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.reactions.listForPullRequestReviewComment({
          owner: args.owner as string,
          repo: args.repo as string,
          comment_id: args.comment_id as number,
          content: args.content as '+1' | '-1' | 'laugh' | 'confused' | 'heart' | 'hooray' | 'rocket' | 'eyes' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // create_for_issue - Create a reaction for an issue
    {
      definition: {
        name: 'github_reactions_create_for_issue',
        description: 'Create a reaction for an issue',
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
            content: {
              type: 'string',
              enum: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray', 'rocket', 'eyes'],
              description: 'Reaction type',
            },
          },
          required: ['owner', 'repo', 'issue_number', 'content'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.reactions.createForIssue({
          owner: args.owner as string,
          repo: args.repo as string,
          issue_number: args.issue_number as number,
          content: args.content as '+1' | '-1' | 'laugh' | 'confused' | 'heart' | 'hooray' | 'rocket' | 'eyes',
        });
        return successResult(data);
      },
    },

    // create_for_issue_comment - Create a reaction for an issue comment
    {
      definition: {
        name: 'github_reactions_create_for_issue_comment',
        description: 'Create a reaction for an issue comment',
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
            content: {
              type: 'string',
              enum: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray', 'rocket', 'eyes'],
              description: 'Reaction type',
            },
          },
          required: ['owner', 'repo', 'comment_id', 'content'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.reactions.createForIssueComment({
          owner: args.owner as string,
          repo: args.repo as string,
          comment_id: args.comment_id as number,
          content: args.content as '+1' | '-1' | 'laugh' | 'confused' | 'heart' | 'hooray' | 'rocket' | 'eyes',
        });
        return successResult(data);
      },
    },

    // create_for_pull_request_review_comment - Create a reaction for a pull request review comment
    {
      definition: {
        name: 'github_reactions_create_for_pull_request_review_comment',
        description: 'Create a reaction for a pull request review comment',
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
            content: {
              type: 'string',
              enum: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray', 'rocket', 'eyes'],
              description: 'Reaction type',
            },
          },
          required: ['owner', 'repo', 'comment_id', 'content'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.reactions.createForPullRequestReviewComment({
          owner: args.owner as string,
          repo: args.repo as string,
          comment_id: args.comment_id as number,
          content: args.content as '+1' | '-1' | 'laugh' | 'confused' | 'heart' | 'hooray' | 'rocket' | 'eyes',
        });
        return successResult(data);
      },
    },

    // delete_for_issue - Delete a reaction for an issue
    {
      definition: {
        name: 'github_reactions_delete_for_issue',
        description: 'Delete a reaction for an issue',
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
            reaction_id: {
              type: 'number',
              description: 'Reaction ID',
            },
          },
          required: ['owner', 'repo', 'issue_number', 'reaction_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.reactions.deleteForIssue({
          owner: args.owner as string,
          repo: args.repo as string,
          issue_number: args.issue_number as number,
          reaction_id: args.reaction_id as number,
        });
        return successResult({ success: true, message: 'Reaction deleted' });
      },
    },

    // delete_for_issue_comment - Delete a reaction for an issue comment
    {
      definition: {
        name: 'github_reactions_delete_for_issue_comment',
        description: 'Delete a reaction for an issue comment',
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
            reaction_id: {
              type: 'number',
              description: 'Reaction ID',
            },
          },
          required: ['owner', 'repo', 'comment_id', 'reaction_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.reactions.deleteForIssueComment({
          owner: args.owner as string,
          repo: args.repo as string,
          comment_id: args.comment_id as number,
          reaction_id: args.reaction_id as number,
        });
        return successResult({ success: true, message: 'Reaction deleted' });
      },
    },

    // delete_for_pull_request_review_comment - Delete a reaction for a pull request review comment
    {
      definition: {
        name: 'github_reactions_delete_for_pull_request_review_comment',
        description: 'Delete a reaction for a pull request review comment',
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
            reaction_id: {
              type: 'number',
              description: 'Reaction ID',
            },
          },
          required: ['owner', 'repo', 'comment_id', 'reaction_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.reactions.deleteForPullRequestComment({
          owner: args.owner as string,
          repo: args.repo as string,
          comment_id: args.comment_id as number,
          reaction_id: args.reaction_id as number,
        });
        return successResult({ success: true, message: 'Reaction deleted' });
      },
    },
  ],
};
