import { Octokit } from '@octokit/rest';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const reposTools: Tool[] = [
  {
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
        affiliation: {
          type: 'string',
          description: 'Comma-separated list: owner, collaborator, organization_member',
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
  {
    name: 'github_repos_get',
    description: 'Get a repository by owner and repo name',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_repos_create',
    description: 'Create a new repository for the authenticated user',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Repository name' },
        description: { type: 'string', description: 'Repository description' },
        private: { type: 'boolean', description: 'Whether the repo is private' },
        auto_init: { type: 'boolean', description: 'Initialize with README' },
        gitignore_template: { type: 'string', description: 'Gitignore template name' },
        license_template: { type: 'string', description: 'License template name' },
      },
      required: ['name'],
    },
  },
  {
    name: 'github_repos_delete',
    description: 'Delete a repository (requires admin access)',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_repos_listForUser',
    description: 'List public repositories for a user',
    inputSchema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'GitHub username' },
        type: {
          type: 'string',
          enum: ['all', 'owner', 'member'],
          description: 'Type of repos to list',
        },
        sort: {
          type: 'string',
          enum: ['created', 'updated', 'pushed', 'full_name'],
        },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['username'],
    },
  },
  {
    name: 'github_repos_listForOrg',
    description: 'List repositories for an organization',
    inputSchema: {
      type: 'object',
      properties: {
        org: { type: 'string', description: 'Organization name' },
        type: {
          type: 'string',
          enum: ['all', 'public', 'private', 'forks', 'sources', 'member'],
        },
        sort: {
          type: 'string',
          enum: ['created', 'updated', 'pushed', 'full_name'],
        },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['org'],
    },
  },
  {
    name: 'github_repos_fork',
    description: 'Fork a repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        organization: { type: 'string', description: 'Fork to this organization' },
        name: { type: 'string', description: 'New name for the fork' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_repos_listBranches',
    description: 'List branches for a repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        protected: { type: 'boolean', description: 'Only protected branches' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_repos_getBranch',
    description: 'Get a specific branch',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        branch: { type: 'string', description: 'Branch name' },
      },
      required: ['owner', 'repo', 'branch'],
    },
  },
  {
    name: 'github_repos_getContent',
    description: 'Get repository content (files or directories)',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        path: { type: 'string', description: 'Path to file or directory' },
        ref: { type: 'string', description: 'Branch, tag, or commit SHA' },
      },
      required: ['owner', 'repo', 'path'],
    },
  },
  {
    name: 'github_repos_createOrUpdateFileContents',
    description: 'Create or update a file in a repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        path: { type: 'string', description: 'Path to file' },
        message: { type: 'string', description: 'Commit message' },
        content: { type: 'string', description: 'Base64 encoded file content' },
        sha: { type: 'string', description: 'SHA of file being replaced (for updates)' },
        branch: { type: 'string', description: 'Branch name' },
      },
      required: ['owner', 'repo', 'path', 'message', 'content'],
    },
  },
  {
    name: 'github_repos_listCommits',
    description: 'List commits for a repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        sha: { type: 'string', description: 'Branch or commit SHA to start from' },
        path: { type: 'string', description: 'Only commits containing this file path' },
        author: { type: 'string', description: 'GitHub username or email' },
        since: { type: 'string', description: 'ISO 8601 date' },
        until: { type: 'string', description: 'ISO 8601 date' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_repos_getCommit',
    description: 'Get a specific commit',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        ref: { type: 'string', description: 'Commit SHA or branch name' },
      },
      required: ['owner', 'repo', 'ref'],
    },
  },
  {
    name: 'github_repos_compareCommits',
    description: 'Compare two commits',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        basehead: { type: 'string', description: 'Base and head in format base...head' },
      },
      required: ['owner', 'repo', 'basehead'],
    },
  },
  {
    name: 'github_repos_listContributors',
    description: 'List repository contributors',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        anon: { type: 'string', description: 'Include anonymous contributors' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_repos_listTags',
    description: 'List repository tags',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_repos_listReleases',
    description: 'List repository releases',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_repos_getLatestRelease',
    description: 'Get the latest release',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
      },
      required: ['owner', 'repo'],
    },
  },
  {
    name: 'github_repos_createRelease',
    description: 'Create a release',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        tag_name: { type: 'string', description: 'Tag name for release' },
        name: { type: 'string', description: 'Release title' },
        body: { type: 'string', description: 'Release notes' },
        draft: { type: 'boolean', description: 'Create as draft' },
        prerelease: { type: 'boolean', description: 'Mark as prerelease' },
        target_commitish: { type: 'string', description: 'Branch or commit SHA' },
      },
      required: ['owner', 'repo', 'tag_name'],
    },
  },
];

