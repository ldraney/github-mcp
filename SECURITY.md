# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.2.x   | Yes       |
| < 0.2   | No        |

## How Authentication Works

This project handles GitHub authentication securely:

- **OAuth Device Flow** - Tokens are obtained via GitHub's standard OAuth flow, not stored in config files
- **OS Keychain** - Tokens are stored in your operating system's credential manager (macOS Keychain, Windows Credential Vault, Linux libsecret) via `@napi-rs/keyring`
- **Environment variable fallback** - `GITHUB_TOKEN` can be used but is the user's responsibility to secure

No credentials are ever written to disk as plaintext files.

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do not** open a public GitHub issue
2. Contact the maintainer directly via [LinkedIn](https://www.linkedin.com/in/lucas-draney-904457133/)
3. Include a description of the vulnerability, steps to reproduce, and potential impact

You should receive a response within 72 hours. Once confirmed, a fix will be prioritized and released as a patch version.

## Scope

The following are in scope for security reports:

- Token leakage or exposure
- Authentication bypass
- Injection vulnerabilities in tool input handling
- Unauthorized access to GitHub API resources
- Webhook event data exposure

The following are out of scope:

- Vulnerabilities in GitHub's API itself
- Issues requiring physical access to the machine
- Social engineering attacks
