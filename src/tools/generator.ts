import { Octokit } from '@octokit/rest';
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { reposTools, handleReposTool } from './categories/repos.js';
import { issuesTools, handleIssuesTool } from './categories/issues.js';
import { pullsTools, handlePullsTool } from './categories/pulls.js';
import { usersTools, handleUsersTool } from './categories/users.js';
import { actionsTools, handleActionsTool } from './categories/actions.js';
import { gistsTools, handleGistsTool } from './categories/gists.js';
import { orgsTools, handleOrgsTool } from './categories/orgs.js';
import { searchTools, handleSearchTool } from './categories/search.js';

// Store octokit instance for tool handlers
let octokitInstance: Octokit | null = null;

// All available tool categories
const CATEGORIES = {
  repos: { tools: reposTools, handler: handleReposTool },
  issues: { tools: issuesTools, handler: handleIssuesTool },
  pulls: { tools: pullsTools, handler: handlePullsTool },
  users: { tools: usersTools, handler: handleUsersTool },
  actions: { tools: actionsTools, handler: handleActionsTool },
  gists: { tools: gistsTools, handler: handleGistsTool },
  orgs: { tools: orgsTools, handler: handleOrgsTool },
  search: { tools: searchTools, handler: handleSearchTool },
} as const;

type CategoryName = keyof typeof CATEGORIES;

// Active tools after filtering by enabled categories
let activeTools: Tool[] = [];
let activeHandlers: Map<string, (octokit: Octokit, args: Record<string, unknown>) => Promise<unknown>> = new Map();

/**
 * Register tools with optional category filtering
 */
export function registerTools(octokit: Octokit, enabledCategories?: string[]): void {
  octokitInstance = octokit;
  activeTools = [];
  activeHandlers.clear();

  const categoriesToLoad = enabledCategories
    ? enabledCategories.filter((c): c is CategoryName => c in CATEGORIES)
    : (Object.keys(CATEGORIES) as CategoryName[]);

  for (const category of categoriesToLoad) {
    const { tools, handler } = CATEGORIES[category];

    for (const tool of tools) {
      activeTools.push(tool);
      activeHandlers.set(tool.name, handler);
    }
  }

  console.error(`Registered ${activeTools.length} tools from ${categoriesToLoad.length} categories`);
}

/**
 * Get all registered tool definitions
 */
export function getToolDefinitions(): Tool[] {
  return activeTools;
}

/**
 * Handle a tool call
 */
export async function handleToolCall(name: string, args: Record<string, unknown>): Promise<unknown> {
  if (!octokitInstance) {
    throw new Error('Tools not initialized. Call registerTools first.');
  }

  const handler = activeHandlers.get(name);
  if (!handler) {
    throw new Error(`Unknown tool: ${name}`);
  }

  return handler(octokitInstance, args);
}

/**
 * Get list of available categories
 */
export function getAvailableCategories(): string[] {
  return Object.keys(CATEGORIES);
}
