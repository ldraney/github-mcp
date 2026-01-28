import type { Octokit } from '@octokit/rest';
import type {
  ToolCategory,
  ToolHandler,
  MCPToolDefinition,
  ToolResult,
} from './types.js';
import { errorResult } from './types.js';
import {
  reposCategory,
  issuesCategory,
  pullsCategory,
  usersCategory,
  actionsCategory,
  searchCategory,
  orgsCategory,
  gistsCategory,
  checksCategory,
  projectsCategory,
  teamsCategory,
  activityCategory,
  gitCategory,
} from './categories/index.js';

/**
 * All available tool categories
 */
const ALL_CATEGORIES: Record<string, ToolCategory> = {
  repos: reposCategory,
  issues: issuesCategory,
  pulls: pullsCategory,
  users: usersCategory,
  actions: actionsCategory,
  search: searchCategory,
  orgs: orgsCategory,
  gists: gistsCategory,
  checks: checksCategory,
  projects: projectsCategory,
  teams: teamsCategory,
  activity: activityCategory,
  git: gitCategory,
};

/**
 * Default categories to load if none specified
 */
const DEFAULT_CATEGORIES = [
  'repos', 'issues', 'pulls', 'users', 'actions', 'search', 'orgs',
  'gists', 'checks', 'projects', 'teams', 'activity', 'git',
];

/**
 * Tool generator that manages tool loading and execution
 */
export class ToolGenerator {
  private handlers: Map<string, ToolHandler> = new Map();
  private definitions: MCPToolDefinition[] = [];
  private loadedCategories: string[] = [];

  /**
   * Load specified categories (or defaults if none specified)
   * @param categoryNames - Array of category names to load
   */
  loadCategories(categoryNames?: string[]): void {
    const names = categoryNames ?? DEFAULT_CATEGORIES;

    for (const name of names) {
      const category = ALL_CATEGORIES[name];
      if (!category) {
        console.error(`Warning: Unknown category "${name}", skipping`);
        continue;
      }

      for (const tool of category.tools) {
        this.handlers.set(tool.definition.name, tool.handler);
        this.definitions.push(tool.definition);
      }

      this.loadedCategories.push(name);
    }

    console.error(
      `Loaded ${this.definitions.length} tools from categories: ${this.loadedCategories.join(', ')}`
    );
  }

  /**
   * Get all tool definitions for MCP ListTools response
   */
  getTools(): MCPToolDefinition[] {
    return this.definitions;
  }

  /**
   * Execute a tool by name
   * @param octokit - Authenticated Octokit instance
   * @param name - Tool name
   * @param args - Tool arguments
   */
  async executeTool(
    octokit: Octokit,
    name: string,
    args: Record<string, unknown>
  ): Promise<ToolResult> {
    const handler = this.handlers.get(name);

    if (!handler) {
      return errorResult(`Unknown tool: ${name}`);
    }

    try {
      return await handler(octokit, args);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return errorResult(message);
    }
  }

  /**
   * Get list of available category names
   */
  static getAvailableCategories(): string[] {
    return Object.keys(ALL_CATEGORIES);
  }

  /**
   * Get count of loaded tools
   */
  getToolCount(): number {
    return this.definitions.length;
  }
}

/**
 * Create and initialize a tool generator
 * @param categories - Optional array of category names to load
 */
export function createToolGenerator(categories?: string[]): ToolGenerator {
  const generator = new ToolGenerator();
  generator.loadCategories(categories);
  return generator;
}
