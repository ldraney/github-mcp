import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const emojisCategory: ToolCategory = {
  name: 'emojis',
  description: 'GitHub emojis tools',
  tools: [
    // get - List all available emojis
    {
      definition: {
        name: 'github_emojis_get',
        description: 'Get the list of all available GitHub emojis. Returns an object with emoji names as keys and their image URLs as values.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      handler: async (octokit) => {
        const { data } = await octokit.emojis.get();
        return successResult(data);
      },
    },
  ],
};
