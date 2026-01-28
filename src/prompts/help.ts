import type { Prompt, GetPromptResult } from '@modelcontextprotocol/sdk/types.js';

/**
 * Help prompt definitions
 */
export const helpPrompts: Prompt[] = [
  {
    name: 'github_help',
    description: 'Get help using the GitHub MCP server - shows available capabilities and example queries',
    arguments: [],
  },
];

/**
 * Generate a help prompt result
 */
export function getHelpPrompt(
  name: string,
  _args: Record<string, string>
): GetPromptResult | null {
  if (name !== 'github_help') {
    return null;
  }

  return {
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Please explain what the GitHub MCP server can do and give me examples of how to use it.

The GitHub MCP server provides 327 tools across these categories:

## Repository Management
- List, create, update, delete repositories
- Browse branches, commits, and file contents
- Compare commits and manage collaborators
- **Try:** "Show my 5 most recently updated repos" or "List branches on owner/repo"

## Issues & Pull Requests
- List, create, update, close issues and PRs
- Add comments, labels, and assignees
- Review PRs and manage merge status
- **Try:** "Show open issues on owner/repo" or "Get details of PR #123"

## Search
- Search repos, code, issues, users, commits
- **Try:** "Search for repos about 'machine learning' with 1000+ stars"

## Actions & CI/CD
- List workflows, runs, jobs
- View logs, artifacts, secrets
- Cancel or re-run workflows
- **Try:** "Show recent workflow runs for owner/repo"

## Organizations & Teams
- Manage org members, teams, permissions
- **Try:** "List members of my-org"

## Activity & Notifications
- View repo events, stars, watchers
- Check notifications
- **Try:** "Show recent activity on owner/repo"

## Security
- Dependabot alerts, code scanning, secret scanning
- Security advisories
- **Try:** "List Dependabot alerts for owner/repo"

## And More...
- Gists, packages, projects, reactions
- Git data (blobs, trees, refs, tags)
- Rate limits, licenses, emojis

## Pre-built Prompts
You can also use these prompts for common workflows:
- \`code_review\` - Review a PR with detailed feedback
- \`issue_triage\` - Analyze and categorize issues
- \`release_notes\` - Generate release notes between versions
- \`daily_summary\` / \`weekly_summary\` - Activity summaries

## Tips
1. Be specific: "List open issues labeled 'bug' on owner/repo"
2. Use filters: "Show my repos sorted by stars"
3. Chain actions: "Find the PR that fixed issue #42 and summarize it"

What would you like to do?`,
        },
      },
    ],
  };
}
