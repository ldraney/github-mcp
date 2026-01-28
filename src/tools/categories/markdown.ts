import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const markdownCategory: ToolCategory = {
  name: 'markdown',
  description: 'GitHub markdown tools',
  tools: [
    // render - Render markdown
    {
      definition: {
        name: 'github_markdown_render',
        description: 'Render a markdown document. Use mode "gfm" for GitHub Flavored Markdown with repository context.',
        inputSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The markdown text to render',
            },
            mode: {
              type: 'string',
              enum: ['markdown', 'gfm'],
              description: 'The rendering mode. "markdown" for plain markdown, "gfm" for GitHub Flavored Markdown',
            },
            context: {
              type: 'string',
              description: 'The repository context (owner/repo) for gfm mode. Required when mode is "gfm".',
            },
          },
          required: ['text'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.markdown.render({
          text: args.text as string,
          mode: args.mode as 'markdown' | 'gfm' | undefined,
          context: args.context as string | undefined,
        });
        return successResult({ html: data });
      },
    },

    // render_raw - Render raw markdown
    {
      definition: {
        name: 'github_markdown_render_raw',
        description: 'Render raw markdown text. This endpoint renders plain markdown without GitHub-specific features.',
        inputSchema: {
          type: 'object',
          properties: {
            data: {
              type: 'string',
              description: 'The raw markdown text to render',
            },
          },
          required: ['data'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.markdown.renderRaw({
          data: args.data as string,
        });
        return successResult({ html: data });
      },
    },
  ],
};
