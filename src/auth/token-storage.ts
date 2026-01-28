import keytar from 'keytar';

const SERVICE_NAME = 'github-mcp';
const ACCOUNT_NAME = 'oauth-token';
const SCOPE_ACCOUNT = 'oauth-scopes';

/**
 * Store token securely in OS keychain
 */
export async function storeToken(token: string, scopes?: string): Promise<void> {
  await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, token);
  if (scopes) {
    await keytar.setPassword(SERVICE_NAME, SCOPE_ACCOUNT, scopes);
  }
}

/**
 * Retrieve token from OS keychain
 */
export async function retrieveToken(): Promise<string | null> {
  return keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
}

/**
 * Retrieve stored scopes
 */
export async function retrieveScopes(): Promise<string | null> {
  return keytar.getPassword(SERVICE_NAME, SCOPE_ACCOUNT);
}

/**
 * Delete token from OS keychain
 */
export async function deleteToken(): Promise<boolean> {
  const tokenDeleted = await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME);
  await keytar.deletePassword(SERVICE_NAME, SCOPE_ACCOUNT);
  return tokenDeleted;
}
