import type { Prompt, GetPromptResult } from '@modelcontextprotocol/sdk/types.js';

/**
 * Issue triage prompt definitions
 */
export const issueTriagePrompts: Prompt[] = [
  {
    name: 'issue_triage',
    description: 'Analyze and categorize a GitHub issue with suggested labels and priority',
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
        name: 'issue_number',
        description: 'Issue number to triage',
        required: true,
      },
    ],
  },
  {
    name: 'issue_batch_triage',
    description: 'Triage multiple open issues and suggest prioritization',
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
        name: 'limit',
        description: 'Number of issues to triage (default: 10)',
        required: false,
      },
    ],
  },
  {
    name: 'find_duplicates',
    description: 'Find potential duplicate issues in a repository',
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
        name: 'issue_number',
        description: 'Issue number to find duplicates for',
        required: true,
      },
    ],
  },
];

/**
 * Generate a prompt result for issue triage
 */
export function getIssueTriagePrompt(
  name: string,
  args: Record<string, string>
): GetPromptResult | null {
  const owner = args.owner;
  const repo = args.repo;

  switch (name) {
    case 'issue_triage':
      const issueNumber = args.issue_number;
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please triage issue #${issueNumber} in ${owner}/${repo}.

Use these tools:
1. github_issues_get - Get issue details
2. github_issues_list_comments - Get any discussion
3. github_issues_list_labels - Get available labels in the repo

Provide a triage report:

## Issue Summary
Brief description of what the issue is about.

## Classification
- **Type**: Bug, Feature Request, Documentation, Question, or Other
- **Severity**: Critical, High, Medium, or Low
- **Effort Estimate**: Small, Medium, Large, or Unknown

## Suggested Labels
Based on available labels in the repo, suggest which labels to apply.

## Priority Assessment
Explain why this issue should be prioritized at a certain level.

## Additional Context
- Is more information needed from the reporter?
- Are there related issues that should be linked?
- Who might be a good assignee based on the problem area?

## Recommended Next Steps
What should happen next with this issue?`,
            },
          },
        ],
      };

    case 'issue_batch_triage':
      const limit = parseInt(args.limit) || 10;
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please triage the open issues in ${owner}/${repo}.

Use these tools:
1. github_issues_list - Get open issues (limit: ${limit}, state: open)
2. github_issues_list_labels - Get available labels

For each issue, provide a brief triage:

## Issues Overview

Create a table with:
| # | Title | Type | Severity | Effort | Suggested Labels |
|---|-------|------|----------|--------|------------------|

## Priority Ranking
List the issues in recommended priority order with brief justification.

## Quick Wins
Identify any issues that are low effort but high value.

## Needs Attention
Flag any issues that:
- Are stale and need follow-up
- Need more information
- Might be duplicates

## Recommended Actions
Suggest immediate actions to improve issue hygiene.`,
            },
          },
        ],
      };

    case 'find_duplicates':
      const targetIssue = args.issue_number;
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please find potential duplicate issues for #${targetIssue} in ${owner}/${repo}.

Use these tools:
1. github_issues_get - Get the target issue details
2. github_issues_list - Get other open issues to compare
3. github_search_issues_and_pull_requests - Search for similar issues by keywords

Process:
1. Read issue #${targetIssue} to understand what it's about
2. Extract key terms and concepts
3. Search for issues with similar terms
4. Compare and identify potential duplicates

Report format:

## Target Issue
Brief summary of #${targetIssue}

## Potential Duplicates
For each potential duplicate:
- **Issue #X**: Title
  - Similarity: High/Medium/Low
  - Reason: Why it might be a duplicate
  - Key differences: What's different

## Recommendation
- Which issues (if any) should be marked as duplicates
- Which issue should be kept as the primary
- Any issues that are related but not duplicates`,
            },
          },
        ],
      };

    default:
      return null;
  }
}
