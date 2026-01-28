import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const codesOfConductCategory: ToolCategory = {
  name: 'codesOfConduct',
  description: 'GitHub codes of conduct tools',
  tools: [
    // getAllCodesOfConduct - List all codes of conduct
    {
      definition: {
        name: 'github_codesOfConduct_get_all_codes_of_conduct',
        description: 'List all codes of conduct available on GitHub',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      handler: async (octokit) => {
        const { data } = await octokit.codesOfConduct.getAllCodesOfConduct();
        return successResult(data);
      },
    },

    // getConductCode - Get a specific code of conduct
    {
      definition: {
        name: 'github_codesOfConduct_get_conduct_code',
        description: 'Get a specific code of conduct by its key',
        inputSchema: {
          type: 'object',
          properties: {
            key: {
              type: 'string',
              description: 'The key of the code of conduct (e.g., "contributor_covenant", "citizen_code_of_conduct")',
            },
          },
          required: ['key'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.codesOfConduct.getConductCode({
          key: args.key as string,
        });
        return successResult(data);
      },
    },
  ],
};
