import keytar from 'keytar';

const SERVICE_NAME = 'github-mcp';
const ACCOUNT_NAME = 'github-oauth-token';

/**
 * Store token in OS keychain
 */
export async function setToken(token: string): Promise<void> {
  await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, token);
}

/**
 * Retrieve token from OS keychain
 */
export async function getToken(): Promise<string | null> {
  return await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
}

/**
 * Delete token from OS keychain
 */
export async function deleteToken(): Promise<boolean> {
  return await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME);
}

/**
 * Check if token exists
 */
export async function hasToken(): Promise<boolean> {
  const token = await getToken();
  return token !== null;
}
