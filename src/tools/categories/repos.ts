import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const reposCategory: ToolCategory = {
  name: 'repos',
  description: 'Repository management tools',
  tools: [
    // list - List repositories for authenticated user
    {
      definition: {
        name: 'github_repos_list',
        description: 'List repositories for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            visibility: {
              type: 'string',
              enum: ['all', 'public', 'private'],
              description: 'Filter by visibility',
            },
            sort: {
              type: 'string',
              enum: ['created', 'updated', 'pushed', 'full_name'],
              description: 'Sort field',
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
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.repos.listForAuthenticatedUser({
          visibility: args.visibility as 'all' | 'public' | 'private' | undefined,
          sort: args.sort as 'created' | 'updated' | 'pushed' | 'full_name' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_for_org - List repositories for an organization
    {
      definition: {
        name: 'github_repos_list_for_org',
        description: 'List repositories for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            type: {
              type: 'string',
              enum: ['all', 'public', 'private', 'forks', 'sources', 'member'],
              description: 'Filter by type',
            },
            sort: {
              type: 'string',
              enum: ['created', 'updated', 'pushed', 'full_name'],
              description: 'Sort field',
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
        const { data } = await octokit.repos.listForOrg({
          org: args.org as string,
          type: args.type as 'all' | 'public' | 'private' | 'forks' | 'sources' | 'member' | undefined,
          sort: args.sort as 'created' | 'updated' | 'pushed' | 'full_name' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // list_for_user - List repositories for a user
    {
      definition: {
        name: 'github_repos_list_for_user',
        description: 'List public repositories for a user',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'GitHub username',
            },
            type: {
              type: 'string',
              enum: ['all', 'owner', 'member'],
              description: 'Filter by type',
            },
            sort: {
              type: 'string',
              enum: ['created', 'updated', 'pushed', 'full_name'],
              description: 'Sort field',
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
        const { data } = await octokit.repos.listForUser({
          username: args.username as string,
          type: args.type as 'all' | 'owner' | 'member' | undefined,
          sort: args.sort as 'created' | 'updated' | 'pushed' | 'full_name' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get - Get a repository
    {
      definition: {
        name: 'github_repos_get',
        description: 'Get a repository by owner and name',
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
        const { data } = await octokit.repos.get({
          owner: args.owner as string,
          repo: args.repo as string,
        });
        return successResult(data);
      },
    },

    // create - Create a repository for authenticated user
    {
      definition: {
        name: 'github_repos_create',
        description: 'Create a new repository for the authenticated user',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Repository name',
            },
            description: {
              type: 'string',
              description: 'Repository description',
            },
            private: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Whether the repository is private',
            },
            auto_init: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Create an initial commit with README',
            },
            gitignore_template: {
              type: 'string',
              description: 'Gitignore template to use (e.g., Node, Python)',
            },
            license_template: {
              type: 'string',
              description: 'License template (e.g., mit, apache-2.0)',
            },
          },
          required: ['name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.repos.createForAuthenticatedUser({
          name: args.name as string,
          description: args.description as string | undefined,
          private: args.private === 'true',
          auto_init: args.auto_init === 'true',
          gitignore_template: args.gitignore_template as string | undefined,
          license_template: args.license_template as string | undefined,
        });
        return successResult(data);
      },
    },

    // create_in_org - Create a repository in an organization
    {
      definition: {
        name: 'github_repos_create_in_org',
        description: 'Create a new repository in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            name: {
              type: 'string',
              description: 'Repository name',
            },
            description: {
              type: 'string',
              description: 'Repository description',
            },
            private: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Whether the repository is private',
            },
            auto_init: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Create an initial commit with README',
            },
          },
          required: ['org', 'name'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.repos.createInOrg({
          org: args.org as string,
          name: args.name as string,
          description: args.description as string | undefined,
          private: args.private === 'true',
          auto_init: args.auto_init === 'true',
        });
        return successResult(data);
      },
    },

    // update - Update a repository
    {
      definition: {
        name: 'github_repos_update',
        description: 'Update a repository',
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
              description: 'New repository name',
            },
            description: {
              type: 'string',
              description: 'Repository description',
            },
            private: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Whether the repository is private',
            },
            default_branch: {
              type: 'string',
              description: 'Default branch name',
            },
            has_issues: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Enable issues',
            },
            has_wiki: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Enable wiki',
            },
          },
          required: ['owner', 'repo'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.repos.update({
          owner: args.owner as string,
          repo: args.repo as string,
          name: args.name as string | undefined,
          description: args.description as string | undefined,
          private: args.private !== undefined ? args.private === 'true' : undefined,
          default_branch: args.default_branch as string | undefined,
          has_issues: args.has_issues !== undefined ? args.has_issues === 'true' : undefined,
          has_wiki: args.has_wiki !== undefined ? args.has_wiki === 'true' : undefined,
        });
        return successResult(data);
      },
    },

    // delete - Delete a repository
    {
      definition: {
        name: 'github_repos_delete',
        description: 'Delete a repository (requires delete_repo scope)',
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
        await octokit.repos.delete({
          owner: args.owner as string,
          repo: args.repo as string,
        });
        return successResult({ success: true, message: 'Repository deleted' });
      },
    },

    // list_branches - List branches
    {
      definition: {
        name: 'github_repos_list_branches',
        description: 'List branches for a repository',
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
            protected: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Filter by protected status',
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
        const { data } = await octokit.repos.listBranches({
          owner: args.owner as string,
          repo: args.repo as string,
          protected: args.protected !== undefined ? args.protected === 'true' : undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_branch - Get a branch
    {
      definition: {
        name: 'github_repos_get_branch',
        description: 'Get a branch by name',
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
            branch: {
              type: 'string',
              description: 'Branch name',
            },
          },
          required: ['owner', 'repo', 'branch'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.repos.getBranch({
          owner: args.owner as string,
          repo: args.repo as string,
          branch: args.branch as string,
        });
        return successResult(data);
      },
    },

    // list_commits - List commits
    {
      definition: {
        name: 'github_repos_list_commits',
        description: 'List commits for a repository',
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
            sha: {
              type: 'string',
              description: 'SHA or branch to start listing commits from',
            },
            path: {
              type: 'string',
              description: 'Only commits containing this file path',
            },
            author: {
              type: 'string',
              description: 'GitHub username or email to filter by',
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
        const { data } = await octokit.repos.listCommits({
          owner: args.owner as string,
          repo: args.repo as string,
          sha: args.sha as string | undefined,
          path: args.path as string | undefined,
          author: args.author as string | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_commit - Get a commit
    {
      definition: {
        name: 'github_repos_get_commit',
        description: 'Get a commit by SHA',
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
            ref: {
              type: 'string',
              description: 'Commit SHA, branch name, or tag name',
            },
          },
          required: ['owner', 'repo', 'ref'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.repos.getCommit({
          owner: args.owner as string,
          repo: args.repo as string,
          ref: args.ref as string,
        });
        return successResult(data);
      },
    },

    // compare_commits - Compare two commits
    {
      definition: {
        name: 'github_repos_compare_commits',
        description: 'Compare two commits',
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
            base: {
              type: 'string',
              description: 'Base branch/commit SHA',
            },
            head: {
              type: 'string',
              description: 'Head branch/commit SHA',
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
          required: ['owner', 'repo', 'base', 'head'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.repos.compareCommits({
          owner: args.owner as string,
          repo: args.repo as string,
          base: args.base as string,
          head: args.head as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_content - Get repository content
    {
      definition: {
        name: 'github_repos_get_content',
        description: 'Get the contents of a file or directory',
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
            path: {
              type: 'string',
              description: 'Path to file or directory',
            },
            ref: {
              type: 'string',
              description: 'Branch, tag, or commit SHA',
            },
          },
          required: ['owner', 'repo', 'path'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.repos.getContent({
          owner: args.owner as string,
          repo: args.repo as string,
          path: args.path as string,
          ref: args.ref as string | undefined,
        });
        return successResult(data);
      },
    },

    // create_or_update_file - Create or update a file
    {
      definition: {
        name: 'github_repos_create_or_update_file',
        description: 'Create or update a file in a repository',
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
            path: {
              type: 'string',
              description: 'Path to the file',
            },
            message: {
              type: 'string',
              description: 'Commit message',
            },
            content: {
              type: 'string',
              description: 'File content (will be base64 encoded)',
            },
            sha: {
              type: 'string',
              description: 'SHA of file being replaced (required for updates)',
            },
            branch: {
              type: 'string',
              description: 'Branch to commit to',
            },
          },
          required: ['owner', 'repo', 'path', 'message', 'content'],
        },
      },
      handler: async (octokit, args) => {
        const content = Buffer.from(args.content as string).toString('base64');
        const { data } = await octokit.repos.createOrUpdateFileContents({
          owner: args.owner as string,
          repo: args.repo as string,
          path: args.path as string,
          message: args.message as string,
          content,
          sha: args.sha as string | undefined,
          branch: args.branch as string | undefined,
        });
        return successResult(data);
      },
    },

    // delete_file - Delete a file
    {
      definition: {
        name: 'github_repos_delete_file',
        description: 'Delete a file from a repository',
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
            path: {
              type: 'string',
              description: 'Path to the file',
            },
            message: {
              type: 'string',
              description: 'Commit message',
            },
            sha: {
              type: 'string',
              description: 'SHA of the file being deleted',
            },
            branch: {
              type: 'string',
              description: 'Branch to commit to',
            },
          },
          required: ['owner', 'repo', 'path', 'message', 'sha'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.repos.deleteFile({
          owner: args.owner as string,
          repo: args.repo as string,
          path: args.path as string,
          message: args.message as string,
          sha: args.sha as string,
          branch: args.branch as string | undefined,
        });
        return successResult(data);
      },
    },

    // list_collaborators - List collaborators
    {
      definition: {
        name: 'github_repos_list_collaborators',
        description: 'List collaborators for a repository',
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
            affiliation: {
              type: 'string',
              enum: ['outside', 'direct', 'all'],
              description: 'Filter by affiliation',
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
        const { data } = await octokit.repos.listCollaborators({
          owner: args.owner as string,
          repo: args.repo as string,
          affiliation: args.affiliation as 'outside' | 'direct' | 'all' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // add_collaborator - Add a collaborator
    {
      definition: {
        name: 'github_repos_add_collaborator',
        description: 'Add a collaborator to a repository',
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
            username: {
              type: 'string',
              description: 'Username to add',
            },
            permission: {
              type: 'string',
              enum: ['pull', 'push', 'admin', 'maintain', 'triage'],
              description: 'Permission level',
            },
          },
          required: ['owner', 'repo', 'username'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.repos.addCollaborator({
          owner: args.owner as string,
          repo: args.repo as string,
          username: args.username as string,
          permission: args.permission as 'pull' | 'push' | 'admin' | 'maintain' | 'triage' | undefined,
        });
        return successResult(data || { success: true, message: 'Collaborator added' });
      },
    },

    // list_forks - List forks
    {
      definition: {
        name: 'github_repos_list_forks',
        description: 'List forks of a repository',
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
            sort: {
              type: 'string',
              enum: ['newest', 'oldest', 'stargazers', 'watchers'],
              description: 'Sort field',
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
        const { data } = await octokit.repos.listForks({
          owner: args.owner as string,
          repo: args.repo as string,
          sort: args.sort as 'newest' | 'oldest' | 'stargazers' | 'watchers' | undefined,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // create_fork - Create a fork
    {
      definition: {
        name: 'github_repos_create_fork',
        description: 'Create a fork of a repository',
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
            organization: {
              type: 'string',
              description: 'Organization to fork into (optional)',
            },
            name: {
              type: 'string',
              description: 'Name for the forked repository',
            },
            default_branch_only: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Only fork the default branch',
            },
          },
          required: ['owner', 'repo'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.repos.createFork({
          owner: args.owner as string,
          repo: args.repo as string,
          organization: args.organization as string | undefined,
          name: args.name as string | undefined,
          default_branch_only: args.default_branch_only === 'true',
        });
        return successResult(data);
      },
    },
  ],
};
