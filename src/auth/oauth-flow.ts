import crypto from 'node:crypto';
import open from 'open';
import { Octokit } from '@octokit/rest';
import { startLocalCallbackServer } from './local-server.js';
import { storeToken, retrieveToken, retrieveScopes, deleteToken } from './token-storage.js';

// OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'Ov23liEtc0pnj6t2b6Jr';
const AUTH_BACKEND_URL = process.env.AUTH_BACKEND_URL || 'https://gh-mcp-auth.fly.dev';
const OAUTH_SCOPES = 'repo,read:org,read:user,gist,notifications,workflow';

/**
 * Generate a cryptographically secure random nonce
 */
function generateNonce(): string {
  return crypto.randomBytes(24).toString('base64url');
}

/**
 * Get existing token (from env or keychain)
 */
export async function getToken(): Promise<string | null> {
  // Environment variable takes precedence
  if (process.env.GITHUB_TOKEN) {
    return process.env.GITHUB_TOKEN;
  }

  // Try keychain
  return retrieveToken();
}

/**
 * Start OAuth login flow
 */
export async function login(): Promise<string | null> {
  // Check environment first
  if (process.env.GITHUB_TOKEN) {
    console.log('Using GITHUB_TOKEN from environment');
    return process.env.GITHUB_TOKEN;
  }

  const nonce = generateNonce();

  // Start local callback server
  const { port, waitForCallback, close } = await startLocalCallbackServer(nonce);

  // Build OAuth URL
  const state = `${port}:${nonce}`;
  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', GITHUB_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', `${AUTH_BACKEND_URL}/callback`);
  authUrl.searchParams.set('scope', OAUTH_SCOPES);
  authUrl.searchParams.set('state', state);

  console.log('Opening browser for GitHub authentication...');
  console.log(`If browser doesn't open, visit: ${authUrl.toString()}`);

  // Open browser
  await open(authUrl.toString());

  try {
    // Wait for callback
    console.log('Waiting for authentication...');
    const { token, scopes } = await waitForCallback();

    // Store in keychain
    await storeToken(token, scopes);
    console.log('Token stored securely in keychain.');

    return token;
  } catch (error) {
    console.error('Authentication failed:', error instanceof Error ? error.message : error);
    return null;
  } finally {
    close();
  }
}

/**
 * Logout - remove stored token
 */
export async function logout(): Promise<void> {
  await deleteToken();
}

/**
 * Get authentication status
 */
export async function getAuthStatus(): Promise<{
  authenticated: boolean;
  username?: string;
  scopes?: string[];
}> {
  const token = await getToken();

  if (!token) {
    return { authenticated: false };
  }

  try {
    const octokit = new Octokit({ auth: token });
    const { data: user } = await octokit.users.getAuthenticated();
    const scopes = await retrieveScopes();

    return {
      authenticated: true,
      username: user.login,
      scopes: scopes?.split(',') || undefined,
    };
  } catch {
    // Token might be invalid
    return { authenticated: false };
  }
}
