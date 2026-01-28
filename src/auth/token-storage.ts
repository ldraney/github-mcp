import { Entry } from '@napi-rs/keyring';

const SERVICE_NAME = 'github-mcp';
const ACCOUNT_NAME = 'oauth-token';
const SCOPE_ACCOUNT = 'oauth-scopes';

/**
 * Store token securely in OS keychain
 */
export async function storeToken(token: string, scopes?: string): Promise<void> {
  const tokenEntry = new Entry(SERVICE_NAME, ACCOUNT_NAME);
  tokenEntry.setPassword(token);

  if (scopes) {
    const scopeEntry = new Entry(SERVICE_NAME, SCOPE_ACCOUNT);
    scopeEntry.setPassword(scopes);
  }
}

/**
 * Retrieve token from OS keychain
 */
export async function retrieveToken(): Promise<string | null> {
  try {
    const entry = new Entry(SERVICE_NAME, ACCOUNT_NAME);
    return entry.getPassword();
  } catch {
    return null;
  }
}

/**
 * Retrieve stored scopes
 */
export async function retrieveScopes(): Promise<string | null> {
  try {
    const entry = new Entry(SERVICE_NAME, SCOPE_ACCOUNT);
    return entry.getPassword();
  } catch {
    return null;
  }
}

/**
 * Delete token from OS keychain
 */
export async function deleteToken(): Promise<boolean> {
  try {
    const tokenEntry = new Entry(SERVICE_NAME, ACCOUNT_NAME);
    tokenEntry.deletePassword();
  } catch {
    // Token didn't exist
  }

  try {
    const scopeEntry = new Entry(SERVICE_NAME, SCOPE_ACCOUNT);
    scopeEntry.deletePassword();
  } catch {
    // Scopes didn't exist
  }

  return true;
}
