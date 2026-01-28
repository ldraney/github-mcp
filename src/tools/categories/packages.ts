import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const packagesCategory: ToolCategory = {
  name: 'packages',
  description: 'GitHub packages tools',
  tools: [
    // list_packages_for_authenticated_user - List packages for authenticated user
    {
      definition: {
        name: 'github_packages_list_packages_for_authenticated_user',
        description: 'List packages owned by the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            visibility: {
              type: 'string',
              description: 'The visibility of the packages',
              enum: ['public', 'private', 'internal'],
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
          },
          required: ['package_type'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.packages.listPackagesForAuthenticatedUser({
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          visibility: args.visibility as 'public' | 'private' | 'internal' | undefined,
          page: args.page as number | undefined,
          per_page: args.per_page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_packages_for_user - List packages for a user
    {
      definition: {
        name: 'github_packages_list_packages_for_user',
        description: 'List packages for a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'The handle for the GitHub user account',
            },
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            visibility: {
              type: 'string',
              description: 'The visibility of the packages',
              enum: ['public', 'private', 'internal'],
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
          },
          required: ['username', 'package_type'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.packages.listPackagesForUser({
          username: args.username as string,
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          visibility: args.visibility as 'public' | 'private' | 'internal' | undefined,
          page: args.page as number | undefined,
          per_page: args.per_page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_packages_for_organization - List packages for an organization
    {
      definition: {
        name: 'github_packages_list_packages_for_organization',
        description: 'List packages for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'The organization name',
            },
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            visibility: {
              type: 'string',
              description: 'The visibility of the packages',
              enum: ['public', 'private', 'internal'],
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
          },
          required: ['org', 'package_type'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.packages.listPackagesForOrganization({
          org: args.org as string,
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          visibility: args.visibility as 'public' | 'private' | 'internal' | undefined,
          page: args.page as number | undefined,
          per_page: args.per_page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_package_for_authenticated_user - Get a package for authenticated user
    {
      definition: {
        name: 'github_packages_get_package_for_authenticated_user',
        description: 'Get a package owned by the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
          },
          required: ['package_type', 'package_name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.packages.getPackageForAuthenticatedUser({
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
        });
        return successResult(data);
      },
    },

    // get_package_for_user - Get a package for a user
    {
      definition: {
        name: 'github_packages_get_package_for_user',
        description: 'Get a package for a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'The handle for the GitHub user account',
            },
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
          },
          required: ['username', 'package_type', 'package_name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.packages.getPackageForUser({
          username: args.username as string,
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
        });
        return successResult(data);
      },
    },

    // get_package_for_organization - Get a package for an organization
    {
      definition: {
        name: 'github_packages_get_package_for_organization',
        description: 'Get a package for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'The organization name',
            },
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
          },
          required: ['org', 'package_type', 'package_name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.packages.getPackageForOrganization({
          org: args.org as string,
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
        });
        return successResult(data);
      },
    },

    // delete_package_for_authenticated_user - Delete a package for authenticated user
    {
      definition: {
        name: 'github_packages_delete_package_for_authenticated_user',
        description: 'Delete a package owned by the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
          },
          required: ['package_type', 'package_name'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.packages.deletePackageForAuthenticatedUser({
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
        });
        return successResult({ success: true, message: 'Package deleted' });
      },
    },

    // delete_package_for_user - Delete a package for a user
    {
      definition: {
        name: 'github_packages_delete_package_for_user',
        description: 'Delete a package for a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'The handle for the GitHub user account',
            },
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
          },
          required: ['username', 'package_type', 'package_name'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.packages.deletePackageForUser({
          username: args.username as string,
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
        });
        return successResult({ success: true, message: 'Package deleted' });
      },
    },

    // delete_package_for_org - Delete a package for an organization
    {
      definition: {
        name: 'github_packages_delete_package_for_org',
        description: 'Delete a package for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'The organization name',
            },
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
          },
          required: ['org', 'package_type', 'package_name'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.packages.deletePackageForOrg({
          org: args.org as string,
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
        });
        return successResult({ success: true, message: 'Package deleted' });
      },
    },

    // get_all_package_versions_for_package_owned_by_authenticated_user
    {
      definition: {
        name: 'github_packages_list_versions_for_auth_user',
        description: 'Get all package versions for a package owned by the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
            state: {
              type: 'string',
              description: 'The state of the package version',
              enum: ['active', 'deleted'],
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
          },
          required: ['package_type', 'package_name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.packages.getAllPackageVersionsForPackageOwnedByAuthenticatedUser({
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
          state: args.state as 'active' | 'deleted' | undefined,
          page: args.page as number | undefined,
          per_page: args.per_page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_all_package_versions_for_package_owned_by_user
    {
      definition: {
        name: 'github_packages_list_versions_for_user',
        description: 'Get all package versions for a package owned by a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'The handle for the GitHub user account',
            },
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
          },
          required: ['username', 'package_type', 'package_name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.packages.getAllPackageVersionsForPackageOwnedByUser({
          username: args.username as string,
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
          page: args.page as number | undefined,
          per_page: args.per_page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_all_package_versions_for_package_owned_by_org
    {
      definition: {
        name: 'github_packages_list_versions_for_org',
        description: 'Get all package versions for a package owned by an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'The organization name',
            },
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
            state: {
              type: 'string',
              description: 'The state of the package version',
              enum: ['active', 'deleted'],
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
          },
          required: ['org', 'package_type', 'package_name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.packages.getAllPackageVersionsForPackageOwnedByOrg({
          org: args.org as string,
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
          state: args.state as 'active' | 'deleted' | undefined,
          page: args.page as number | undefined,
          per_page: args.per_page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_package_version_for_authenticated_user
    {
      definition: {
        name: 'github_packages_get_package_version_for_authenticated_user',
        description: 'Get a specific package version for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
            package_version_id: {
              type: 'number',
              description: 'The unique identifier of the package version',
            },
          },
          required: ['package_type', 'package_name', 'package_version_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.packages.getPackageVersionForAuthenticatedUser({
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
          package_version_id: args.package_version_id as number,
        });
        return successResult(data);
      },
    },

    // get_package_version_for_user
    {
      definition: {
        name: 'github_packages_get_package_version_for_user',
        description: 'Get a specific package version for a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'The handle for the GitHub user account',
            },
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
            package_version_id: {
              type: 'number',
              description: 'The unique identifier of the package version',
            },
          },
          required: ['username', 'package_type', 'package_name', 'package_version_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.packages.getPackageVersionForUser({
          username: args.username as string,
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
          package_version_id: args.package_version_id as number,
        });
        return successResult(data);
      },
    },

    // get_package_version_for_organization
    {
      definition: {
        name: 'github_packages_get_package_version_for_organization',
        description: 'Get a specific package version for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'The organization name',
            },
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
            package_version_id: {
              type: 'number',
              description: 'The unique identifier of the package version',
            },
          },
          required: ['org', 'package_type', 'package_name', 'package_version_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.packages.getPackageVersionForOrganization({
          org: args.org as string,
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
          package_version_id: args.package_version_id as number,
        });
        return successResult(data);
      },
    },

    // delete_package_version_for_authenticated_user
    {
      definition: {
        name: 'github_packages_delete_package_version_for_authenticated_user',
        description: 'Delete a package version for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
            package_version_id: {
              type: 'number',
              description: 'The unique identifier of the package version',
            },
          },
          required: ['package_type', 'package_name', 'package_version_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.packages.deletePackageVersionForAuthenticatedUser({
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
          package_version_id: args.package_version_id as number,
        });
        return successResult({ success: true, message: 'Package version deleted' });
      },
    },

    // delete_package_version_for_user
    {
      definition: {
        name: 'github_packages_delete_package_version_for_user',
        description: 'Delete a package version for a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'The handle for the GitHub user account',
            },
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
            package_version_id: {
              type: 'number',
              description: 'The unique identifier of the package version',
            },
          },
          required: ['username', 'package_type', 'package_name', 'package_version_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.packages.deletePackageVersionForUser({
          username: args.username as string,
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
          package_version_id: args.package_version_id as number,
        });
        return successResult({ success: true, message: 'Package version deleted' });
      },
    },

    // delete_package_version_for_org
    {
      definition: {
        name: 'github_packages_delete_package_version_for_org',
        description: 'Delete a package version for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'The organization name',
            },
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
            package_version_id: {
              type: 'number',
              description: 'The unique identifier of the package version',
            },
          },
          required: ['org', 'package_type', 'package_name', 'package_version_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.packages.deletePackageVersionForOrg({
          org: args.org as string,
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
          package_version_id: args.package_version_id as number,
        });
        return successResult({ success: true, message: 'Package version deleted' });
      },
    },

    // restore_package_for_authenticated_user
    {
      definition: {
        name: 'github_packages_restore_package_for_authenticated_user',
        description: 'Restore a package for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
            token: {
              type: 'string',
              description: 'Package token',
            },
          },
          required: ['package_type', 'package_name'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.packages.restorePackageForAuthenticatedUser({
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
          token: args.token as string | undefined,
        });
        return successResult({ success: true, message: 'Package restored' });
      },
    },

    // restore_package_for_user
    {
      definition: {
        name: 'github_packages_restore_package_for_user',
        description: 'Restore a package for a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'The handle for the GitHub user account',
            },
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
            token: {
              type: 'string',
              description: 'Package token',
            },
          },
          required: ['username', 'package_type', 'package_name'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.packages.restorePackageForUser({
          username: args.username as string,
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
          token: args.token as string | undefined,
        });
        return successResult({ success: true, message: 'Package restored' });
      },
    },

    // restore_package_for_org
    {
      definition: {
        name: 'github_packages_restore_package_for_org',
        description: 'Restore a package for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'The organization name',
            },
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
            token: {
              type: 'string',
              description: 'Package token',
            },
          },
          required: ['org', 'package_type', 'package_name'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.packages.restorePackageForOrg({
          org: args.org as string,
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
          token: args.token as string | undefined,
        });
        return successResult({ success: true, message: 'Package restored' });
      },
    },

    // restore_package_version_for_authenticated_user
    {
      definition: {
        name: 'github_packages_restore_package_version_for_authenticated_user',
        description: 'Restore a package version for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
            package_version_id: {
              type: 'number',
              description: 'The unique identifier of the package version',
            },
          },
          required: ['package_type', 'package_name', 'package_version_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.packages.restorePackageVersionForAuthenticatedUser({
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
          package_version_id: args.package_version_id as number,
        });
        return successResult({ success: true, message: 'Package version restored' });
      },
    },

    // restore_package_version_for_user
    {
      definition: {
        name: 'github_packages_restore_package_version_for_user',
        description: 'Restore a package version for a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'The handle for the GitHub user account',
            },
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
            package_version_id: {
              type: 'number',
              description: 'The unique identifier of the package version',
            },
          },
          required: ['username', 'package_type', 'package_name', 'package_version_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.packages.restorePackageVersionForUser({
          username: args.username as string,
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
          package_version_id: args.package_version_id as number,
        });
        return successResult({ success: true, message: 'Package version restored' });
      },
    },

    // restore_package_version_for_org
    {
      definition: {
        name: 'github_packages_restore_package_version_for_org',
        description: 'Restore a package version for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'The organization name',
            },
            package_type: {
              type: 'string',
              description: 'The type of supported package',
              enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
            },
            package_name: {
              type: 'string',
              description: 'The name of the package',
            },
            package_version_id: {
              type: 'number',
              description: 'The unique identifier of the package version',
            },
          },
          required: ['org', 'package_type', 'package_name', 'package_version_id'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.packages.restorePackageVersionForOrg({
          org: args.org as string,
          package_type: args.package_type as 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container',
          package_name: args.package_name as string,
          package_version_id: args.package_version_id as number,
        });
        return successResult({ success: true, message: 'Package version restored' });
      },
    },
  ],
};
