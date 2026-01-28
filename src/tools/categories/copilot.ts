import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const copilotCategory: ToolCategory = {
  name: 'copilot',
  description: 'GitHub Copilot tools',
  tools: [
    // get_copilot_organization_details - Get Copilot organization details
    {
      definition: {
        name: 'github_copilot_get_copilot_organization_details',
        description: 'Get Copilot for Business or Enterprise details for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
          },
          required: ['org'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.copilot.getCopilotOrganizationDetails({
          org: args.org as string,
        });
        return successResult(data);
      },
    },

    // list_copilot_seats - List Copilot seats for an organization
    {
      definition: {
        name: 'github_copilot_list_copilot_seats',
        description: 'List all Copilot seat assignments for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
            page: {
              type: 'number',
              description: 'Page number',
            },
          },
          required: ['org'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.copilot.listCopilotSeats({
          org: args.org as string,
          per_page: args.per_page as number | undefined,
          page: args.page as number | undefined,
        });
        return successResult(data);
      },
    },

    // add_copilot_seats_for_teams - Add Copilot seats for teams
    {
      definition: {
        name: 'github_copilot_add_copilot_seats_for_teams',
        description: 'Add Copilot seat assignments for teams in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            selected_teams: {
              type: 'string',
              description: 'Comma-separated list of team slugs to add Copilot seats for',
            },
          },
          required: ['org', 'selected_teams'],
        },
      },
      handler: async (octokit, args) => {
        const selectedTeams = (args.selected_teams as string)
          .split(',')
          .map((t) => t.trim());
        const { data } = await octokit.copilot.addCopilotSeatsForTeams({
          org: args.org as string,
          selected_teams: selectedTeams,
        });
        return successResult(data);
      },
    },

    // add_copilot_seats_for_users - Add Copilot seats for users
    {
      definition: {
        name: 'github_copilot_add_copilot_seats_for_users',
        description: 'Add Copilot seat assignments for users in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            selected_usernames: {
              type: 'string',
              description: 'Comma-separated list of GitHub usernames to add Copilot seats for',
            },
          },
          required: ['org', 'selected_usernames'],
        },
      },
      handler: async (octokit, args) => {
        const selectedUsernames = (args.selected_usernames as string)
          .split(',')
          .map((u) => u.trim());
        const { data } = await octokit.copilot.addCopilotSeatsForUsers({
          org: args.org as string,
          selected_usernames: selectedUsernames,
        });
        return successResult(data);
      },
    },

    // cancel_copilot_seat_assignment_for_teams - Cancel Copilot seats for teams
    {
      definition: {
        name: 'github_copilot_cancel_copilot_seat_assignment_for_teams',
        description: 'Cancel Copilot seat assignments for teams in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            selected_teams: {
              type: 'string',
              description: 'Comma-separated list of team slugs to cancel Copilot seats for',
            },
          },
          required: ['org', 'selected_teams'],
        },
      },
      handler: async (octokit, args) => {
        const selectedTeams = (args.selected_teams as string)
          .split(',')
          .map((t) => t.trim());
        const { data } = await octokit.copilot.cancelCopilotSeatAssignmentForTeams({
          org: args.org as string,
          selected_teams: selectedTeams,
        });
        return successResult(data);
      },
    },

    // cancel_copilot_seat_assignment_for_users - Cancel Copilot seats for users
    {
      definition: {
        name: 'github_copilot_cancel_copilot_seat_assignment_for_users',
        description: 'Cancel Copilot seat assignments for users in an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            selected_usernames: {
              type: 'string',
              description: 'Comma-separated list of GitHub usernames to cancel Copilot seats for',
            },
          },
          required: ['org', 'selected_usernames'],
        },
      },
      handler: async (octokit, args) => {
        const selectedUsernames = (args.selected_usernames as string)
          .split(',')
          .map((u) => u.trim());
        const { data } = await octokit.copilot.cancelCopilotSeatAssignmentForUsers({
          org: args.org as string,
          selected_usernames: selectedUsernames,
        });
        return successResult(data);
      },
    },
  ],
};
