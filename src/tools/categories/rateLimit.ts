import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const rateLimitCategory: ToolCategory = {
  name: 'rateLimit',
  description: 'GitHub rate limit tools',
  tools: [
    // get - Get rate limit status for the authenticated user
    {
      definition: {
        name: 'github_rateLimit_get',
        description: 'Get the rate limit status for the authenticated user. Returns current rate limit state including limits, remaining calls, and reset times for core, search, graphql, and other API categories.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      handler: async (octokit) => {
        const { data } = await octokit.rateLimit.get();
        return successResult(data);
      },
    },
  ],
};
