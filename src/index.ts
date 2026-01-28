#!/usr/bin/env node

import { Command } from 'commander';
import { getToken, login, logout, getAuthStatus } from './auth/oauth-flow.js';
import { startServer } from './server.js';
import { ToolGenerator, PRESETS, DEFAULT_PRESET } from './tools/generator.js';

const program = new Command();

program
  .name('github-mcp')
  .description('GitHub MCP server with OAuth authentication')
  .version('0.1.0');

// Default command: start server
program
  .option(
    '-p, --preset <preset>',
    `Tool preset to load (${Object.keys(PRESETS).join(', ')})`,
    DEFAULT_PRESET
  )
  .option(
    '-c, --categories <categories>',
    `Comma-separated list of tool categories (overrides preset)`
  )
  .option(
    '--list-presets',
    'Show available presets and exit'
  )
  .action(async (options: { preset?: string; categories?: string; listPresets?: boolean }) => {
    // Handle --list-presets
    if (options.listPresets) {
      console.log('Available presets:\n');
      console.log(ToolGenerator.getPresetDescriptions());
      console.log('\nUsage: npx @ldraney/github-mcp --preset <preset>');
      console.log('\nFor Claude Desktop, use "core" (default) to stay under 100 tools.');
      console.log('For Claude Code, use "full" for all 327 tools.');
      process.exit(0);
    }

    try {
      let token = await getToken();

      if (!token) {
        console.log('No token found. Starting authentication flow...');
        token = await login();
      }

      if (!token) {
        console.error('Authentication failed. Cannot start server.');
        process.exit(1);
      }

      // Determine categories: explicit categories override preset
      let categories: string[] | undefined;

      if (options.categories) {
        categories = options.categories.split(',').map((c) => c.trim());
        console.error(`Using custom categories: ${categories.join(', ')}`);
      } else {
        const preset = options.preset || DEFAULT_PRESET;
        categories = ToolGenerator.getPresetCategories(preset);

        if (!categories) {
          console.error(`Unknown preset: ${preset}`);
          console.error(`Available presets: ${ToolGenerator.getAvailablePresets().join(', ')}`);
          process.exit(1);
        }

        console.error(`Using preset: ${preset}`);
      }

      await startServer(token, { categories });
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

// Auth subcommands
const authCommand = program
  .command('auth')
  .description('Manage GitHub authentication');

authCommand
  .command('login')
  .description('Authenticate with GitHub')
  .action(async () => {
    try {
      const token = await login();
      if (token) {
        console.log('Successfully authenticated!');
      } else {
        console.error('Authentication failed.');
        process.exit(1);
      }
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

authCommand
  .command('logout')
  .description('Remove stored authentication')
  .action(async () => {
    try {
      await logout();
      console.log('Logged out successfully.');
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

authCommand
  .command('status')
  .description('Check authentication status')
  .action(async () => {
    try {
      const status = await getAuthStatus();
      if (status.authenticated) {
        console.log(`Authenticated as: ${status.username}`);
        console.log(`Scopes: ${status.scopes?.join(', ') || 'unknown'}`);
      } else {
        console.log('Not authenticated.');
      }
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse();
