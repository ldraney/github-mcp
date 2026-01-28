# Spike 001: OAuth Device Flow Authentication

## Objective

Validate that we can implement GitHub OAuth Device Flow using `@octokit/auth-oauth-device` for secure, user-friendly authentication without requiring users to manually create and manage Personal Access Tokens.

## Questions to Answer

1. Does `@octokit/auth-oauth-device` support all required scopes?
2. What is the user experience for the Device Flow?
3. How do we handle token refresh/expiration?
4. Can we store tokens securely using OS keychain?

## Findings

### OAuth Device Flow Overview

The OAuth Device Flow is designed for devices without a browser or with limited input capabilities. For CLI tools like github-mcp, it provides an excellent UX:

1. CLI requests a device code from GitHub
2. User is shown a code and URL
3. User opens URL in browser and enters code
4. CLI polls until authorization is complete
5. Access token is returned

### @octokit/auth-oauth-device

The `@octokit/auth-oauth-device` package provides:

```typescript
import { createOAuthDeviceAuth } from '@octokit/auth-oauth-device';

const auth = createOAuthDeviceAuth({
  clientType: 'oauth-app',
  clientId: 'Ov23li...',
  scopes: ['repo', 'read:org', ...],
  onVerification: (verification) => {
    console.log(`Code: ${verification.user_code}`);
    console.log(`URL: ${verification.verification_uri}`);
    // Opens: https://github.com/login/device
  },
});

const { token } = await auth({ type: 'oauth' });
```

### Required Scopes

For full GitHub API access, we need:

| Scope | Purpose |
|-------|---------|
| `repo` | Full repository access |
| `read:org` | Read org membership |
| `read:user` | Read user profile |
| `user:email` | Access email addresses |
| `read:project` | Read projects |
| `write:discussion` | Manage discussions |
| `gist` | Gist access |
| `notifications` | Notification access |
| `workflow` | Actions workflow access |
| `read:packages` | Package registry access |
| `admin:repo_hook` | Repository webhooks |
| `admin:org_hook` | Organization webhooks |

### Token Storage with keytar

```typescript
import keytar from 'keytar';

// Store
await keytar.setPassword('github-mcp', 'oauth-token', token);

// Retrieve
const token = await keytar.getPassword('github-mcp', 'oauth-token');

// Delete
await keytar.deletePassword('github-mcp', 'oauth-token');
```

keytar uses:
- macOS: Keychain
- Windows: Credential Vault
- Linux: libsecret (GNOME Keyring)

### Token Refresh

OAuth App tokens don't expire unless revoked. However, we should:
- Validate token on startup
- Handle 401 responses by triggering re-auth
- Provide `github-mcp auth logout` to clear stored token

### Error Handling

```typescript
try {
  const { token } = await auth({ type: 'oauth' });
} catch (error) {
  if (error.message.includes('authorization_pending')) {
    // User hasn't authorized yet - keep polling
  } else if (error.message.includes('slow_down')) {
    // Polling too fast - increase interval
  } else if (error.message.includes('expired_token')) {
    // Device code expired - restart flow
  } else if (error.message.includes('access_denied')) {
    // User denied authorization
  }
}
```

## POC Code

See `poc/oauth-flow/` for working proof of concept.

```typescript
// poc/oauth-flow/index.ts
import { createOAuthDeviceAuth } from '@octokit/auth-oauth-device';
import { Octokit } from '@octokit/rest';
import open from 'open';

const CLIENT_ID = process.env.GITHUB_CLIENT_ID!;

async function main() {
  const auth = createOAuthDeviceAuth({
    clientType: 'oauth-app',
    clientId: CLIENT_ID,
    scopes: ['repo', 'read:org', 'read:user'],
    onVerification: (verification) => {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`Code: ${verification.user_code}`);
      console.log(`URL:  ${verification.verification_uri}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      open(verification.verification_uri);
    },
  });

  console.log('Requesting device code...');
  const { token } = await auth({ type: 'oauth' });
  console.log('Token received!');

  const octokit = new Octokit({ auth: token });
  const { data: user } = await octokit.users.getAuthenticated();
  console.log(`Authenticated as: ${user.login}`);
}

main().catch(console.error);
```

## Recommendations

1. **Use OAuth Device Flow** - Better UX than PAT management
2. **Store tokens in keytar** - Secure, cross-platform
3. **Validate on startup** - Ensure token is still valid
4. **Provide auth CLI commands** - login, logout, status
5. **Fall back to GITHUB_TOKEN** - For CI/automation use cases

## GitHub OAuth App Setup

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Set Application name: "GitHub MCP Server"
4. Set Homepage URL: https://github.com/ldraney/github-mcp
5. Set Callback URL: http://localhost/callback (required but not used)
6. After creation, go to app settings
7. Enable "Device Flow" checkbox
8. Note the Client ID (set as GITHUB_CLIENT_ID)

## Success Criteria

- [x] Device Flow works with @octokit/auth-oauth-device
- [x] All required scopes are supported
- [x] Token storage works with keytar
- [x] Error handling is comprehensive
- [x] UX is smooth (auto-open browser, clear instructions)

## Time Spent

~4 hours

## Next Steps

1. Implement in `src/auth/oauth-device-flow.ts`
2. Add CLI commands: `auth login`, `auth logout`, `auth status`
3. Integrate with MCP server startup
