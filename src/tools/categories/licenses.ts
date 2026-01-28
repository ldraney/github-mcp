import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const licensesCategory: ToolCategory = {
  name: 'licenses',
  description: 'GitHub licenses tools',
  tools: [
    // get_all_commonly_used - List commonly used licenses
    {
      definition: {
        name: 'github_licenses_get_all_commonly_used',
        description: 'List commonly used open source licenses',
        inputSchema: {
          type: 'object',
          properties: {
            featured: {
              type: 'boolean',
              description: 'Whether to only return featured licenses (popular ones like MIT, Apache, GPL)',
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
        const { data } = await octokit.licenses.getAllCommonlyUsed({
          featured: args.featured as boolean | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get - Get a license by key
    {
      definition: {
        name: 'github_licenses_get',
        description: 'Get a license by its SPDX key (e.g., "mit", "apache-2.0", "gpl-3.0")',
        inputSchema: {
          type: 'object',
          properties: {
            license: {
              type: 'string',
              description: 'The license SPDX identifier (e.g., "mit", "apache-2.0", "gpl-3.0")',
            },
          },
          required: ['license'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.licenses.get({
          license: args.license as string,
        });
        return successResult(data);
      },
    },

    // get_for_repo - Get license info for a repository
    {
      definition: {
        name: 'github_licenses_get_for_repo',
        description: 'Get the license for a repository',
        inputSchema: {
          type: 'object',
          properties: {
            owner: {
              type: 'string',
              description: 'The account owner of the repository',
            },
            repo: {
              type: 'string',
              description: 'The name of the repository',
            },
            ref: {
              type: 'string',
              description: 'The Git reference (branch, tag, or commit SHA) to get the license from. Defaults to the default branch.',
            },
          },
          required: ['owner', 'repo'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.licenses.getForRepo({
          owner: args.owner as string,
          repo: args.repo as string,
          ref: args.ref as string | undefined,
        });
        return successResult(data);
      },
    },
  ],
};