export async function handleReposTool(
  octokit: Octokit,
  args: Record<string, unknown>
): Promise<unknown> {
  // Extract tool name from the call context
  // This is a simplified handler - in practice, you'd want to route based on tool name

  // For list (authenticated user's repos)
  if ('visibility' in args || ('affiliation' in args && !('username' in args) && !('org' in args))) {
    const { data } = await octokit.repos.listForAuthenticatedUser(args as Parameters<typeof octokit.repos.listForAuthenticatedUser>[0]);
    return data;
  }

  // For listForUser
  if ('username' in args && !('owner' in args)) {
    const { data } = await octokit.repos.listForUser(args as Parameters<typeof octokit.repos.listForUser>[0]);
    return data;
  }

  // For listForOrg
  if ('org' in args && !('owner' in args)) {
    const { data } = await octokit.repos.listForOrg(args as Parameters<typeof octokit.repos.listForOrg>[0]);
    return data;
  }

  // For get
  if ('owner' in args && 'repo' in args && !('name' in args) && !('path' in args) && !('branch' in args) && !('ref' in args) && !('tag_name' in args) && !('basehead' in args)) {
    const { data } = await octokit.repos.get(args as Parameters<typeof octokit.repos.get>[0]);
    return data;
  }

  // For create
  if ('name' in args && !('owner' in args)) {
    const { data } = await octokit.repos.createForAuthenticatedUser(args as Parameters<typeof octokit.repos.createForAuthenticatedUser>[0]);
    return data;
  }

  // For fork
  if ('owner' in args && 'repo' in args && ('organization' in args || Object.keys(args).length === 2)) {
    const { data } = await octokit.repos.createFork(args as Parameters<typeof octokit.repos.createFork>[0]);
    return data;
  }

  // For branches
  if ('owner' in args && 'repo' in args && 'branch' in args) {
    const { data } = await octokit.repos.getBranch(args as Parameters<typeof octokit.repos.getBranch>[0]);
    return data;
  }

  if ('owner' in args && 'repo' in args && 'protected' in args) {
    const { data } = await octokit.repos.listBranches(args as Parameters<typeof octokit.repos.listBranches>[0]);
    return data;
  }

  // For content
  if ('owner' in args && 'repo' in args && 'path' in args && !('message' in args)) {
    const { data } = await octokit.repos.getContent(args as Parameters<typeof octokit.repos.getContent>[0]);
    return data;
  }

  // For create/update file
  if ('owner' in args && 'repo' in args && 'path' in args && 'message' in args && 'content' in args) {
    const { data } = await octokit.repos.createOrUpdateFileContents(args as Parameters<typeof octokit.repos.createOrUpdateFileContents>[0]);
    return data;
  }

  // For commits
  if ('owner' in args && 'repo' in args && 'ref' in args && !('basehead' in args)) {
    const { data } = await octokit.repos.getCommit(args as Parameters<typeof octokit.repos.getCommit>[0]);
    return data;
  }

  if ('owner' in args && 'repo' in args && 'basehead' in args) {
    const { data } = await octokit.repos.compareCommits(args as Parameters<typeof octokit.repos.compareCommits>[0]);
    return data;
  }

  if ('owner' in args && 'repo' in args && ('sha' in args || 'author' in args || 'since' in args || 'until' in args)) {
    const { data } = await octokit.repos.listCommits(args as Parameters<typeof octokit.repos.listCommits>[0]);
    return data;
  }

  // For contributors
  if ('owner' in args && 'repo' in args && 'anon' in args) {
    const { data } = await octokit.repos.listContributors(args as Parameters<typeof octokit.repos.listContributors>[0]);
    return data;
  }

  // For releases
  if ('owner' in args && 'repo' in args && 'tag_name' in args) {
    const { data } = await octokit.repos.createRelease(args as Parameters<typeof octokit.repos.createRelease>[0]);
    return data;
  }

  // For tags
  if ('owner' in args && 'repo' in args) {
    const { data } = await octokit.repos.listTags(args as Parameters<typeof octokit.repos.listTags>[0]);
    return data;
  }

  // Default: list for authenticated user
  const { data } = await octokit.repos.listForAuthenticatedUser();
  return data;
}
