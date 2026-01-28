import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const appsCategory: ToolCategory = {
  name: 'apps',
  description: 'GitHub Apps tools',
  tools: [
    // get_authenticated - Get the authenticated app
    {
      definition: {
        name: 'github_apps_get_authenticated',
        description: 'Get the authenticated GitHub App',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      handler: async (octokit) => {
        const { data } = await octokit.apps.getAuthenticated();
        return successResult(data);
      },
    },

    // list_installations - List installations for the authenticated app
    {
      definition: {
        name: 'github_apps_list_installations',
        description: 'List installations for the authenticated GitHub App',
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
            since: {
              type: 'string',
              description: 'Only show installations updated after this time (ISO 8601 format)',
            },
            outdated: {
              type: 'string',
              description: 'Filter by whether the installation is outdated',
            },
          },
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.apps.listInstallations({
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
          since: args.since as string | undefined,
          outdated: args.outdated as string | undefined,
        });
        return successResult(data);
      },
    },

    // get_installation - Get an installation by ID
    {
      definition: {
        name: 'github_apps_get_installation',
        description: 'Get a specific installation of the authenticated GitHub App',
        inputSchema: {
          type: 'object',
          properties: {
            installation_id: {
              type: 'number',
              description: 'The unique identifier of the installation',
            },
          },
          required: ['installation_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.apps.getInstallation({
          installation_id: args.installation_id as number,
        });
        return successResult(data);
      },
    },

    // list_installation_repos_for_authenticated_user - List repositories accessible to the user for an installation
    {
      definition: {
        name: 'github_apps_list_installation_repos_for_authenticated_user',
        description: 'List repositories that the authenticated user has access to in an installation',
        inputSchema: {
          type: 'object',
          properties: {
            installation_id: {
              type: 'number',
              description: 'The unique identifier of the installation',
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
          required: ['installation_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.apps.listInstallationReposForAuthenticatedUser({
          installation_id: args.installation_id as number,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // create_installation_access_token - Create an installation access token
    {
      definition: {
        name: 'github_apps_create_installation_access_token',
        description: 'Create an installation access token for a GitHub App installation',
        inputSchema: {
          type: 'object',
          properties: {
            installation_id: {
              type: 'number',
              description: 'The unique identifier of the installation',
            },
            repositories: {
              type: 'array',
              items: { type: 'string' },
              description: 'List of repository names to scope the token to',
            },
            repository_ids: {
              type: 'array',
              items: { type: 'number' },
              description: 'List of repository IDs to scope the token to',
            },
          },
          required: ['installation_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.apps.createInstallationAccessToken({
          installation_id: args.installation_id as number,
          repositories: args.repositories as string[] | undefined,
          repository_ids: args.repository_ids as number[] | undefined,
        });
        return successResult(data);
      },
    },

    // get_user_installation - Get a user installation for the authenticated app
    {
      definition: {
        name: 'github_apps_get_user_installation',
        description: 'Get the installation for a specific user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'GitHub username',
            },
          },
          required: ['username'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.apps.getUserInstallation({
          username: args.username as string,
        });
        return successResult(data);
      },
    },

    // get_repo_installation - Get a repository installation for the authenticated app
    {
      definition: {
        name: 'github_apps_get_repo_installation',
        description: 'Get the installation for a specific repository',
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
          },
          required: ['owner', 'repo'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.apps.getRepoInstallation({
          owner: args.owner as string,
          repo: args.repo as string,
        });
        return successResult(data);
      },
    },

    // get_org_installation - Get an organization installation for the authenticated app
    {
      definition: {
        name: 'github_apps_get_org_installation',
        description: 'Get the installation for a specific organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
          },
          required: ['org'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.apps.getOrgInstallation({
          org: args.org as string,
        });
        return successResult(data);
      },
    },
  ],
};
