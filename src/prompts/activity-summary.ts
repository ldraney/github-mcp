import type { Prompt, GetPromptResult } from '@modelcontextprotocol/sdk/types.js';

/**
 * Activity summary prompt definitions
 */
export const activityPrompts: Prompt[] = [
  {
    name: 'daily_summary',
    description: 'Summarize GitHub activity from the last 24 hours for a repository',
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
    ],
  },
  {
    name: 'weekly_summary',
    description: 'Summarize GitHub activity from the last 7 days for a repository',
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
    ],
  },
  {
    name: 'repo_activity',
    description: 'Get recent activity summary for a repository (configurable timeframe)',
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
        name: 'days',
        description: 'Number of days to look back (default: 7)',
        required: false,
      },
    ],
  },
];

/**
 * Generate a prompt result for activity summaries
 * These prompts instruct Claude to use the activity tools to fetch and summarize events
 */
export function getActivityPrompt(
  name: string,
  args: Record<string, string>
): GetPromptResult {
  const owner = args.owner;
  const repo = args.repo;

  switch (name) {
    case 'daily_summary':
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please summarize the GitHub activity for ${owner}/${repo} from the last 24 hours.

Use the github_activity_list_repo_events tool to fetch recent events for this repository, then provide a summary that includes:

1. **Commits**: Any push events with commit messages
2. **Pull Requests**: Opened, closed, or merged PRs
3. **Issues**: New issues or issue comments
4. **Reviews**: PR reviews and review comments
5. **Releases**: Any new releases or tags

Filter the events to only include those from the last 24 hours based on the created_at timestamp.

If there's no activity, say so clearly.`,
            },
          },
        ],
      };

    case 'weekly_summary':
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please summarize the GitHub activity for ${owner}/${repo} from the last 7 days.

Use the github_activity_list_repo_events tool to fetch recent events for this repository (you may need to paginate through results), then provide a comprehensive summary that includes:

1. **Commits**: Push events with notable commit messages grouped by author
2. **Pull Requests**: Opened, closed, or merged PRs with titles
3. **Issues**: New issues, closed issues, and notable issue discussions
4. **Reviews**: PR reviews and their outcomes
5. **Releases**: Any new releases with version numbers
6. **Contributors**: Active contributors during this period

Filter the events to only include those from the last 7 days based on the created_at timestamp.

Organize the summary by category and highlight the most significant changes.`,
            },
          },
        ],
      };

    case 'repo_activity':
      const days = parseInt(args.days) || 7;
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please summarize the GitHub activity for ${owner}/${repo} from the last ${days} day(s).

Use the github_activity_list_repo_events tool to fetch recent events for this repository, then provide a summary that includes:

1. **Overview**: Quick stats on total events by type
2. **Commits**: Notable push events and commit activity
3. **Pull Requests**: PR activity (opened, closed, merged)
4. **Issues**: Issue activity (opened, closed, commented)
5. **Other Events**: Any other notable activity (releases, forks, stars, etc.)

Filter the events to only include those from the last ${days} day(s) based on the created_at timestamp.

Present the information in a clear, scannable format.`,
            },
          },
        ],
      };

    default:
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Unknown prompt: ${name}`,
            },
          },
        ],
      };
  }
}
