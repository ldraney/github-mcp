# Spike 003: Tool Generation from Octokit

## Objective

Explore approaches for generating MCP tools from Octokit's 800+ GitHub API endpoints, balancing completeness with maintainability.

## Questions to Answer

1. How many endpoints does Octokit expose?
2. Can we auto-generate tool definitions?
3. How should tools be organized?
4. How do we handle the volume for LLM context limits?

## Findings

### Octokit Endpoint Count

Octokit REST organizes endpoints into 38 categories:

| Category | Endpoints | Priority |
|----------|-----------|----------|
| repos | ~80 | High |
| issues | ~50 | High |
| pulls | ~40 | High |
| users | ~30 | High |
| actions | ~60 | Medium |
| search | ~7 | High |
| gists | ~20 | Medium |
| orgs | ~40 | Medium |
| teams | ~30 | Medium |
| git | ~20 | Low |
| checks | ~15 | Medium |
| packages | ~15 | Low |
| ... | ... | ... |

Total: ~800+ endpoints

### Tool Naming Convention

Adopted pattern: `github_<category>_<method>`

Examples:
- `github_repos_list`
- `github_repos_get`
- `github_issues_create`
- `github_pulls_merge`
- `github_search_repos`

Benefits:
- Matches Octokit structure
- Predictable for LLMs
- Easy to filter by category

### Tool Definition Structure

```typescript
const tool: Tool = {
  name: 'github_repos_list',
  description: 'List repositories for the authenticated user',
  inputSchema: {
    type: 'object',
    properties: {
      visibility: {
        type: 'string',
        enum: ['all', 'public', 'private'],
        description: 'Filter by visibility',
      },
      sort: {
        type: 'string',
        enum: ['created', 'updated', 'pushed', 'full_name'],
      },
      per_page: { type: 'number' },
      page: { type: 'number' },
    },
  },
};
```

### Generation Approaches Evaluated

#### 1. Manual Definition (Chosen)

Pros:
- Full control over descriptions
- Can optimize for LLM understanding
- Can prioritize common operations

Cons:
- More initial work
- Requires updates with API changes

#### 2. OpenAPI Spec Generation

GitHub publishes OpenAPI specs. Could parse and generate tools.

Pros:
- Automatic coverage
- Always up-to-date

Cons:
- Generic descriptions
- No prioritization
- Includes deprecated/internal endpoints

#### 3. Octokit Types Extraction

Parse `@octokit/types` TypeScript definitions.

Pros:
- Matches Octokit exactly
- Type-safe

Cons:
- Complex parsing
- Missing descriptions

### Chosen Approach: Category-Based Manual + Lazy Loading

1. **Manual tool definitions by category** - Quality over quantity
2. **Lazy loading by category** - Don't overwhelm LLM
3. **Start with core categories** - repos, issues, pulls, users, search
4. **Add categories incrementally** - Based on usage

### Category Organization

```
src/tools/
├── generator.ts          # Registration and routing
└── categories/
    ├── repos.ts          # Repository operations
    ├── issues.ts         # Issue operations
    ├── pulls.ts          # Pull request operations
    ├── users.ts          # User operations
    ├── actions.ts        # GitHub Actions
    ├── gists.ts          # Gist operations
    ├── orgs.ts           # Organization operations
    ├── search.ts         # Search operations
    └── ... (more as needed)
```

### Lazy Loading Strategy

```typescript
// Only load requested categories
registerTools(octokit, ['repos', 'issues', 'pulls']);

// Or load all (default)
registerTools(octokit);
```

CLI support:
```bash
github-mcp --categories repos,issues,pulls
```

### Tool Handler Pattern

Each category exports:
1. Tool definitions array
2. Handler function

```typescript
// categories/repos.ts
export const reposTools: Tool[] = [...];

export async function handleReposTool(
  octokit: Octokit,
  args: Record<string, unknown>
): Promise<unknown> {
  // Route to appropriate Octokit method based on args
}
```

### Argument-Based Routing

Since tool names don't reach the handler directly, we route based on arguments:

```typescript
async function handleReposTool(octokit, args) {
  // Create operation
  if ('name' in args && !('owner' in args)) {
    return octokit.repos.createForAuthenticatedUser(args);
  }

  // Get specific repo
  if ('owner' in args && 'repo' in args) {
    return octokit.repos.get(args);
  }

  // List for authenticated user
  return octokit.repos.listForAuthenticatedUser(args);
}
```

### LLM Context Considerations

With ~100 tools, definitions are ~50KB of JSON.

Mitigation:
1. Lazy load categories
2. Concise descriptions
3. Default to common categories only
4. Allow category filtering

## POC Code

See `poc/octokit-codegen/` for experiments.

```typescript
// Example: List all Octokit methods
import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

// Repos category
console.log(Object.keys(octokit.repos));
// ['addAppAccessRestrictions', 'addCollaborator', ...]
```

## Recommendations

1. **Start with 8 core categories** (~150 tools)
2. **Use manual definitions** for quality
3. **Support category filtering** via CLI
4. **Add categories based on demand**
5. **Keep descriptions LLM-friendly**

## Phase 1 Categories (Core)

- repos (20 tools)
- issues (17 tools)
- pulls (15 tools)
- users (16 tools)
- actions (20 tools)
- gists (17 tools)
- orgs (22 tools)
- search (7 tools)

Total: ~134 tools

## Future Categories

- git
- checks
- deployments
- packages
- codespaces
- copilot
- dependabot
- projects
- reactions
- releases (beyond basic)
- secrets
- security
- webhooks (management)

## Success Criteria

- [x] Clear naming convention established
- [x] Category-based organization works
- [x] Lazy loading implemented
- [x] Handler routing works
- [x] ~150 core tools defined

## Time Spent

~6 hours

## Next Steps

1. Implement remaining core categories
2. Test with Claude Desktop
3. Add category filtering CLI
4. Document tool usage examples
