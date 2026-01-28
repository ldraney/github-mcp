import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const projectsCategory: ToolCategory = {
  name: 'projects',
  description: 'GitHub projects tools',
  tools: [
    // list_for_repo - List projects for a repository
    {
      definition: {
        name: 'github_projects_list_for_repo',
        description: 'List projects for a repository',
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
              description: 'Filter by project state',
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
        const { data } = await octokit.projects.listForRepo({
          owner: args.owner as string,
          repo: args.repo as string,
          state: args.state as 'open' | 'closed' | 'all' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_for_org - List projects for an organization
    {
      definition: {
        name: 'github_projects_list_for_org',
        description: 'List projects for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            state: {
              type: 'string',
              enum: ['open', 'closed', 'all'],
              description: 'Filter by project state',
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
          required: ['org'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.projects.listForOrg({
          org: args.org as string,
          state: args.state as 'open' | 'closed' | 'all' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_for_user - List projects for a user
    {
      definition: {
        name: 'github_projects_list_for_user',
        description: 'List projects for a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'GitHub username',
            },
            state: {
              type: 'string',
              enum: ['open', 'closed', 'all'],
              description: 'Filter by project state',
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
          required: ['username'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.projects.listForUser({
          username: args.username as string,
          state: args.state as 'open' | 'closed' | 'all' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get - Get a project
    {
      definition: {
        name: 'github_projects_get',
        description: 'Get a project by ID',
        inputSchema: {
          type: 'object',
          properties: {
            project_id: {
              type: 'number',
              description: 'The unique identifier of the project',
            },
          },
          required: ['project_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.projects.get({
          project_id: args.project_id as number,
        });
        return successResult(data);
      },
    },

    // create - Create a repository project
    {
      definition: {
        name: 'github_projects_create_for_repo',
        description: 'Create a project for a repository',
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
            name: {
              type: 'string',
              description: 'Project name',
            },
            body: {
              type: 'string',
              description: 'Project description',
            },
          },
          required: ['owner', 'repo', 'name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.projects.createForRepo({
          owner: args.owner as string,
          repo: args.repo as string,
          name: args.name as string,
          body: args.body as string | undefined,
        });
        return successResult(data);
      },
    },

    // create_for_org - Create an organization project
    {
      definition: {
        name: 'github_projects_create_for_org',
        description: 'Create a project for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            name: {
              type: 'string',
              description: 'Project name',
            },
            body: {
              type: 'string',
              description: 'Project description',
            },
          },
          required: ['org', 'name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.projects.createForOrg({
          org: args.org as string,
          name: args.name as string,
          body: args.body as string | undefined,
        });
        return successResult(data);
      },
    },

    // create_for_authenticated_user - Create a user project
    {
      definition: {
        name: 'github_projects_create_for_user',
        description: 'Create a project for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Project name',
            },
            body: {
              type: 'string',
              description: 'Project description',
            },
          },
          required: ['name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.projects.createForAuthenticatedUser({
          name: args.name as string,
          body: args.body as string | undefined,
        });
        return successResult(data);
      },
    },

    // update - Update a project
    {
      definition: {
        name: 'github_projects_update',
        description: 'Update a project',
        inputSchema: {
          type: 'object',
          properties: {
            project_id: {
              type: 'number',
              description: 'The unique identifier of the project',
            },
            name: {
              type: 'string',
              description: 'Project name',
            },
            body: {
              type: 'string',
              description: 'Project description',
            },
            state: {
              type: 'string',
              enum: ['open', 'closed'],
              description: 'Project state',
            },
            organization_permission: {
              type: 'string',
              enum: ['read', 'write', 'admin', 'none'],
              description: 'Organization permission level',
            },
            private: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Whether the project is private',
            },
          },
          required: ['project_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.projects.update({
          project_id: args.project_id as number,
          name: args.name as string | undefined,
          body: args.body as string | undefined,
          state: args.state as 'open' | 'closed' | undefined,
          organization_permission: args.organization_permission as 'read' | 'write' | 'admin' | 'none' | undefined,
          private: args.private !== undefined ? args.private === 'true' : undefined,
        });
        return successResult(data);
      },
    },

    // delete - Delete a project
    {
      definition: {
        name: 'github_projects_delete',
        description: 'Delete a project',
        inputSchema: {
          type: 'object',
          properties: {
            project_id: {
              type: 'number',
              description: 'The unique identifier of the project',
            },
          },
          required: ['project_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.projects.delete({
          project_id: args.project_id as number,
        });
        return successResult({ success: true, message: 'Project deleted' });
      },
    },

    // list_columns - List project columns
    {
      definition: {
        name: 'github_projects_list_columns',
        description: 'List columns in a project',
        inputSchema: {
          type: 'object',
          properties: {
            project_id: {
              type: 'number',
              description: 'The unique identifier of the project',
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
          required: ['project_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.projects.listColumns({
          project_id: args.project_id as number,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_column - Get a project column
    {
      definition: {
        name: 'github_projects_get_column',
        description: 'Get a project column by ID',
        inputSchema: {
          type: 'object',
          properties: {
            column_id: {
              type: 'number',
              description: 'The unique identifier of the column',
            },
          },
          required: ['column_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.projects.getColumn({
          column_id: args.column_id as number,
        });
        return successResult(data);
      },
    },

    // create_column - Create a project column
    {
      definition: {
        name: 'github_projects_create_column',
        description: 'Create a column in a project',
        inputSchema: {
          type: 'object',
          properties: {
            project_id: {
              type: 'number',
              description: 'The unique identifier of the project',
            },
            name: {
              type: 'string',
              description: 'Column name',
            },
          },
          required: ['project_id', 'name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.projects.createColumn({
          project_id: args.project_id as number,
          name: args.name as string,
        });
        return successResult(data);
      },
    },

    // update_column - Update a project column
    {
      definition: {
        name: 'github_projects_update_column',
        description: 'Update a project column',
        inputSchema: {
          type: 'object',
          properties: {
            column_id: {
              type: 'number',
              description: 'The unique identifier of the column',
            },
            name: {
              type: 'string',
              description: 'Column name',
            },
          },
          required: ['column_id', 'name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.projects.updateColumn({
          column_id: args.column_id as number,
          name: args.name as string,
        });
        return successResult(data);
      },
    },

    // delete_column - Delete a project column
    {
      definition: {
        name: 'github_projects_delete_column',
        description: 'Delete a project column',
        inputSchema: {
          type: 'object',
          properties: {
            column_id: {
              type: 'number',
              description: 'The unique identifier of the column',
            },
          },
          required: ['column_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.projects.deleteColumn({
          column_id: args.column_id as number,
        });
        return successResult({ success: true, message: 'Column deleted' });
      },
    },

    // list_cards - List project cards in a column
    {
      definition: {
        name: 'github_projects_list_cards',
        description: 'List cards in a project column',
        inputSchema: {
          type: 'object',
          properties: {
            column_id: {
              type: 'number',
              description: 'The unique identifier of the column',
            },
            archived_state: {
              type: 'string',
              enum: ['all', 'archived', 'not_archived'],
              description: 'Filter by archived state',
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
          required: ['column_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.projects.listCards({
          column_id: args.column_id as number,
          archived_state: args.archived_state as 'all' | 'archived' | 'not_archived' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_card - Get a project card
    {
      definition: {
        name: 'github_projects_get_card',
        description: 'Get a project card by ID',
        inputSchema: {
          type: 'object',
          properties: {
            card_id: {
              type: 'number',
              description: 'The unique identifier of the card',
            },
          },
          required: ['card_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.projects.getCard({
          card_id: args.card_id as number,
        });
        return successResult(data);
      },
    },

    // create_card - Create a project card
    {
      definition: {
        name: 'github_projects_create_card',
        description: 'Create a card in a project column. Either provide note for a note card, or content_id and content_type for an issue/PR card.',
        inputSchema: {
          type: 'object',
          properties: {
            column_id: {
              type: 'number',
              description: 'The unique identifier of the column',
            },
            note: {
              type: 'string',
              description: 'Note content for the card (for note cards)',
            },
            content_id: {
              type: 'number',
              description: 'Issue or pull request ID (for issue/PR cards)',
            },
            content_type: {
              type: 'string',
              enum: ['Issue', 'PullRequest'],
              description: 'Content type (for issue/PR cards)',
            },
          },
          required: ['column_id'],
        },
      },
      handler: async (octokit, args) => {
        let data;
        if (args.note !== undefined) {
          const result = await octokit.projects.createCard({
            column_id: args.column_id as number,
            note: args.note as string,
          });
          data = result.data;
        } else if (args.content_id !== undefined && args.content_type !== undefined) {
          const result = await octokit.projects.createCard({
            column_id: args.column_id as number,
            content_id: args.content_id as number,
            content_type: args.content_type as 'Issue' | 'PullRequest',
          });
          data = result.data;
        } else {
          throw new Error('Either note or content_id+content_type must be provided');
        }
        return successResult(data);
      },
    },

    // update_card - Update a project card
    {
      definition: {
        name: 'github_projects_update_card',
        description: 'Update a project card',
        inputSchema: {
          type: 'object',
          properties: {
            card_id: {
              type: 'number',
              description: 'The unique identifier of the card',
            },
            note: {
              type: 'string',
              description: 'Note content for the card',
            },
            archived: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Whether the card is archived',
            },
          },
          required: ['card_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.projects.updateCard({
          card_id: args.card_id as number,
          note: args.note as string | undefined,
          archived: args.archived !== undefined ? args.archived === 'true' : undefined,
        });
        return successResult(data);
      },
    },

    // delete_card - Delete a project card
    {
      definition: {
        name: 'github_projects_delete_card',
        description: 'Delete a project card',
        inputSchema: {
          type: 'object',
          properties: {
            card_id: {
              type: 'number',
              description: 'The unique identifier of the card',
            },
          },
          required: ['card_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.projects.deleteCard({
          card_id: args.card_id as number,
        });
        return successResult({ success: true, message: 'Card deleted' });
      },
    },

    // move_card - Move a project card
    {
      definition: {
        name: 'github_projects_move_card',
        description: 'Move a project card to a different position or column',
        inputSchema: {
          type: 'object',
          properties: {
            card_id: {
              type: 'number',
              description: 'The unique identifier of the card',
            },
            position: {
              type: 'string',
              description: 'Position to move the card (e.g., "top", "bottom", or "after:<card_id>")',
            },
            column_id: {
              type: 'number',
              description: 'Column ID to move the card to (optional, for moving between columns)',
            },
          },
          required: ['card_id', 'position'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.projects.moveCard({
          card_id: args.card_id as number,
          position: args.position as string,
          column_id: args.column_id as number | undefined,
        });
        return successResult(data || { success: true, message: 'Card moved' });
      },
    },

    // move_column - Move a project column
    {
      definition: {
        name: 'github_projects_move_column',
        description: 'Move a project column to a different position',
        inputSchema: {
          type: 'object',
          properties: {
            column_id: {
              type: 'number',
              description: 'The unique identifier of the column',
            },
            position: {
              type: 'string',
              description: 'Position to move the column (e.g., "first", "last", or "after:<column_id>")',
            },
          },
          required: ['column_id', 'position'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.projects.moveColumn({
          column_id: args.column_id as number,
          position: args.position as string,
        });
        return successResult(data || { success: true, message: 'Column moved' });
      },
    },
  ],
};
