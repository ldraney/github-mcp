import type { Octokit } from '@octokit/rest';

/**
 * Standardized response format for tool execution
 * Compatible with MCP SDK's CallToolResult
 */
export interface ToolResult {
  [key: string]: unknown;
  content: Array<{ type: 'text'; text: string }>;
  isError?: boolean;
}

/**
 * Function signature for tool handlers
 */
export type ToolHandler = (
  octokit: Octokit,
  args: Record<string, unknown>
) => Promise<ToolResult>;

/**
 * JSON Schema for tool input validation
 */
export interface ToolInputSchema {
  type: 'object';
  properties: Record<string, {
    type: string;
    description?: string;
    enum?: string[];
    items?: { type: string };
  }>;
  required?: string[];
}

/**
 * MCP tool definition (what gets sent to the client)
 */
export interface MCPToolDefinition {
  name: string;
  description: string;
  inputSchema: ToolInputSchema;
}

/**
 * Tool definition bundled with its handler
 */
export interface GitHubToolDefinition {
  definition: MCPToolDefinition;
  handler: ToolHandler;
}

/**
 * A category of related tools
 */
export interface ToolCategory {
  name: string;
  description: string;
  tools: GitHubToolDefinition[];
}

/**
 * Helper to create a successful tool result
 */
export function successResult(data: unknown): ToolResult {
  return {
    content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
  };
}

/**
 * Helper to create an error tool result
 */
export function errorResult(message: string): ToolResult {
  return {
    content: [{ type: 'text', text: `Error: ${message}` }],
    isError: true,
  };
}
