# OAuth Device Flow POC

Proof of concept for GitHub OAuth Device Flow authentication.

## Setup

1. Register a GitHub OAuth App at https://github.com/settings/developers
2. Enable "Device Flow" in app settings
3. Set environment variable: `export GITHUB_CLIENT_ID=Ov23li...`

## Run

```bash
cd poc/oauth-flow
npm install
npx ts-node index.ts
```

## Expected Flow

1. Script requests device code from GitHub
2. User code and URL are displayed
3. Browser opens to github.com/login/device
4. User enters code and authorizes
5. Script polls until authorized
6. Token is received and user info is displayed

## See Also

- [Spike Documentation](../../docs/spikes/001-oauth-device-flow.md)
- [@octokit/auth-oauth-device](https://github.com/octokit/auth-oauth-device.js)
