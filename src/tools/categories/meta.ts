import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const metaCategory: ToolCategory = {
  name: 'meta',
  description: 'GitHub API metadata tools',
  tools: [
    // get - Get GitHub API meta information
    {
      definition: {
        name: 'github_meta_get',
        description: 'Get GitHub API meta information including IP ranges, SSH keys, and more',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      handler: async (octokit) => {
        const { data } = await octokit.meta.get();
        return successResult(data);
      },
    },

    // get_octocat - Get the octocat ASCII art
    {
      definition: {
        name: 'github_meta_get_octocat',
        description: 'Get the octocat ASCII art with an optional custom message',
        inputSchema: {
          type: 'object',
          properties: {
            s: {
              type: 'string',
              description: 'Custom text to include in the octocat speech bubble',
            },
          },
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.meta.getOctocat({
          s: args.s as string | undefined,
        });
        return successResult(data);
      },
    },

    // get_zen - Get a random GitHub zen quote
    {
      definition: {
        name: 'github_meta_get_zen',
        description: 'Get a random GitHub zen quote',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      handler: async (octokit) => {
        const { data } = await octokit.meta.getZen();
        return successResult(data);
      },
    },

    // get_all_versions - List all API versions
    {
      definition: {
        name: 'github_meta_get_all_versions',
        description: 'List all available GitHub API versions',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      handler: async (octokit) => {
        const { data } = await octokit.meta.getAllVersions();
        return successResult(data);
      },
    },
  ],
};
