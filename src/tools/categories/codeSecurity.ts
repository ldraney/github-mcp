import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

export const codeSecurityCategory: ToolCategory = {
  name: 'codeSecurity',
  description: 'Code security configuration tools',
  tools: [
    // get_configurations_for_org - Get all code security configurations for an organization
    {
      definition: {
        name: 'github_code_security_get_configurations_for_org',
        description: 'Get all code security configurations for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            target_type: {
              type: 'string',
              enum: ['global', 'all'],
              description: 'Filter configurations by target type',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
            before: {
              type: 'string',
              description: 'Cursor for pagination (before)',
            },
            after: {
              type: 'string',
              description: 'Cursor for pagination (after)',
            },
          },
          required: ['org'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.codeSecurity.getConfigurationsForOrg({
          org: args.org as string,
          target_type: args.target_type as 'global' | 'all' | undefined,
          per_page: args.per_page as number | undefined,
          before: args.before as string | undefined,
          after: args.after as string | undefined,
        });
        return successResult(data);
      },
    },

    // get_configuration - Get a code security configuration
    {
      definition: {
        name: 'github_code_security_get_configuration',
        description: 'Get a code security configuration for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            configuration_id: {
              type: 'number',
              description: 'The unique identifier of the code security configuration',
            },
          },
          required: ['org', 'configuration_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.codeSecurity.getConfiguration({
          org: args.org as string,
          configuration_id: args.configuration_id as number,
        });
        return successResult(data);
      },
    },

    // create_configuration - Create a code security configuration
    {
      definition: {
        name: 'github_code_security_create_configuration',
        description: 'Create a code security configuration for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            name: {
              type: 'string',
              description: 'Name of the code security configuration',
            },
            description: {
              type: 'string',
              description: 'Description of the code security configuration',
            },
            advanced_security: {
              type: 'string',
              enum: ['enabled', 'disabled'],
              description: 'Enable or disable GitHub Advanced Security',
            },
            dependency_graph: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable dependency graph',
            },
            dependency_graph_autosubmit_action: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable dependency graph auto-submit action',
            },
            dependency_graph_autosubmit_action_options: {
              type: 'string',
              description: 'JSON object with labeled_runners option (boolean)',
            },
            dependabot_alerts: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable Dependabot alerts',
            },
            dependabot_security_updates: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable Dependabot security updates',
            },
            code_scanning_default_setup: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable code scanning default setup',
            },
            secret_scanning: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable secret scanning',
            },
            secret_scanning_push_protection: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable secret scanning push protection',
            },
            secret_scanning_validity_checks: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable secret scanning validity checks',
            },
            secret_scanning_non_provider_patterns: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable secret scanning non-provider patterns',
            },
            private_vulnerability_reporting: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable private vulnerability reporting',
            },
            enforcement: {
              type: 'string',
              enum: ['enforced', 'unenforced'],
              description: 'Enforcement status of the configuration',
            },
          },
          required: ['org', 'name', 'description'],
        },
      },
      handler: async (octokit, args) => {
        const options: Record<string, unknown> = {
          org: args.org as string,
          name: args.name as string,
          description: args.description as string,
        };

        if (args.advanced_security) {
          options.advanced_security = args.advanced_security;
        }
        if (args.dependency_graph) {
          options.dependency_graph = args.dependency_graph;
        }
        if (args.dependency_graph_autosubmit_action) {
          options.dependency_graph_autosubmit_action = args.dependency_graph_autosubmit_action;
        }
        if (args.dependency_graph_autosubmit_action_options) {
          options.dependency_graph_autosubmit_action_options = JSON.parse(
            args.dependency_graph_autosubmit_action_options as string
          );
        }
        if (args.dependabot_alerts) {
          options.dependabot_alerts = args.dependabot_alerts;
        }
        if (args.dependabot_security_updates) {
          options.dependabot_security_updates = args.dependabot_security_updates;
        }
        if (args.code_scanning_default_setup) {
          options.code_scanning_default_setup = args.code_scanning_default_setup;
        }
        if (args.secret_scanning) {
          options.secret_scanning = args.secret_scanning;
        }
        if (args.secret_scanning_push_protection) {
          options.secret_scanning_push_protection = args.secret_scanning_push_protection;
        }
        if (args.secret_scanning_validity_checks) {
          options.secret_scanning_validity_checks = args.secret_scanning_validity_checks;
        }
        if (args.secret_scanning_non_provider_patterns) {
          options.secret_scanning_non_provider_patterns = args.secret_scanning_non_provider_patterns;
        }
        if (args.private_vulnerability_reporting) {
          options.private_vulnerability_reporting = args.private_vulnerability_reporting;
        }
        if (args.enforcement) {
          options.enforcement = args.enforcement;
        }

        const { data } = await octokit.codeSecurity.createConfiguration(options as Parameters<typeof octokit.codeSecurity.createConfiguration>[0]);
        return successResult(data);
      },
    },

    // update_configuration - Update a code security configuration
    {
      definition: {
        name: 'github_code_security_update_configuration',
        description: 'Update a code security configuration for an organization',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            configuration_id: {
              type: 'number',
              description: 'The unique identifier of the code security configuration',
            },
            name: {
              type: 'string',
              description: 'Name of the code security configuration',
            },
            description: {
              type: 'string',
              description: 'Description of the code security configuration',
            },
            advanced_security: {
              type: 'string',
              enum: ['enabled', 'disabled'],
              description: 'Enable or disable GitHub Advanced Security',
            },
            dependency_graph: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable dependency graph',
            },
            dependency_graph_autosubmit_action: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable dependency graph auto-submit action',
            },
            dependency_graph_autosubmit_action_options: {
              type: 'string',
              description: 'JSON object with labeled_runners option (boolean)',
            },
            dependabot_alerts: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable Dependabot alerts',
            },
            dependabot_security_updates: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable Dependabot security updates',
            },
            code_scanning_default_setup: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable code scanning default setup',
            },
            secret_scanning: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable secret scanning',
            },
            secret_scanning_push_protection: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable secret scanning push protection',
            },
            secret_scanning_validity_checks: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable secret scanning validity checks',
            },
            secret_scanning_non_provider_patterns: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable secret scanning non-provider patterns',
            },
            private_vulnerability_reporting: {
              type: 'string',
              enum: ['enabled', 'disabled', 'not_set'],
              description: 'Enable or disable private vulnerability reporting',
            },
            enforcement: {
              type: 'string',
              enum: ['enforced', 'unenforced'],
              description: 'Enforcement status of the configuration',
            },
          },
          required: ['org', 'configuration_id'],
        },
      },
      handler: async (octokit, args) => {
        const options: Record<string, unknown> = {
          org: args.org as string,
          configuration_id: args.configuration_id as number,
        };

        if (args.name) {
          options.name = args.name;
        }
        if (args.description) {
          options.description = args.description;
        }
        if (args.advanced_security) {
          options.advanced_security = args.advanced_security;
        }
        if (args.dependency_graph) {
          options.dependency_graph = args.dependency_graph;
        }
        if (args.dependency_graph_autosubmit_action) {
          options.dependency_graph_autosubmit_action = args.dependency_graph_autosubmit_action;
        }
        if (args.dependency_graph_autosubmit_action_options) {
          options.dependency_graph_autosubmit_action_options = JSON.parse(
            args.dependency_graph_autosubmit_action_options as string
          );
        }
        if (args.dependabot_alerts) {
          options.dependabot_alerts = args.dependabot_alerts;
        }
        if (args.dependabot_security_updates) {
          options.dependabot_security_updates = args.dependabot_security_updates;
        }
        if (args.code_scanning_default_setup) {
          options.code_scanning_default_setup = args.code_scanning_default_setup;
        }
        if (args.secret_scanning) {
          options.secret_scanning = args.secret_scanning;
        }
        if (args.secret_scanning_push_protection) {
          options.secret_scanning_push_protection = args.secret_scanning_push_protection;
        }
        if (args.secret_scanning_validity_checks) {
          options.secret_scanning_validity_checks = args.secret_scanning_validity_checks;
        }
        if (args.secret_scanning_non_provider_patterns) {
          options.secret_scanning_non_provider_patterns = args.secret_scanning_non_provider_patterns;
        }
        if (args.private_vulnerability_reporting) {
          options.private_vulnerability_reporting = args.private_vulnerability_reporting;
        }
        if (args.enforcement) {
          options.enforcement = args.enforcement;
        }

        const { data } = await octokit.codeSecurity.updateConfiguration(options as Parameters<typeof octokit.codeSecurity.updateConfiguration>[0]);
        return successResult(data);
      },
    },

    // attach_configuration - Attach repositories to a code security configuration
    {
      definition: {
        name: 'github_code_security_attach_configuration',
        description: 'Attach repositories to a code security configuration',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            configuration_id: {
              type: 'number',
              description: 'The unique identifier of the code security configuration',
            },
            scope: {
              type: 'string',
              enum: ['all', 'public', 'private_or_internal', 'selected'],
              description: 'Scope of repositories to attach (all, public, private_or_internal, or selected)',
            },
            selected_repository_ids: {
              type: 'string',
              description: 'Comma-separated list of repository IDs (required when scope is "selected")',
            },
          },
          required: ['org', 'configuration_id', 'scope'],
        },
      },
      handler: async (octokit, args) => {
        const selectedRepoIds = args.selected_repository_ids
          ? (args.selected_repository_ids as string).split(',').map((id) => parseInt(id.trim(), 10))
          : undefined;

        const { data } = await octokit.codeSecurity.attachConfiguration({
          org: args.org as string,
          configuration_id: args.configuration_id as number,
          scope: args.scope as 'all' | 'public' | 'private_or_internal' | 'selected',
          selected_repository_ids: selectedRepoIds,
        });
        return successResult(data);
      },
    },

    // detach_configuration - Detach repositories from a code security configuration
    {
      definition: {
        name: 'github_code_security_detach_configuration',
        description: 'Detach repositories from a code security configuration',
        inputSchema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
              description: 'Organization name',
            },
            configuration_id: {
              type: 'number',
              description: 'The unique identifier of the code security configuration',
            },
            selected_repository_ids: {
              type: 'string',
              description: 'Comma-separated list of repository IDs to detach',
            },
          },
          required: ['org', 'configuration_id'],
        },
      },
      handler: async (octokit, args) => {
        const selectedRepoIds = args.selected_repository_ids
          ? (args.selected_repository_ids as string).split(',').map((id) => parseInt(id.trim(), 10))
          : undefined;

        await octokit.codeSecurity.detachConfiguration({
          org: args.org as string,
          configuration_id: args.configuration_id as number,
          selected_repository_ids: selectedRepoIds,
        });
        return successResult({ success: true, message: 'Repositories detached from configuration' });
      },
    },

    // get_default_configurations - Get default code security configurations for an organization
    {
      definition: {
        name: 'github_code_security_get_default_configurations',
        description: 'Get default code security configurations for an organization',
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
        const { data } = await octokit.codeSecurity.getDefaultConfigurations({
          org: args.org as string,
        });
        return successResult(data);
      },
    },
  ],
};
