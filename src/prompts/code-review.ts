import type { Prompt, GetPromptResult } from '@modelcontextprotocol/sdk/types.js';

/**
 * Code review prompt definitions
 */
export const codeReviewPrompts: Prompt[] = [
  {
    name: 'code_review',
    description: 'Review a pull request with detailed suggestions and feedback',
    arguments: [
      {
        name: 'owner',
        description: 'Repository owner (username or organization)',
        required: true,
      },
      {
        name: 'repo',
        description: 'Repository name',
        required: true,
      },
      {
        name: 'pull_number',
        description: 'Pull request number',
        required: true,
      },
      {
        name: 'focus',
        description: 'Review focus area (e.g., security, performance, style, all)',
        required: false,
      },
    ],
  },
  {
    name: 'pr_summary',
    description: 'Generate a concise summary of a pull request',
    arguments: [
      {
        name: 'owner',
        description: 'Repository owner (username or organization)',
        required: true,
      },
      {
        name: 'repo',
        description: 'Repository name',
        required: true,
      },
      {
        name: 'pull_number',
        description: 'Pull request number',
        required: true,
      },
    ],
  },
];

/**
 * Generate a prompt result for code review
 */
export function getCodeReviewPrompt(
  name: string,
  args: Record<string, string>
): GetPromptResult | null {
  const owner = args.owner;
  const repo = args.repo;
  const pullNumber = args.pull_number;

  switch (name) {
    case 'code_review':
      const focus = args.focus || 'all';
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please review pull request #${pullNumber} in ${owner}/${repo}.

First, use these tools to gather information:
1. github_pulls_get - Get PR details (title, description, state)
2. github_pulls_list_files - Get the list of changed files
3. github_pulls_list_commits - Get commits in this PR

Then provide a comprehensive code review with focus on: ${focus === 'all' ? 'all aspects' : focus}

Structure your review as follows:

## Summary
Brief overview of what this PR does.

## Changes Analysis
List the files changed with a brief description of each change.

## Review Feedback

${focus === 'all' || focus === 'security' ? `### Security
- Check for potential vulnerabilities (injection, XSS, auth issues, etc.)
- Review sensitive data handling
- Check for hardcoded credentials or secrets
` : ''}
${focus === 'all' || focus === 'performance' ? `### Performance
- Identify potential bottlenecks
- Check for inefficient algorithms or queries
- Review resource usage
` : ''}
${focus === 'all' || focus === 'style' ? `### Code Style & Quality
- Check naming conventions
- Review code organization
- Suggest readability improvements
` : ''}
### Logic & Correctness
- Verify the implementation matches the PR description
- Check edge cases
- Identify potential bugs

## Suggestions
Specific, actionable suggestions for improvement.

## Verdict
Overall assessment: Approve, Request Changes, or Comment.`,
            },
          },
        ],
      };

    case 'pr_summary':
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please provide a concise summary of pull request #${pullNumber} in ${owner}/${repo}.

Use these tools:
1. github_pulls_get - Get PR details
2. github_pulls_list_files - Get changed files
3. github_pulls_list_commits - Get commits

Provide a summary that includes:
- **Title & Purpose**: What does this PR do?
- **Files Changed**: List of files with change type (added/modified/deleted)
- **Key Changes**: Bullet points of the main changes
- **Size**: Lines added/removed, number of files

Keep it brief - this is for quick understanding, not a full review.`,
            },
          },
        ],
      };

    default:
      return null;
  }
}
