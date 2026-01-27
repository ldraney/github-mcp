import { Octokit } from '@octokit/rest';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const usersTools: Tool[] = [
  {
    name: 'github_users_getAuthenticated',
    description: 'Get the authenticated user',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'github_users_get',
    description: 'Get a user by username',
    inputSchema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'GitHub username' },
      },
      required: ['username'],
    },
  },
  {
    name: 'github_users_updateAuthenticated',
    description: 'Update the authenticated user profile',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Display name' },
        email: { type: 'string', description: 'Public email' },
        blog: { type: 'string', description: 'Blog URL' },
        twitter_username: { type: 'string', description: 'Twitter username' },
        company: { type: 'string', description: 'Company name' },
        location: { type: 'string', description: 'Location' },
        hireable: { type: 'boolean', description: 'Available for hire' },
        bio: { type: 'string', description: 'Bio text' },
      },
    },
  },
  {
    name: 'github_users_listFollowers',
    description: 'List followers of a user',
    inputSchema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'GitHub username (omit for authenticated user)' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
    },
  },
  {
    name: 'github_users_listFollowing',
    description: 'List users that a user is following',
    inputSchema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'GitHub username (omit for authenticated user)' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
    },
  },
  {
    name: 'github_users_checkFollowing',
    description: 'Check if a user follows another user',
    inputSchema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'User to check' },
        target_user: { type: 'string', description: 'Target user to check if followed' },
      },
      required: ['username', 'target_user'],
    },
  },
  {
    name: 'github_users_follow',
    description: 'Follow a user',
    inputSchema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'User to follow' },
      },
      required: ['username'],
    },
  },
  {
    name: 'github_users_unfollow',
    description: 'Unfollow a user',
    inputSchema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'User to unfollow' },
      },
      required: ['username'],
    },
  },
  {
    name: 'github_users_listEmails',
    description: 'List email addresses for the authenticated user',
    inputSchema: {
      type: 'object',
      properties: {
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
    },
  },
  {
    name: 'github_users_addEmails',
    description: 'Add email addresses for the authenticated user',
    inputSchema: {
      type: 'object',
      properties: {
        emails: {
          type: 'array',
          items: { type: 'string' },
          description: 'Email addresses to add',
        },
      },
      required: ['emails'],
    },
  },
  {
    name: 'github_users_listPublicKeys',
    description: 'List public SSH keys for a user',
    inputSchema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'GitHub username (omit for authenticated user)' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
    },
  },
  {
    name: 'github_users_createPublicKey',
    description: 'Create a public SSH key for the authenticated user',
    inputSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Key title' },
        key: { type: 'string', description: 'Public key content' },
      },
      required: ['title', 'key'],
    },
  },
  {
    name: 'github_users_listGpgKeys',
    description: 'List GPG keys for a user',
    inputSchema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'GitHub username (omit for authenticated user)' },
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
    },
  },
  {
    name: 'github_users_listBlocked',
    description: 'List users blocked by the authenticated user',
    inputSchema: {
      type: 'object',
      properties: {
        per_page: { type: 'number' },
        page: { type: 'number' },
      },
    },
  },
  {
    name: 'github_users_block',
    description: 'Block a user',
    inputSchema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'User to block' },
      },
      required: ['username'],
    },
  },
  {
    name: 'github_users_unblock',
    description: 'Unblock a user',
    inputSchema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'User to unblock' },
      },
      required: ['username'],
    },
  },
];

export async function handleUsersTool(
  octokit: Octokit,
  args: Record<string, unknown>
): Promise<unknown> {
  const username = args.username as string | undefined;

  // Get authenticated user
  if (Object.keys(args).length === 0) {
    const { data } = await octokit.users.getAuthenticated();
    return data;
  }

  // Get user by username (simple get)
  if (username && Object.keys(args).filter(k => k !== 'username').length === 0) {
    const { data } = await octokit.users.getByUsername({ username });
    return data;
  }

  // Update authenticated user
  if ('name' in args || 'email' in args || 'blog' in args || 'bio' in args || 'company' in args || 'location' in args || 'hireable' in args || 'twitter_username' in args) {
    const { data } = await octokit.users.updateAuthenticated(args as Parameters<typeof octokit.users.updateAuthenticated>[0]);
    return data;
  }

  // List followers
  if ('per_page' in args || 'page' in args) {
    if (username) {
      const { data } = await octokit.users.listFollowersForUser({ username, ...args } as Parameters<typeof octokit.users.listFollowersForUser>[0]);
      return data;
    }
    const { data } = await octokit.users.listFollowersForAuthenticatedUser(args as Parameters<typeof octokit.users.listFollowersForAuthenticatedUser>[0]);
    return data;
  }

  // Check following
  if ('target_user' in args && username) {
    try {
      await octokit.users.checkFollowingForUser({ username, target_user: args.target_user as string });
      return { following: true };
    } catch {
      return { following: false };
    }
  }

  // Follow user
  if (username && !('target_user' in args) && !('emails' in args) && !('key' in args)) {
    await octokit.users.follow({ username });
    return { success: true, message: `Now following ${username}` };
  }

  // List emails
  if ('emails' in args && Array.isArray(args.emails)) {
    const { data } = await octokit.users.addEmailForAuthenticatedUser({ emails: args.emails as string[] });
    return data;
  }

  // Create public key
  if ('title' in args && 'key' in args) {
    const { data } = await octokit.users.createPublicSshKeyForAuthenticatedUser(args as Parameters<typeof octokit.users.createPublicSshKeyForAuthenticatedUser>[0]);
    return data;
  }

  // Default: get authenticated user
  const { data } = await octokit.users.getAuthenticated();
  return data;
}
