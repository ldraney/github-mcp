import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const codespacesCategory: ToolCategory = {
  name: 'codespaces',
  description: 'GitHub Codespaces tools',
  tools: [
    // list_for_authenticated_user - List codespaces for authenticated user
    {
      definition: {
        name: 'github_codespaces_list_for_authenticated_user',
        description: 'List codespaces for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
            repository_id: {
              type: 'number',
              description: 'Filter by repository ID',
            },
          },
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.codespaces.listForAuthenticatedUser({
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
          repository_id: args.repository_id as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_in_repository_for_authenticated_user - List codespaces in a repository
    {
      definition: {
        name: 'github_codespaces_list_in_repository_for_authenticated_user',
        description: 'List codespaces in a repository for the authenticated user',
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
        const { data } = await octokit.codespaces.listInRepositoryForAuthenticatedUser({
          owner: args.owner as string,
          repo: args.repo as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_for_authenticated_user - Get a codespace
    {
      definition: {
        name: 'github_codespaces_get_for_authenticated_user',
        description: 'Get a codespace by name for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            codespace_name: {
              type: 'string',
              description: 'The name of the codespace',
            },
          },
          required: ['codespace_name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.codespaces.getForAuthenticatedUser({
          codespace_name: args.codespace_name as string,
        });
        return successResult(data);
      },
    },

    // create_for_authenticated_user - Create a codespace
    {
      definition: {
        name: 'github_codespaces_create_for_authenticated_user',
        description: 'Create a codespace for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            repository_id: {
              type: 'number',
              description: 'Repository ID to create the codespace for',
            },
            ref: {
              type: 'string',
              description: 'Git ref (branch or commit) to create the codespace from',
            },
            location: {
              type: 'string',
              description: 'The geographic area for the codespace (e.g., EastUs, WestUs2)',
            },
            machine: {
              type: 'string',
              description: 'Machine type to use for the codespace',
            },
            devcontainer_path: {
              type: 'string',
              description: 'Path to the devcontainer.json file to use',
            },
            working_directory: {
              type: 'string',
              description: 'Working directory for the codespace',
            },
            idle_timeout_minutes: {
              type: 'number',
              description: 'Time in minutes before the codespace is stopped after being idle',
            },
            display_name: {
              type: 'string',
              description: 'Display name for the codespace',
            },
            retention_period_minutes: {
              type: 'number',
              description: 'Duration in minutes after codespace stops before automatic deletion',
            },
          },
          required: ['repository_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.codespaces.createForAuthenticatedUser({
          repository_id: args.repository_id as number,
          ref: args.ref as string | undefined,
          location: args.location as string | undefined,
          machine: args.machine as string | undefined,
          devcontainer_path: args.devcontainer_path as string | undefined,
          working_directory: args.working_directory as string | undefined,
          idle_timeout_minutes: args.idle_timeout_minutes as number | undefined,
          display_name: args.display_name as string | undefined,
          retention_period_minutes: args.retention_period_minutes as number | undefined,
        });
        return successResult(data);
      },
    },

    // start_for_authenticated_user - Start a codespace
    {
      definition: {
        name: 'github_codespaces_start_for_authenticated_user',
        description: 'Start a codespace for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            codespace_name: {
              type: 'string',
              description: 'The name of the codespace',
            },
          },
          required: ['codespace_name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.codespaces.startForAuthenticatedUser({
          codespace_name: args.codespace_name as string,
        });
        return successResult(data);
      },
    },

    // stop_for_authenticated_user - Stop a codespace
    {
      definition: {
        name: 'github_codespaces_stop_for_authenticated_user',
        description: 'Stop a codespace for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            codespace_name: {
              type: 'string',
              description: 'The name of the codespace',
            },
          },
          required: ['codespace_name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.codespaces.stopForAuthenticatedUser({
          codespace_name: args.codespace_name as string,
        });
        return successResult(data);
      },
    },

    // delete_for_authenticated_user - Delete a codespace
    {
      definition: {
        name: 'github_codespaces_delete_for_authenticated_user',
        description: 'Delete a codespace for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            codespace_name: {
              type: 'string',
              description: 'The name of the codespace',
            },
          },
          required: ['codespace_name'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.codespaces.deleteForAuthenticatedUser({
          codespace_name: args.codespace_name as string,
        });
        return successResult({ success: true, message: 'Codespace deleted' });
      },
    },

    // list_secrets_for_authenticated_user - List codespace secrets
    {
      definition: {
        name: 'github_codespaces_list_secrets_for_authenticated_user',
        description: 'List secrets for the authenticated user for codespaces',
        inputSchema: {
          type: 'object',
          properties: {
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
        const { data } = await octokit.codespaces.listSecretsForAuthenticatedUser({
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },
  ],
};
