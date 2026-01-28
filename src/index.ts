#!/usr/bin/env node

import { Command } from 'commander';
import { getToken, login, logout, getAuthStatus } from './auth/oauth-flow.js';
import { startServer } from './server.js';

const program = new Command();

program
  .name('github-mcp')
  .description('GitHub MCP server with OAuth authentication')
  .version('0.1.0');

// Default command: start server
program
  .action(async () => {
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

      await startServer(token);
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
