import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const migrationsCategory: ToolCategory = {
  name: 'migrations',
  description: 'GitHub migrations tools',
  tools: [
    // list_for_org - List organization migrations
    {
      definition: {
        name: 'github_migrations_list_for_org',
        description: 'List the most recent migrations for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
            exclude: {
              type: 'string',
              description: 'Exclude attributes from the API response (comma-separated: repositories)',
            },
          },
          required: ['org'],
        },
      },
      handler: async (octokit, args) => {
        const exclude = args.exclude
          ? (args.exclude as string).split(',').map((s) => s.trim()) as ('repositories')[]
          : undefined;
        const { data } = await octokit.migrations.listForOrg({
          org: args.org as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
          exclude,
        });
        return successResult(data);
      },
    },

    // start_for_org - Start an organization migration
    {
      definition: {
        name: 'github_migrations_start_for_org',
        description: 'Start a migration for an organization. Initiates the generation of a migration archive.',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            repositories: {
              type: 'string',
              description: 'Comma-separated list of repository names to include in the migration',
            },
            lock_repositories: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Lock the repositories being migrated at the start of the migration',
            },
            exclude_metadata: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Exclude metadata from the migration (excludes releases only)',
            },
            exclude_git_data: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Exclude git data from the migration',
            },
            exclude_attachments: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Exclude attachments from the migration',
            },
            exclude_releases: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Exclude releases from the migration',
            },
            exclude_owner_projects: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Exclude organization-owned projects from the migration',
            },
            org_metadata_only: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Only export organization metadata (no repository data)',
            },
            exclude: {
              type: 'string',
              description: 'Exclude attributes from the API response (comma-separated: repositories)',
            },
          },
          required: ['org', 'repositories'],
        },
      },
      handler: async (octokit, args) => {
        const repositories = (args.repositories as string).split(',').map((s) => s.trim());
        const exclude = args.exclude
          ? (args.exclude as string).split(',').map((s) => s.trim()) as ('repositories')[]
          : undefined;
        const { data } = await octokit.migrations.startForOrg({
          org: args.org as string,
          repositories,
          lock_repositories: args.lock_repositories === 'true',
          exclude_metadata: args.exclude_metadata === 'true',
          exclude_git_data: args.exclude_git_data === 'true',
          exclude_attachments: args.exclude_attachments === 'true',
          exclude_releases: args.exclude_releases === 'true',
          exclude_owner_projects: args.exclude_owner_projects === 'true',
          org_metadata_only: args.org_metadata_only === 'true',
          exclude,
        });
        return successResult(data);
      },
    },

    // get_status_for_org - Get the status of an organization migration
    {
      definition: {
        name: 'github_migrations_get_status_for_org',
        description: 'Get the status of an organization migration',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            migration_id: {
              type: 'number',
              description: 'The unique identifier of the migration',
            },
            exclude: {
              type: 'string',
              description: 'Exclude attributes from the API response (comma-separated: repositories)',
            },
          },
          required: ['org', 'migration_id'],
        },
      },
      handler: async (octokit, args) => {
        const exclude = args.exclude
          ? (args.exclude as string).split(',').map((s) => s.trim()) as ('repositories')[]
          : undefined;
        const { data } = await octokit.migrations.getStatusForOrg({
          org: args.org as string,
          migration_id: args.migration_id as number,
          exclude,
        });
        return successResult(data);
      },
    },

    // get_archive_for_org - Download an organization migration archive
    {
      definition: {
        name: 'github_migrations_get_archive_for_org',
        description: 'Download an organization migration archive. Returns a URL to download the migration archive.',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            migration_id: {
              type: 'number',
              description: 'The unique identifier of the migration',
            },
          },
          required: ['org', 'migration_id'],
        },
      },
      handler: async (octokit, args) => {
        const { url } = await octokit.migrations.downloadArchiveForOrg({
          org: args.org as string,
          migration_id: args.migration_id as number,
        });
        return successResult({ archive_url: url });
      },
    },

    // delete_archive_for_org - Delete an organization migration archive
    {
      definition: {
        name: 'github_migrations_delete_archive_for_org',
        description: 'Delete an organization migration archive',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            migration_id: {
              type: 'number',
              description: 'The unique identifier of the migration',
            },
          },
          required: ['org', 'migration_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.migrations.deleteArchiveForOrg({
          org: args.org as string,
          migration_id: args.migration_id as number,
        });
        return successResult({ success: true, message: 'Migration archive deleted' });
      },
    },

    // unlock_repo_for_org - Unlock a repository after migration
    {
      definition: {
        name: 'github_migrations_unlock_repo_for_org',
        description: 'Unlock a repository that was locked for migration. This will allow the repository to be modified again.',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            migration_id: {
              type: 'number',
              description: 'The unique identifier of the migration',
            },
            repo_name: {
              type: 'string',
              description: 'The name of the repository to unlock',
            },
          },
          required: ['org', 'migration_id', 'repo_name'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.migrations.unlockRepoForOrg({
          org: args.org as string,
          migration_id: args.migration_id as number,
          repo_name: args.repo_name as string,
        });
        return successResult({ success: true, message: 'Repository unlocked' });
      },
    },

    // list_repos_for_org - List repositories in an organization migration
    {
      definition: {
        name: 'github_migrations_list_repos_for_org',
        description: 'List the repositories in an organization migration',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            migration_id: {
              type: 'number',
              description: 'The unique identifier of the migration',
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
          required: ['org', 'migration_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.migrations.listReposForOrg({
          org: args.org as string,
          migration_id: args.migration_id as number,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },
  ],
};
