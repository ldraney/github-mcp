import { createOAuthDeviceAuth } from '@octokit/auth-oauth-device';
import { Octokit } from '@octokit/rest';
import { setToken, getToken, deleteToken } from './token-storage.js';

// Default GitHub OAuth App client ID
// Users should register their own OAuth App for production use
const DEFAULT_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'Ov23liXXXXXXXXXXXXXX';

// Scopes needed for full GitHub API access
const SCOPES = [
  'repo',
  'read:org',
  'read:user',
  'user:email',
  'read:project',
  'write:discussion',
  'gist',
  'notifications',
  'workflow',
  'read:packages',
  'admin:repo_hook',
  'admin:org_hook',
];

export interface DeviceFlowVerification {
  device_code: string;
  user_code: string;
  verification_uri: string;
  expires_in: number;
  interval: number;
}

/**
 * Perform OAuth Device Flow authentication
 */
export async function login(): Promise<string | null> {
  const clientId = process.env.GITHUB_CLIENT_ID || DEFAULT_CLIENT_ID;

  if (clientId === DEFAULT_CLIENT_ID || clientId.startsWith('Ov23liXXXX')) {
    console.error('\n⚠️  No GITHUB_CLIENT_ID set. Please register an OAuth App:');
    console.error('   1. Go to https://github.com/settings/developers');
    console.error('   2. Click "New OAuth App"');
    console.error('   3. Set callback URL to: http://localhost/callback');
    console.error('   4. Enable "Device Flow" in the app settings');
    console.error('   5. Set GITHUB_CLIENT_ID environment variable\n');
    return null;
  }

  console.error('\n🔐 Starting GitHub OAuth Device Flow...\n');

  try {
    const auth = createOAuthDeviceAuth({
      clientType: 'oauth-app',
      clientId,
      scopes: SCOPES,
      onVerification: (verification) => {
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('');
        console.error('  📋 Your verification code:');
        console.error('');
        console.error(`     ${verification.user_code}`);
        console.error('');
        console.error('  🌐 Open this URL in your browser:');
        console.error('');
        console.error(`     ${verification.verification_uri}`);
        console.error('');
        console.error('  ⏳ Waiting for authorization...');
        console.error('');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        // Try to open browser automatically
        openBrowser(verification.verification_uri);
      },
    });

    const { token } = await auth({ type: 'oauth' });

    // Store token securely
    await setToken(token);

    // Verify token works
    const octokit = new Octokit({ auth: token });
    const { data: user } = await octokit.users.getAuthenticated();

    console.error('');
    console.error(`✅ Successfully authenticated as: ${user.login}`);
    console.error('   Token stored securely in OS keychain');
    console.error('');

    return token;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`\n❌ Authentication failed: ${message}\n`);
    return null;
  }
}

/**
 * Remove stored credentials
 */
export async function logout(): Promise<void> {
  const deleted = await deleteToken();

  if (deleted) {
    console.error('✅ Logged out. Token removed from keychain.');
  } else {
    console.error('ℹ️  No stored credentials found.');
  }
}

/**
 * Check and display authentication status
 */
export async function getAuthStatus(): Promise<void> {
  const token = process.env.GITHUB_TOKEN || await getToken();

  if (!token) {
    console.error('❌ Not authenticated');
    console.error('   Run: github-mcp auth login');
    return;
  }

  try {
    const octokit = new Octokit({ auth: token });
    const { data: user } = await octokit.users.getAuthenticated();

    console.error('✅ Authenticated');
    console.error(`   User: ${user.login}`);
    console.error(`   Name: ${user.name || 'Not set'}`);
    console.error(`   Email: ${user.email || 'Not public'}`);

    if (process.env.GITHUB_TOKEN) {
      console.error('   Source: GITHUB_TOKEN environment variable');
    } else {
      console.error('   Source: OS keychain');
    }
  } catch (error) {
    console.error('❌ Token is invalid or expired');
    console.error('   Run: github-mcp auth login');
  }
}

/**
 * Open URL in default browser (cross-platform)
 */
function openBrowser(url: string): void {
  const { exec } = require('child_process');
  const platform = process.platform;

  let command: string;
  if (platform === 'darwin') {
    command = `open "${url}"`;
  } else if (platform === 'win32') {
    command = `start "${url}"`;
  } else {
    command = `xdg-open "${url}"`;
  }

  exec(command, (error: Error | null) => {
    if (error) {
      // Silent fail - user can manually open the URL
    }
  });
}
