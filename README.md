# github-mcp

A comprehensive GitHub MCP server with OAuth Device Flow authentication and 800+ endpoint coverage.

## Features

- **800+ GitHub API endpoints** as MCP tools (vs ~50 in official server)
- **OAuth Device Flow** - No PAT management, just authenticate in browser
- **OS Keychain storage** - Secure token storage via keytar
- **Real-time webhooks** - GitHub events as MCP resources via smee.io
- **npx installable** - No Docker required

## Quick Start

```bash
npx github-mcp
```

On first run:
1. Opens browser to github.com/login/device
2. Enter the displayed code
3. Token stored securely in OS keychain
4. MCP server starts with all tools available

## Installation

```bash
npm install -g github-mcp
```

Or run directly:

```bash
npx github-mcp
```

## Usage

### As MCP Server

Add to your Claude Desktop config:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@ldraney/github-mcp", "--preset", "core"]
    }
  }
}
```

For security-focused work:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@ldraney/github-mcp", "--preset", "security"]
    }
  }
}
```

### CLI Commands

```bash
# Start server (default)
github-mcp

# Auth commands
github-mcp auth login    # Trigger OAuth flow
github-mcp auth logout   # Remove stored token
github-mcp auth status   # Check auth status

# With environment token (skips OAuth)
GITHUB_TOKEN=ghp_xxx github-mcp
```

### Presets

Claude Desktop has a ~100 tool limit. Use presets to load only what you need:

```bash
github-mcp --preset core        # Daily dev work (~95 tools)
github-mcp --preset security    # Security audits (~50 tools)
github-mcp --preset org-admin   # Org management (~70 tools)
github-mcp --preset cicd        # CI/CD automation (~60 tools)
github-mcp --preset full        # All 327 tools (Claude Code only)
```

| Preset | Categories | Use Case |
|--------|-----------|----------|
| `core` (default) | repos, issues, pulls, search, users, actions, gists | Daily development |
| `security` | dependabot, secretScanning, codeScanning, codeSecurity, securityAdvisories | Security audits |
| `org-admin` | orgs, teams, projects, activity, users, apps | Organization management |
| `cicd` | actions, checks, repos, packages | CI/CD pipelines |
| `full` | all 32 categories | Claude Code with tool search |

List presets: `github-mcp --list-presets`

Override with custom categories: `github-mcp --categories repos,issues,pulls`

## Available Tools

Tools are organized by GitHub API category:

| Category | Examples |
|----------|----------|
| `github_repos_*` | list, get, create, delete |
| `github_issues_*` | list, get, create, update, comment |
| `github_pulls_*` | list, get, create, merge, review |
| `github_users_*` | get, list, followers |
| `github_actions_*` | workflows, runs, jobs |
| `github_gists_*` | list, get, create |
| ... | 38 categories total |

## Webhook Events

When webhooks are configured, events appear as MCP resources:

```
github://webhooks/push
github://webhooks/pull_request
github://webhooks/issues
```

### Setting Up Webhooks

1. Server generates a smee.io channel on first run
2. Add the channel URL as a webhook in your repo settings
3. Events stream to the MCP server in real-time

## Configuration

Environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_TOKEN` | Skip OAuth, use this token | No |
| `GITHUB_CLIENT_ID` | OAuth App client ID | For OAuth |
| `SMEE_URL` | Custom smee.io channel | No |

## Comparison with Official GitHub MCP

| Feature | Official (Go) | github-mcp |
|---------|---------------|------------|
| Endpoints | ~50 | 800+ |
| Auth | PAT only | OAuth Device Flow |
| Webhooks | No | Yes (smee.io) |
| Install | Docker | npx |
| Token Storage | Manual | OS Keychain |

## Development

```bash
git clone https://github.com/ldraney/github-mcp.git
cd github-mcp
npm install
npm run build
npm start
```

## License

MIT
