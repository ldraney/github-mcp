import type { ToolCategory } from '../types.js';
import { successResult } from '../types.js';

type Ecosystem = 'actions' | 'npm' | 'maven' | 'rubygems' | 'nuget' | 'pip' | 'composer' | 'go' | 'rust' | 'erlang' | 'pub' | 'other' | 'swift';
type CreditType = 'analyst' | 'finder' | 'reporter' | 'coordinator' | 'remediation_developer' | 'remediation_reviewer' | 'remediation_verifier' | 'tool' | 'sponsor' | 'other';

export const securityAdvisoriesCategory: ToolCategory = {
  name: 'securityAdvisories',
  description: 'Security advisories tools',
  tools: [
    // list_global_advisories - List global security advisories
    {
      definition: {
        name: 'github_securityAdvisories_list_global_advisories',
        description: 'List global security advisories from the GitHub Advisory Database',
        inputSchema: {
          type: 'object',
          properties: {
            ghsa_id: {
              type: 'string',
              description: 'Filter by GitHub Security Advisory ID (e.g., GHSA-xxxx-xxxx-xxxx)',
            },
            cve_id: {
              type: 'string',
              description: 'Filter by CVE ID (e.g., CVE-2021-44228)',
            },
            ecosystem: {
              type: 'string',
              description: 'Filter by ecosystem (e.g., npm, pip, maven, nuget, rubygems, go, rust, pub, erlang, actions, composer, swift)',
            },
            severity: {
              type: 'string',
              enum: ['unknown', 'low', 'medium', 'high', 'critical'],
              description: 'Filter by severity level',
            },
            cwes: {
              type: 'array',
              items: { type: 'string' },
              description: 'Filter by CWE IDs (e.g., CWE-79)',
            },
            is_withdrawn: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Filter by whether the advisory has been withdrawn',
            },
            affects: {
              type: 'array',
              items: { type: 'string' },
              description: 'Filter by package names that the advisory affects',
            },
            published: {
              type: 'string',
              description: 'Filter by published date range (e.g., 2021-01-01..2021-12-31)',
            },
            updated: {
              type: 'string',
              description: 'Filter by updated date range (e.g., 2021-01-01..2021-12-31)',
            },
            modified: {
              type: 'string',
              description: 'Filter by modified date range (ISO 8601 format)',
            },
            before: {
              type: 'string',
              description: 'Cursor for pagination (before this advisory)',
            },
            after: {
              type: 'string',
              description: 'Cursor for pagination (after this advisory)',
            },
            type: {
              type: 'string',
              enum: ['reviewed', 'malware', 'unreviewed'],
              description: 'Filter by advisory type',
            },
            direction: {
              type: 'string',
              enum: ['asc', 'desc'],
              description: 'Sort direction',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
            sort: {
              type: 'string',
              enum: ['updated', 'published'],
              description: 'Sort by field',
            },
          },
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.securityAdvisories.listGlobalAdvisories({
          ghsa_id: args.ghsa_id as string | undefined,
          cve_id: args.cve_id as string | undefined,
          ecosystem: args.ecosystem as Ecosystem | undefined,
          severity: args.severity as 'unknown' | 'low' | 'medium' | 'high' | 'critical' | undefined,
          cwes: args.cwes as string[] | undefined,
          is_withdrawn: args.is_withdrawn === 'true' ? true : args.is_withdrawn === 'false' ? false : undefined,
          affects: args.affects as string[] | undefined,
          published: args.published as string | undefined,
          updated: args.updated as string | undefined,
          modified: args.modified as string | undefined,
          before: args.before as string | undefined,
          after: args.after as string | undefined,
          type: args.type as 'reviewed' | 'malware' | 'unreviewed' | undefined,
          direction: args.direction as 'asc' | 'desc' | undefined,
          per_page: args.per_page as number | undefined,
          sort: args.sort as 'updated' | 'published' | undefined,
        });
        return successResult(data);
      },
    },

    // get_global_advisory - Get a global security advisory
    {
      definition: {
        name: 'github_securityAdvisories_get_global_advisory',
        description: 'Get a global security advisory by its GHSA ID',
        inputSchema: {
          type: 'object',
          properties: {
            ghsa_id: {
              type: 'string',
              description: 'The GitHub Security Advisory ID (e.g., GHSA-xxxx-xxxx-xxxx)',
            },
          },
          required: ['ghsa_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.securityAdvisories.getGlobalAdvisory({
          ghsa_id: args.ghsa_id as string,
        });
        return successResult(data);
      },
    },

    // list_repository_advisories - List repository security advisories
    {
      definition: {
        name: 'github_securityAdvisories_list_repository_advisories',
        description: 'List security advisories for a repository',
        inputSchema: {
          type: 'object',
          properties: {
            owner: {
              type: 'string',
              description: 'Repository owner (username or organization)',
            },
            repo: {
              type: 'string',
              description: 'Repository name',
            },
            state: {
              type: 'string',
              enum: ['triage', 'draft', 'published', 'closed'],
              description: 'Filter by advisory state',
            },
            severity: {
              type: 'string',
              enum: ['unknown', 'low', 'medium', 'high', 'critical'],
              description: 'Filter by severity level',
            },
            direction: {
              type: 'string',
              enum: ['asc', 'desc'],
              description: 'Sort direction',
            },
            sort: {
              type: 'string',
              enum: ['created', 'updated', 'published'],
              description: 'Sort by field',
            },
            before: {
              type: 'string',
              description: 'Cursor for pagination (before this advisory)',
            },
            after: {
              type: 'string',
              description: 'Cursor for pagination (after this advisory)',
            },
            per_page: {
              type: 'number',
              description: 'Results per page (max 100)',
            },
          },
          required: ['owner', 'repo'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.securityAdvisories.listRepositoryAdvisories({
          owner: args.owner as string,
          repo: args.repo as string,
          state: args.state as 'triage' | 'draft' | 'published' | 'closed' | undefined,
          severity: args.severity as 'unknown' | 'low' | 'medium' | 'high' | 'critical' | undefined,
          direction: args.direction as 'asc' | 'desc' | undefined,
          sort: args.sort as 'created' | 'updated' | 'published' | undefined,
          before: args.before as string | undefined,
          after: args.after as string | undefined,
          per_page: args.per_page as number | undefined,
        });
        return successResult(data);
      },
    },

    // get_repository_advisory - Get a repository security advisory
    {
      definition: {
        name: 'github_securityAdvisories_get_repository_advisory',
        description: 'Get a repository security advisory by its GHSA ID',
        inputSchema: {
          type: 'object',
          properties: {
            owner: {
              type: 'string',
              description: 'Repository owner (username or organization)',
            },
            repo: {
              type: 'string',
              description: 'Repository name',
            },
            ghsa_id: {
              type: 'string',
              description: 'The GitHub Security Advisory ID (e.g., GHSA-xxxx-xxxx-xxxx)',
            },
          },
          required: ['owner', 'repo', 'ghsa_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.securityAdvisories.getRepositoryAdvisory({
          owner: args.owner as string,
          repo: args.repo as string,
          ghsa_id: args.ghsa_id as string,
        });
        return successResult(data);
      },
    },

    // create_repository_advisory - Create a repository security advisory
    {
      definition: {
        name: 'github_securityAdvisories_create_repository_advisory',
        description: 'Create a new security advisory for a repository',
        inputSchema: {
          type: 'object',
          properties: {
            owner: {
              type: 'string',
              description: 'Repository owner (username or organization)',
            },
            repo: {
              type: 'string',
              description: 'Repository name',
            },
            summary: {
              type: 'string',
              description: 'A short summary of the advisory (required)',
            },
            description: {
              type: 'string',
              description: 'A detailed description of the vulnerability',
            },
            cve_id: {
              type: 'string',
              description: 'The CVE ID if known (e.g., CVE-2021-44228)',
            },
            vulnerabilities: {
              type: 'array',
              items: { type: 'object' },
              description: 'Array of vulnerability objects with package, ecosystem, and vulnerable_version_range',
            },
            cwe_ids: {
              type: 'array',
              items: { type: 'string' },
              description: 'CWE IDs (e.g., ["CWE-79", "CWE-89"])',
            },
            credits: {
              type: 'array',
              items: { type: 'object' },
              description: 'Array of credit objects with login and type',
            },
            severity: {
              type: 'string',
              enum: ['critical', 'high', 'medium', 'low'],
              description: 'Severity level of the vulnerability',
            },
            cvss_vector_string: {
              type: 'string',
              description: 'CVSS vector string (e.g., CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H)',
            },
            start_private_fork: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Whether to start a private fork for collaboration on a fix',
            },
          },
          required: ['owner', 'repo', 'summary', 'vulnerabilities'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.securityAdvisories.createRepositoryAdvisory({
          owner: args.owner as string,
          repo: args.repo as string,
          summary: args.summary as string,
          description: (args.description as string | undefined) ?? '',
          cve_id: args.cve_id as string | null | undefined,
          vulnerabilities: args.vulnerabilities as Array<{
            package: { ecosystem: Ecosystem; name?: string | null };
            vulnerable_version_range?: string | null;
            patched_versions?: string | null;
            vulnerable_functions?: string[] | null;
          }>,
          cwe_ids: args.cwe_ids as string[] | undefined,
          credits: args.credits as Array<{ login: string; type: CreditType }> | null | undefined,
          severity: args.severity as 'critical' | 'high' | 'medium' | 'low' | null | undefined,
          cvss_vector_string: args.cvss_vector_string as string | null | undefined,
          start_private_fork: args.start_private_fork === 'true',
        });
        return successResult(data);
      },
    },

    // update_repository_advisory - Update a repository security advisory
    {
      definition: {
        name: 'github_securityAdvisories_update_repository_advisory',
        description: 'Update a repository security advisory',
        inputSchema: {
          type: 'object',
          properties: {
            owner: {
              type: 'string',
              description: 'Repository owner (username or organization)',
            },
            repo: {
              type: 'string',
              description: 'Repository name',
            },
            ghsa_id: {
              type: 'string',
              description: 'The GitHub Security Advisory ID (e.g., GHSA-xxxx-xxxx-xxxx)',
            },
            summary: {
              type: 'string',
              description: 'A short summary of the advisory',
            },
            description: {
              type: 'string',
              description: 'A detailed description of the vulnerability',
            },
            cve_id: {
              type: 'string',
              description: 'The CVE ID if known (e.g., CVE-2021-44228)',
            },
            vulnerabilities: {
              type: 'array',
              items: { type: 'object' },
              description: 'Array of vulnerability objects with package, ecosystem, and vulnerable_version_range',
            },
            cwe_ids: {
              type: 'array',
              items: { type: 'string' },
              description: 'CWE IDs (e.g., ["CWE-79", "CWE-89"])',
            },
            credits: {
              type: 'array',
              items: { type: 'object' },
              description: 'Array of credit objects with login and type',
            },
            severity: {
              type: 'string',
              enum: ['critical', 'high', 'medium', 'low'],
              description: 'Severity level of the vulnerability',
            },
            cvss_vector_string: {
              type: 'string',
              description: 'CVSS vector string (e.g., CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H)',
            },
            state: {
              type: 'string',
              enum: ['published', 'closed', 'draft'],
              description: 'State of the advisory',
            },
            collaborating_users: {
              type: 'array',
              items: { type: 'string' },
              description: 'GitHub usernames of users to collaborate on the advisory',
            },
            collaborating_teams: {
              type: 'array',
              items: { type: 'string' },
              description: 'Team slugs for teams to collaborate on the advisory',
            },
          },
          required: ['owner', 'repo', 'ghsa_id'],
        },
      },
      handler: async (octokit, args) => {
        const { data } = await octokit.securityAdvisories.updateRepositoryAdvisory({
          owner: args.owner as string,
          repo: args.repo as string,
          ghsa_id: args.ghsa_id as string,
          summary: args.summary as string | undefined,
          description: args.description as string | undefined,
          cve_id: args.cve_id as string | null | undefined,
          vulnerabilities: args.vulnerabilities as Array<{
            package: { ecosystem: Ecosystem; name?: string | null };
            vulnerable_version_range?: string | null;
            patched_versions?: string | null;
            vulnerable_functions?: string[] | null;
          }> | undefined,
          cwe_ids: args.cwe_ids as string[] | undefined,
          credits: args.credits as Array<{ login: string; type: CreditType }> | null | undefined,
          severity: args.severity as 'critical' | 'high' | 'medium' | 'low' | null | undefined,
          cvss_vector_string: args.cvss_vector_string as string | null | undefined,
          state: args.state as 'published' | 'closed' | 'draft' | undefined,
          collaborating_users: args.collaborating_users as string[] | null | undefined,
          collaborating_teams: args.collaborating_teams as string[] | null | undefined,
        });
        return successResult(data);
      },
    },
  ],
};
