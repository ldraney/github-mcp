#!/usr/bin/env node

import { Command } from 'commander';
import { startServer } from './server.js';
import { login, logout, getAuthStatus } from './auth/oauth-device-flow.js';

const program = new Command();

program
  .name('github-mcp')
  .description('GitHub MCP server with OAuth Device Flow and 800+ endpoint coverage')
  .version('0.1.0');

program
  .command('start', { isDefault: true })
  .description('Start the MCP server')
  .option('--smee-url <url>', 'Custom smee.io webhook URL')
  .option('--categories <list>', 'Comma-separated list of tool categories to enable')
  .action(async (options) => {
    await startServer(options);
  });

program
  .command('auth')
  .description('Authentication commands')
  .addCommand(
    new Command('login')
      .description('Authenticate with GitHub via OAuth Device Flow')
      .action(async () => {
        await login();
      })
  )
  .addCommand(
    new Command('logout')
      .description('Remove stored GitHub credentials')
      .action(async () => {
        await logout();
      })
  )
  .addCommand(
    new Command('status')
      .description('Check authentication status')
      .action(async () => {
        await getAuthStatus();
      })
  );

program.parse();
