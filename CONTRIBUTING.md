# Contributing to github-mcp

Thanks for your interest in contributing! This guide covers everything you need to get started.

## Getting Started

### Prerequisites

- Node.js >= 20
- npm
- A GitHub account (for OAuth testing)

### Development Setup

```bash
git clone https://github.com/ldraney/github-mcp.git
cd github-mcp
npm install
npm run build
```

### Running Locally

```bash
# With OAuth (will prompt for browser auth)
npm start

# With a personal access token
GITHUB_TOKEN=ghp_xxx npm start

# Watch mode for development
npm run dev
```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript |
| `npm run dev` | Watch mode with tsx |
| `npm test` | Run tests |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type check without emitting |

## Code Style

- TypeScript strict mode
- ES2022 modules
- Async/await over callbacks
- Descriptive error messages
- JSDoc for public APIs

## Making Changes

### 1. Open an Issue First

All work should be tracked by a GitHub issue. Open one before starting work so we can discuss the approach.

### 2. Branch from main

```bash
git checkout -b <issue-number>-short-description
```

### 3. Make Your Changes

- Keep changes focused and minimal
- Follow existing patterns in the codebase
- Add tests where applicable

### 4. Verify Your Work

```bash
npm run typecheck
npm run build
npm run lint
```

### 5. Submit a Pull Request

- Fill out the PR template completely
- Link the related issue with `Closes #<number>`
- Describe what changed and why

## Project Structure

```
src/
├── index.ts          # CLI entry point (commander)
├── server.ts         # MCP server setup
├── auth/             # OAuth Device Flow + keychain storage
├── tools/            # Tool generation and category handlers
├── resources/        # MCP resources (webhook events)
└── webhooks/         # smee.io client + event queue
```

### Adding a New Tool Category

1. Create `src/tools/categories/<category>.ts`
2. Export tool definitions following the existing pattern
3. Register in `src/tools/generator.ts`

### Adding a New Webhook Handler

1. Add event type to `src/webhooks/event-queue.ts`
2. Create resource in `src/resources/webhooks.ts`

## Reporting Bugs

Use the GitHub issue tracker. Include:

- Steps to reproduce
- Expected vs actual behavior
- Node.js version and OS
- Relevant error output

## Questions?

Open an issue or start a discussion on the repo.
