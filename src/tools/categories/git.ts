import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const gitCategory: ToolCategory = {
  name: 'git',
  description: 'Low-level Git operations',
  tools: [
    // get_blob - Get a blob
    {
      definition: {
        name: 'github_git_get_blob',
        description: 'Get a blob by SHA',
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
            file_sha: {
              type: 'string',
              description: 'SHA of the blob',
            },
          },
          required: ['owner', 'repo', 'file_sha'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.git.getBlob({
          owner: args.owner as string,
          repo: args.repo as string,
          file_sha: args.file_sha as string,
        });
        return successResult(data);
      },
    },

    // create_blob - Create a blob
    {
      definition: {
        name: 'github_git_create_blob',
        description: 'Create a blob',
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
            content: {
              type: 'string',
              description: 'Content of the blob',
            },
            encoding: {
              type: 'string',
              enum: ['utf-8', 'base64'],
              description: 'Encoding of the content (utf-8 or base64)',
            },
          },
          required: ['owner', 'repo', 'content'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.git.createBlob({
          owner: args.owner as string,
          repo: args.repo as string,
          content: args.content as string,
          encoding: args.encoding as 'utf-8' | 'base64' | undefined,
        });
        return successResult(data);
      },
    },

    // get_commit - Get a commit
    {
      definition: {
        name: 'github_git_get_commit',
        description: 'Get a Git commit object by SHA',
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
            commit_sha: {
              type: 'string',
              description: 'SHA of the commit',
            },
          },
          required: ['owner', 'repo', 'commit_sha'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.git.getCommit({
          owner: args.owner as string,
          repo: args.repo as string,
          commit_sha: args.commit_sha as string,
        });
        return successResult(data);
      },
    },

    // create_commit - Create a commit
    {
      definition: {
        name: 'github_git_create_commit',
        description: 'Create a new Git commit object',
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
            message: {
              type: 'string',
              description: 'Commit message',
            },
            tree: {
              type: 'string',
              description: 'SHA of the tree object this commit points to',
            },
            parents: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of parent commit SHAs',
            },
            author: {
              type: 'string',
              description: 'Author info as JSON: {"name": "...", "email": "...", "date": "..."}',
            },
            committer: {
              type: 'string',
              description: 'Committer info as JSON: {"name": "...", "email": "...", "date": "..."}',
            },
            signature: {
              type: 'string',
              description: 'PGP signature for the commit',
            },
          },
          required: ['owner', 'repo', 'message', 'tree'],
        },
      },
      handler: async (octokit, args) => {
        const author = args.author ? JSON.parse(args.author as string) : undefined;
        const committer = args.committer ? JSON.parse(args.committer as string) : undefined;
        const { data } = await octokit.git.createCommit({
          owner: args.owner as string,
          repo: args.repo as string,
          message: args.message as string,
          tree: args.tree as string,
          parents: args.parents as string[] | undefined,
          author,
          committer,
          signature: args.signature as string | undefined,
        });
        return successResult(data);
      },
    },

    // get_ref - Get a reference
    {
      definition: {
        name: 'github_git_get_ref',
        description: 'Get a Git reference (e.g., heads/main, tags/v1.0)',
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
              description: 'Reference name (e.g., heads/main, tags/v1.0)',
            },
          },
          required: ['owner', 'repo', 'ref'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.git.getRef({
          owner: args.owner as string,
          repo: args.repo as string,
          ref: args.ref as string,
        });
        return successResult(data);
      },
    },

    // list_matching_refs - List matching references
    {
      definition: {
        name: 'github_git_list_matching_refs',
        description: 'List references matching a prefix (e.g., heads/, tags/)',
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
              description: 'Reference prefix to match (e.g., heads/, tags/)',
            },
          },
          required: ['owner', 'repo', 'ref'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.git.listMatchingRefs({
          owner: args.owner as string,
          repo: args.repo as string,
          ref: args.ref as string,
        });
        return successResult(data);
      },
    },

    // create_ref - Create a reference
    {
      definition: {
        name: 'github_git_create_ref',
        description: 'Create a Git reference (branch or tag)',
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
              description: 'Full reference name (e.g., refs/heads/new-branch)',
            },
            sha: {
              type: 'string',
              description: 'SHA to point the reference to',
            },
          },
          required: ['owner', 'repo', 'ref', 'sha'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.git.createRef({
          owner: args.owner as string,
          repo: args.repo as string,
          ref: args.ref as string,
          sha: args.sha as string,
        });
        return successResult(data);
      },
    },

    // update_ref - Update a reference
    {
      definition: {
        name: 'github_git_update_ref',
        description: 'Update a Git reference to point to a new SHA',
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
              description: 'Reference name (e.g., heads/main, tags/v1.0)',
            },
            sha: {
              type: 'string',
              description: 'New SHA to point the reference to',
            },
            force: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Force update even if not fast-forward',
            },
          },
          required: ['owner', 'repo', 'ref', 'sha'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.git.updateRef({
          owner: args.owner as string,
          repo: args.repo as string,
          ref: args.ref as string,
          sha: args.sha as string,
          force: args.force === 'true',
        });
        return successResult(data);
      },
    },

    // delete_ref - Delete a reference
    {
      definition: {
        name: 'github_git_delete_ref',
        description: 'Delete a Git reference (branch or tag)',
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
              description: 'Reference name to delete (e.g., heads/branch-name, tags/v1.0)',
            },
          },
          required: ['owner', 'repo', 'ref'],
        },
      },
      handler: async (octokit, args) => {
        await octokit.git.deleteRef({
          owner: args.owner as string,
          repo: args.repo as string,
          ref: args.ref as string,
        });
        return successResult({ success: true, message: 'Reference deleted' });
      },
    },

    // get_tag - Get a tag
    {
      definition: {
        name: 'github_git_get_tag',
        description: 'Get a Git tag object by SHA',
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
            tag_sha: {
              type: 'string',
              description: 'SHA of the tag',
            },
          },
          required: ['owner', 'repo', 'tag_sha'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.git.getTag({
          owner: args.owner as string,
          repo: args.repo as string,
          tag_sha: args.tag_sha as string,
        });
        return successResult(data);
      },
    },

    // create_tag - Create a tag object
    {
      definition: {
        name: 'github_git_create_tag',
        description: 'Create a Git tag object (annotated tag)',
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
            tag: {
              type: 'string',
              description: 'Tag name',
            },
            message: {
              type: 'string',
              description: 'Tag message',
            },
            object: {
              type: 'string',
              description: 'SHA of the object to tag',
            },
            type: {
              type: 'string',
              enum: ['commit', 'tree', 'blob'],
              description: 'Type of object being tagged',
            },
            tagger: {
              type: 'string',
              description: 'Tagger info as JSON: {"name": "...", "email": "...", "date": "..."}',
            },
          },
          required: ['owner', 'repo', 'tag', 'message', 'object', 'type'],
        },
      },
      handler: async (octokit, args) => {
        const tagger = args.tagger ? JSON.parse(args.tagger as string) : undefined;
        const { data } = await octokit.git.createTag({
          owner: args.owner as string,
          repo: args.repo as string,
          tag: args.tag as string,
          message: args.message as string,
          object: args.object as string,
          type: args.type as 'commit' | 'tree' | 'blob',
          tagger,
        });
        return successResult(data);
      },
    },

    // get_tree - Get a tree
    {
      definition: {
        name: 'github_git_get_tree',
        description: 'Get a Git tree object by SHA',
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
            tree_sha: {
              type: 'string',
              description: 'SHA of the tree',
            },
            recursive: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Recursively retrieve tree contents',
            },
          },
          required: ['owner', 'repo', 'tree_sha'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.git.getTree({
          owner: args.owner as string,
          repo: args.repo as string,
          tree_sha: args.tree_sha as string,
          recursive: args.recursive as string | undefined,
        });
        return successResult(data);
      },
    },

    // create_tree - Create a tree
    {
      definition: {
        name: 'github_git_create_tree',
        description: 'Create a Git tree object',
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
            tree: {
              type: 'string',
              description: 'Tree entries as JSON array: [{"path": "...", "mode": "100644", "type": "blob", "sha": "..."}, ...]',
            },
            base_tree: {
              type: 'string',
              description: 'SHA of the base tree to build on (for incremental updates)',
            },
          },
          required: ['owner', 'repo', 'tree'],
        },
      },
      handler: async (octokit, args) => {
        const tree = JSON.parse(args.tree as string);
        const { data } = await octokit.git.createTree({
          owner: args.owner as string,
          repo: args.repo as string,
          tree,
          base_tree: args.base_tree as string | undefined,
        });
        return successResult(data);
      },
    },
  ],
};
