import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const gitignoreCategory: ToolCategory = {
  name: 'gitignore',
  description: 'GitHub gitignore templates tools',
  tools: [
    // get_all_templates - List all gitignore templates
    {
      definition: {
        name: 'github_gitignore_get_all_templates',
        description: 'List all available gitignore templates',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      handler: async (octokit) => {
        const { data } = await octokit.gitignore.getAllTemplates();
        return successResult(data);
      },
    },

    // get_template - Get a specific gitignore template
    {
      definition: {
        name: 'github_gitignore_get_template',
        description: 'Get a specific gitignore template by name',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the gitignore template (e.g., "Node", "Python", "Java")',
            },
          },
          required: ['name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.gitignore.getTemplate({
          name: args.name as string,
        });
        return successResult(data);
      },
    },
  ],
};
