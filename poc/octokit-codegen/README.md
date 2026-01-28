# Octokit Tool Generation POC

Proof of concept for exploring Octokit's API surface and generating MCP tools.

## Exploration Scripts

### List All Methods

```typescript
import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

// Get all categories
const categories = Object.keys(octokit).filter(
  key => typeof octokit[key] === 'object' && octokit[key] !== null
);

console.log('Categories:', categories);

// Get methods per category
for (const cat of categories) {
  const methods = Object.keys(octokit[cat]);
  console.log(`${cat}: ${methods.length} methods`);
}
```

### Count Endpoints

```bash
# Using GitHub's OpenAPI spec
curl -s https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/api.github.com.json | \
  jq '.paths | keys | length'
```

## Findings

See [Spike Documentation](../../docs/spikes/003-tool-generation.md) for detailed findings.

### Categories (38 total)

Core categories implemented:
- repos (~80 endpoints)
- issues (~50 endpoints)
- pulls (~40 endpoints)
- users (~30 endpoints)
- actions (~60 endpoints)
- search (~7 endpoints)
- gists (~20 endpoints)
- orgs (~40 endpoints)

### Tool Definition Example

```typescript
const tool = {
  name: 'github_repos_list',
  description: 'List repositories for the authenticated user',
  inputSchema: {
    type: 'object',
    properties: {
      visibility: {
        type: 'string',
        enum: ['all', 'public', 'private'],
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

## Conclusion

Manual tool definitions provide better quality and LLM-friendly descriptions compared to auto-generation from OpenAPI specs.
