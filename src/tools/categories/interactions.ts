import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const interactionsCategory: ToolCategory = {
  name: 'interactions',
  description: 'GitHub interaction limits tools',
  tools: [
    // get_restrictions_for_repo - Get interaction restrictions for a repository
    {
      definition: {
        name: 'github_interactions_get_restrictions_for_repo',
        description: 'Get interaction restrictions for a repository. Shows the interaction limit for the repository and when it expires.',
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
          },
          required: ['owner', 'repo'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.interactions.getRestrictionsForRepo({
          owner: args.owner as string,
          repo: args.repo as string,
        });
        return successResult(data);
      },
    },

    // set_restrictions_for_repo - Set interaction restrictions for a repository
    {
      definition: {
        name: 'github_interactions_set_restrictions_for_repo',
        description: 'Set interaction restrictions for a repository. Limits interactions (comments, opening issues, etc.) to a subset of users.',
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
            limit: {
              type: 'string',
              enum: ['existing_users', 'contributors_only', 'collaborators_only'],
              description: 'The group of users who can interact: existing_users (accounts older than 24 hours), contributors_only (users with prior commits), collaborators_only (users with push access)',
            },
            expiry: {
              type: 'string',
              enum: ['one_day', 'three_days', 'one_week', 'one_month', 'six_months'],
              description: 'Duration of the restriction',
            },
          },
          required: ['owner', 'repo', 'limit'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.interactions.setRestrictionsForRepo({
          owner: args.owner as string,
          repo: args.repo as string,
          limit: args.limit as 'existing_users' | 'contributors_only' | 'collaborators_only',
          expiry: args.expiry as 'one_day' | 'three_days' | 'one_week' | 'one_month' | 'six_months' | undefined,
        });
        return successResult(data);
      },
    },

    // remove_restrictions_for_repo - Remove interaction restrictions from a repository
    {
      definition: {
        name: 'github_interactions_remove_restrictions_for_repo',
        description: 'Remove interaction restrictions from a repository. Removes all interaction limits, allowing all users to interact.',
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
          },
          required: ['owner', 'repo'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.interactions.removeRestrictionsForRepo({
          owner: args.owner as string,
          repo: args.repo as string,
        });
        return successResult({ success: true, message: 'Interaction restrictions removed for repository' });
      },
    },

    // get_restrictions_for_org - Get interaction restrictions for an organization
    {
      definition: {
        name: 'github_interactions_get_restrictions_for_org',
        description: 'Get interaction restrictions for an organization. Shows the interaction limit for the organization and when it expires.',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
          },
          required: ['org'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.interactions.getRestrictionsForOrg({
          org: args.org as string,
        });
        return successResult(data);
      },
    },

    // set_restrictions_for_org - Set interaction restrictions for an organization
    {
      definition: {
        name: 'github_interactions_set_restrictions_for_org',
        description: 'Set interaction restrictions for an organization. Limits interactions for all public repositories in the organization.',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            limit: {
              type: 'string',
              enum: ['existing_users', 'contributors_only', 'collaborators_only'],
              description: 'The group of users who can interact: existing_users (accounts older than 24 hours), contributors_only (users with prior commits), collaborators_only (users with push access)',
            },
            expiry: {
              type: 'string',
              enum: ['one_day', 'three_days', 'one_week', 'one_month', 'six_months'],
              description: 'Duration of the restriction',
            },
          },
          required: ['org', 'limit'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.interactions.setRestrictionsForOrg({
          org: args.org as string,
          limit: args.limit as 'existing_users' | 'contributors_only' | 'collaborators_only',
          expiry: args.expiry as 'one_day' | 'three_days' | 'one_week' | 'one_month' | 'six_months' | undefined,
        });
        return successResult(data);
      },
    },

    // remove_restrictions_for_org - Remove interaction restrictions from an organization
    {
      definition: {
        name: 'github_interactions_remove_restrictions_for_org',
        description: 'Remove interaction restrictions from an organization. Removes all interaction limits for all public repositories in the organization.',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
          },
          required: ['org'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.interactions.removeRestrictionsForOrg({
          org: args.org as string,
        });
        return successResult({ success: true, message: 'Interaction restrictions removed for organization' });
      },
    },
  ],
};
