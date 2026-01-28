import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const pullsCategory: ToolCategory = {
  name: 'pulls',
  description: 'Pull request management tools',
  tools: [
    // list - List pull requests
    {
      definition: {
        name: 'github_pulls_list',
        description: 'List pull requests for a repository',
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
              description: 'PR state filter',
            },
            head: {
              type: 'string',
              description: 'Filter by head user/branch (user:ref-name)',
            },
            base: {
              type: 'string',
              description: 'Filter by base branch',
            },
            sort: {
              type: 'string',
              enum: ['created', 'updated', 'popularity', 'long-running'],
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
        const { data } = await octokit.pulls.list({
          owner: args.owner as string,
          repo: args.repo as string,
          state: args.state as 'open' | 'closed' | 'all' | undefined,
          head: args.head as string | undefined,
          base: args.base as string | undefined,
          sort: args.sort as 'created' | 'updated' | 'popularity' | 'long-running' | undefined,
          direction: args.direction as 'asc' | 'desc' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get - Get a pull request
    {
      definition: {
        name: 'github_pulls_get',
        description: 'Get a pull request by number',
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
            pull_number: {
              type: 'number',
              description: 'Pull request number',
            },
          },
          required: ['owner', 'repo', 'pull_number'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.pulls.get({
          owner: args.owner as string,
          repo: args.repo as string,
          pull_number: args.pull_number as number,
        });
        return successResult(data);
      },
    },

    // create - Create a pull request
    {
      definition: {
        name: 'github_pulls_create',
        description: 'Create a new pull request',
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
              description: 'PR title',
            },
            head: {
              type: 'string',
              description: 'Branch containing changes (or user:branch for cross-repo)',
            },
            base: {
              type: 'string',
              description: 'Branch to merge into',
            },
            body: {
              type: 'string',
              description: 'PR description',
            },
            draft: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Create as draft PR',
            },
            maintainer_can_modify: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Allow maintainer edits',
            },
          },
          required: ['owner', 'repo', 'title', 'head', 'base'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.pulls.create({
          owner: args.owner as string,
          repo: args.repo as string,
          title: args.title as string,
          head: args.head as string,
          base: args.base as string,
          body: args.body as string | undefined,
          draft: args.draft === 'true',
          maintainer_can_modify: args.maintainer_can_modify === 'true',
        });
        return successResult(data);
      },
    },

    // update - Update a pull request
    {
      definition: {
        name: 'github_pulls_update',
        description: 'Update a pull request',
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
            pull_number: {
              type: 'number',
              description: 'Pull request number',
            },
            title: {
              type: 'string',
              description: 'PR title',
            },
            body: {
              type: 'string',
              description: 'PR description',
            },
            state: {
              type: 'string',
              enum: ['open', 'closed'],
              description: 'PR state',
            },
            base: {
              type: 'string',
              description: 'Base branch to change to',
            },
            maintainer_can_modify: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Allow maintainer edits',
            },
          },
          required: ['owner', 'repo', 'pull_number'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.pulls.update({
          owner: args.owner as string,
          repo: args.repo as string,
          pull_number: args.pull_number as number,
          title: args.title as string | undefined,
          body: args.body as string | undefined,
          state: args.state as 'open' | 'closed' | undefined,
          base: args.base as string | undefined,
          maintainer_can_modify: args.maintainer_can_modify !== undefined
            ? args.maintainer_can_modify === 'true'
            : undefined,
        });
        return successResult(data);
      },
    },

    // merge - Merge a pull request
    {
      definition: {
        name: 'github_pulls_merge',
        description: 'Merge a pull request',
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
            pull_number: {
              type: 'number',
              description: 'Pull request number',
            },
            commit_title: {
              type: 'string',
              description: 'Title for the merge commit',
            },
            commit_message: {
              type: 'string',
              description: 'Message for the merge commit',
            },
            merge_method: {
              type: 'string',
              enum: ['merge', 'squash', 'rebase'],
              description: 'Merge method to use',
            },
            sha: {
              type: 'string',
              description: 'SHA that head must match to merge',
            },
          },
          required: ['owner', 'repo', 'pull_number'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.pulls.merge({
          owner: args.owner as string,
          repo: args.repo as string,
          pull_number: args.pull_number as number,
          commit_title: args.commit_title as string | undefined,
          commit_message: args.commit_message as string | undefined,
          merge_method: args.merge_method as 'merge' | 'squash' | 'rebase' | undefined,
          sha: args.sha as string | undefined,
        });
        return successResult(data);
      },
    },

    // list_commits - List commits on a pull request
    {
      definition: {
        name: 'github_pulls_list_commits',
        description: 'List commits on a pull request',
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
            pull_number: {
              type: 'number',
              description: 'Pull request number',
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
          required: ['owner', 'repo', 'pull_number'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.pulls.listCommits({
          owner: args.owner as string,
          repo: args.repo as string,
          pull_number: args.pull_number as number,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_files - List files changed in a pull request
    {
      definition: {
        name: 'github_pulls_list_files',
        description: 'List files changed in a pull request',
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
            pull_number: {
              type: 'number',
              description: 'Pull request number',
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
          required: ['owner', 'repo', 'pull_number'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.pulls.listFiles({
          owner: args.owner as string,
          repo: args.repo as string,
          pull_number: args.pull_number as number,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // check_merged - Check if a pull request has been merged
    {
      definition: {
        name: 'github_pulls_check_merged',
        description: 'Check if a pull request has been merged',
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
            pull_number: {
              type: 'number',
              description: 'Pull request number',
            },
          },
          required: ['owner', 'repo', 'pull_number'],
        },
      },
      handler: async (octokit, args) => {
        try {
          await octokit.pulls.checkIfMerged({
            owner: args.owner as string,
            repo: args.repo as string,
            pull_number: args.pull_number as number,
          });
          return successResult({ merged: true });
        } catch (error) {
          // 404 means not merged
          if ((error as { status?: number }).status === 404) {
            return successResult({ merged: false });
          }
          throw error;
        }
      },
    },

    // list_reviews - List reviews on a pull request
    {
      definition: {
        name: 'github_pulls_list_reviews',
        description: 'List reviews on a pull request',
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
            pull_number: {
              type: 'number',
              description: 'Pull request number',
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
          required: ['owner', 'repo', 'pull_number'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.pulls.listReviews({
          owner: args.owner as string,
          repo: args.repo as string,
          pull_number: args.pull_number as number,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_review - Get a review
    {
      definition: {
        name: 'github_pulls_get_review',
        description: 'Get a review by ID',
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
            pull_number: {
              type: 'number',
              description: 'Pull request number',
            },
            review_id: {
              type: 'number',
              description: 'Review ID',
            },
          },
          required: ['owner', 'repo', 'pull_number', 'review_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.pulls.getReview({
          owner: args.owner as string,
          repo: args.repo as string,
          pull_number: args.pull_number as number,
          review_id: args.review_id as number,
        });
        return successResult(data);
      },
    },

    // create_review - Create a review
    {
      definition: {
        name: 'github_pulls_create_review',
        description: 'Create a review on a pull request',
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
            pull_number: {
              type: 'number',
              description: 'Pull request number',
            },
            commit_id: {
              type: 'string',
              description: 'SHA of commit to review',
            },
            body: {
              type: 'string',
              description: 'Review body text',
            },
            event: {
              type: 'string',
              enum: ['APPROVE', 'REQUEST_CHANGES', 'COMMENT'],
              description: 'Review action',
            },
          },
          required: ['owner', 'repo', 'pull_number'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.pulls.createReview({
          owner: args.owner as string,
          repo: args.repo as string,
          pull_number: args.pull_number as number,
          commit_id: args.commit_id as string | undefined,
          body: args.body as string | undefined,
          event: args.event as 'APPROVE' | 'REQUEST_CHANGES' | 'COMMENT' | undefined,
        });
        return successResult(data);
      },
    },

    // submit_review - Submit a pending review
    {
      definition: {
        name: 'github_pulls_submit_review',
        description: 'Submit a pending review',
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
            pull_number: {
              type: 'number',
              description: 'Pull request number',
            },
            review_id: {
              type: 'number',
              description: 'Review ID',
            },
            body: {
              type: 'string',
              description: 'Review body text',
            },
            event: {
              type: 'string',
              enum: ['APPROVE', 'REQUEST_CHANGES', 'COMMENT'],
              description: 'Review action',
            },
          },
          required: ['owner', 'repo', 'pull_number', 'review_id', 'event'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.pulls.submitReview({
          owner: args.owner as string,
          repo: args.repo as string,
          pull_number: args.pull_number as number,
          review_id: args.review_id as number,
          body: args.body as string | undefined,
          event: args.event as 'APPROVE' | 'REQUEST_CHANGES' | 'COMMENT',
        });
        return successResult(data);
      },
    },

    // list_review_comments - List review comments on a pull request
    {
      definition: {
        name: 'github_pulls_list_review_comments',
        description: 'List review comments on a pull request',
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
            pull_number: {
              type: 'number',
              description: 'Pull request number',
            },
            sort: {
              type: 'string',
              enum: ['created', 'updated'],
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
          required: ['owner', 'repo', 'pull_number'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.pulls.listReviewComments({
          owner: args.owner as string,
          repo: args.repo as string,
          pull_number: args.pull_number as number,
          sort: args.sort as 'created' | 'updated' | undefined,
          direction: args.direction as 'asc' | 'desc' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // create_review_comment - Create a review comment
    {
      definition: {
        name: 'github_pulls_create_review_comment',
        description: 'Create a review comment on a pull request',
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
            pull_number: {
              type: 'number',
              description: 'Pull request number',
            },
            body: {
              type: 'string',
              description: 'Comment body',
            },
            commit_id: {
              type: 'string',
              description: 'SHA of the commit to comment on',
            },
            path: {
              type: 'string',
              description: 'Relative path of the file to comment on',
            },
            line: {
              type: 'number',
              description: 'Line number in the file to comment on',
            },
            side: {
              type: 'string',
              enum: ['LEFT', 'RIGHT'],
              description: 'Side of the diff to comment on',
            },
            in_reply_to: {
              type: 'number',
              description: 'Comment ID to reply to',
            },
          },
          required: ['owner', 'repo', 'pull_number', 'body', 'commit_id', 'path'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.pulls.createReviewComment({
          owner: args.owner as string,
          repo: args.repo as string,
          pull_number: args.pull_number as number,
          body: args.body as string,
          commit_id: args.commit_id as string,
          path: args.path as string,
          line: args.line as number | undefined,
          side: args.side as 'LEFT' | 'RIGHT' | undefined,
          in_reply_to: args.in_reply_to as number | undefined,
        });
        return successResult(data);
      },
    },

    // request_reviewers - Request reviewers
    {
      definition: {
        name: 'github_pulls_request_reviewers',
        description: 'Request reviewers for a pull request',
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
            pull_number: {
              type: 'number',
              description: 'Pull request number',
            },
            reviewers: {
              type: 'array',
              items: { type: 'string' },
              description: 'Usernames to request review from',
            },
            team_reviewers: {
              type: 'array',
              items: { type: 'string' },
              description: 'Team slugs to request review from',
            },
          },
          required: ['owner', 'repo', 'pull_number'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.pulls.requestReviewers({
          owner: args.owner as string,
          repo: args.repo as string,
          pull_number: args.pull_number as number,
          reviewers: args.reviewers as string[] | undefined,
          team_reviewers: args.team_reviewers as string[] | undefined,
        });
        return successResult(data);
      },
    },
  ],
};
