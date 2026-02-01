# CLAUDE.md - GitHub MCP Server

## Project Overview

This is a GitHub MCP (Model Context Protocol) server that wraps Octokit to provide 327 GitHub API endpoints as MCP tools, with OAuth Device Flow authentication and real-time webhook event handling.

## Quick Start

```bash
npm install
npm run build
npm start
```

## Architecture

```
src/
├── index.ts          # CLI entry point (commander)
├── server.ts         # MCP server setup
├── auth/             # OAuth Device Flow + keytar storage
├── tools/            # Tool generation and category handlers
├── resources/        # MCP resources (webhook events)
└── webhooks/         # smee.io client + event queue
```

## Key Design Decisions

1. **Tool Naming**: `github_<category>_<method>` (e.g., `github_repos_list`)
2. **Auth Storage**: OS keychain via keytar (not files)
3. **Webhook Delivery**: smee.io proxy (no exposed ports)
4. **Tool Loading**: Lazy by category to avoid overwhelming LLMs

## Development Commands

```bash
npm run build      # Compile TypeScript
npm run dev        # Watch mode
npm test           # Run tests
npm run lint       # ESLint
npm run typecheck  # Type check only
```

## Environment Variables

- `GITHUB_TOKEN` - Fallback auth (skips OAuth flow)
- `GITHUB_CLIENT_ID` - OAuth App client ID
- `SMEE_URL` - Custom smee.io channel (optional)

## Testing Locally

```bash
# With env token
GITHUB_TOKEN=ghp_xxx npm start

# With OAuth (will prompt)
npm start
```

## Code Style

- TypeScript strict mode
- ES2022 modules
- Async/await over callbacks
- Descriptive error messages
- JSDoc for public APIs

## MCP Integration

The server exposes:
- **Tools**: GitHub API operations (repos, issues, pulls, etc.)
- **Resources**: Real-time webhook events
- **Prompts**: Code review, issue triage, release notes

## Common Tasks

### Adding a new tool category

1. Create `src/tools/categories/<category>.ts`
2. Export tool definitions following the pattern
3. Register in `src/tools/generator.ts`

### Adding a new webhook handler

1. Add event type to `src/webhooks/event-queue.ts`
2. Create resource in `src/resources/webhooks.ts`

## Troubleshooting

- **OAuth fails**: Check GITHUB_CLIENT_ID is set
- **Webhooks not arriving**: Verify smee.io channel
- **Token not found**: Run `github-mcp auth login`
