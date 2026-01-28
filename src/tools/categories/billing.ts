import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const billingCategory: ToolCategory = {
  name: 'billing',
  description: 'GitHub billing tools',
  tools: [
    // get_github_actions_billing_org - Get GitHub Actions billing for an organization
    {
      definition: {
        name: 'github_billing_get_github_actions_billing_org',
        description: 'Get the summary of the free and paid GitHub Actions minutes used for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'The organization name',
            },
          },
          required: ['org'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.billing.getGithubActionsBillingOrg({
          org: args.org as string,
        });
        return successResult(data);
      },
    },

    // get_github_actions_billing_user - Get GitHub Actions billing for a user
    {
      definition: {
        name: 'github_billing_get_github_actions_billing_user',
        description: 'Get the summary of the free and paid GitHub Actions minutes used for a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'The handle for the GitHub user account',
            },
          },
          required: ['username'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.billing.getGithubActionsBillingUser({
          username: args.username as string,
        });
        return successResult(data);
      },
    },

    // get_github_packages_billing_org - Get GitHub Packages billing for an organization
    {
      definition: {
        name: 'github_billing_get_github_packages_billing_org',
        description: 'Get the free and paid storage used for GitHub Packages in gigabytes for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'The organization name',
            },
          },
          required: ['org'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.billing.getGithubPackagesBillingOrg({
          org: args.org as string,
        });
        return successResult(data);
      },
    },

    // get_github_packages_billing_user - Get GitHub Packages billing for a user
    {
      definition: {
        name: 'github_billing_get_github_packages_billing_user',
        description: 'Get the free and paid storage used for GitHub Packages in gigabytes for a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'The handle for the GitHub user account',
            },
          },
          required: ['username'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.billing.getGithubPackagesBillingUser({
          username: args.username as string,
        });
        return successResult(data);
      },
    },

    // get_shared_storage_billing_org - Get shared storage billing for an organization
    {
      definition: {
        name: 'github_billing_get_shared_storage_billing_org',
        description: 'Get the estimated paid and estimated total storage used for GitHub Actions and GitHub Packages for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'The organization name',
            },
          },
          required: ['org'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.billing.getSharedStorageBillingOrg({
          org: args.org as string,
        });
        return successResult(data);
      },
    },

    // get_shared_storage_billing_user - Get shared storage billing for a user
    {
      definition: {
        name: 'github_billing_get_shared_storage_billing_user',
        description: 'Get the estimated paid and estimated total storage used for GitHub Actions and GitHub Packages for a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'The handle for the GitHub user account',
            },
          },
          required: ['username'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.billing.getSharedStorageBillingUser({
          username: args.username as string,
        });
        return successResult(data);
      },
    },
  ],
};
