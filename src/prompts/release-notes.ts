import type { Prompt, GetPromptResult } from '@modelcontextprotocol/sdk/types.js';

/**
 * Release notes prompt definitions
 */
export const releaseNotesPrompts: Prompt[] = [
  {
    name: 'release_notes',
    description: 'Generate release notes from commits between two refs',
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
        name: 'base',
        description: 'Base ref (tag, branch, or SHA) - e.g., v1.0.0',
        required: true,
      },
      {
        name: 'head',
        description: 'Head ref (tag, branch, or SHA) - e.g., v1.1.0 or main',
        required: true,
      },
    ],
  },
  {
    name: 'changelog',
    description: 'Generate a changelog from recent commits',
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
        name: 'since',
        description: 'Number of days to look back (default: 30)',
        required: false,
      },
    ],
  },
  {
    name: 'whats_new',
    description: 'Generate a user-friendly "What\'s New" summary for a release',
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
        name: 'base',
        description: 'Previous release tag - e.g., v1.0.0',
        required: true,
      },
      {
        name: 'head',
        description: 'New release tag - e.g., v1.1.0',
        required: true,
      },
    ],
  },
];

/**
 * Generate a prompt result for release notes
 */
export function getReleaseNotesPrompt(
  name: string,
  args: Record<string, string>
): GetPromptResult | null {
  const owner = args.owner;
  const repo = args.repo;

  switch (name) {
    case 'release_notes':
      const base = args.base;
      const head = args.head;
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please generate release notes for ${owner}/${repo} comparing ${base} to ${head}.

Use these tools:
1. github_repos_compare_commits - Compare the two refs to get all commits
2. github_pulls_list - Get merged PRs (state: closed) to find associated PRs
3. github_issues_list - Get closed issues that might be referenced

Generate release notes in this format:

# Release Notes: ${head}

## Overview
Brief summary of this release (2-3 sentences).

## Breaking Changes
List any breaking changes that require user action.

## New Features
- Feature descriptions from commits/PRs with conventional commit type "feat"

## Bug Fixes
- Bug fixes from commits/PRs with conventional commit type "fix"

## Improvements
- Enhancements, refactors, and other improvements

## Documentation
- Documentation updates

## Dependencies
- Dependency updates

## Contributors
List of contributors to this release.

---

**Full Changelog**: ${base}...${head}

Parse conventional commit messages where available (feat:, fix:, docs:, chore:, etc.).
Group commits logically and write clear, user-friendly descriptions.`,
            },
          },
        ],
      };

    case 'changelog':
      const days = parseInt(args.since) || 30;
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please generate a changelog for ${owner}/${repo} from the last ${days} days.

Use these tools:
1. github_repos_list_commits - Get recent commits
2. github_pulls_list - Get recently merged PRs (state: closed)

Generate a changelog:

# Changelog

## [Unreleased]

### Added
- New features (feat: commits)

### Changed
- Changes to existing functionality

### Deprecated
- Features that will be removed

### Removed
- Removed features

### Fixed
- Bug fixes (fix: commits)

### Security
- Security-related changes

---

Group commits by type based on conventional commit prefixes.
Include PR numbers and links where applicable.
Only include commits from the last ${days} days.`,
            },
          },
        ],
      };

    case 'whats_new':
      const prevRelease = args.base;
      const newRelease = args.head;
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please generate a user-friendly "What's New" summary for ${owner}/${repo} release ${newRelease}.

Use these tools:
1. github_repos_compare_commits - Compare ${prevRelease} to ${newRelease}
2. github_pulls_list - Get merged PRs for context

Generate a "What's New" post suitable for users (not developers):

# What's New in ${newRelease}

## Highlights
Top 3-5 most impactful changes in plain language.

## New Features
User-facing features explained simply:
- **Feature Name**: What it does and why it's useful

## Improvements
Quality of life improvements:
- What got better and how it helps users

## Bug Fixes
Notable fixes that affected users:
- What was broken and that it's now fixed

## Getting Started
How to update and try the new features.

---

Write in a friendly, accessible tone.
Focus on user benefits, not technical implementation.
Avoid jargon and commit message details.`,
            },
          },
        ],
      };

    default:
      return null;
  }
}
