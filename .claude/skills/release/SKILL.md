---
name: release
description: Create a new GitHub MCP release with proper .mcpb bundle. Use when the user wants to cut a release, publish a new version, or update the mcpb bundle.
disable-model-invocation: true
argument-hint: [version-bump: patch|minor|major]
allowed-tools: Read, Bash(npm *), Bash(git *), Bash(gh *)
---

# Release Process for GitHub MCP

Create a release with a proper `.mcpb` bundle for Claude Desktop.

## Context

- The `.mcpb` format is a zip archive created by `mcpb pack` (from `@anthropic-ai/mcpb`)
- `manifest.json` defines the bundle metadata and defaults to `--preset core` (~109 tools)
- `.mcpbignore` controls what's excluded from the bundle
- The release workflow (`.github/workflows/release.yml`) handles CI builds automatically

## Steps

### 1. Determine version bump

Use `$ARGUMENTS` or default to `patch`. Valid: `patch`, `minor`, `major`.

### 2. Create release branch

```bash
gh issue create --title "Release v<new-version>" --body "Version bump for release."
git checkout -b <issue-num>-release-v<new-version>
```

### 3. Bump version

```bash
npm version <patch|minor|major> --no-git-tag-version
```

This updates `package.json` and `package-lock.json`.

### 4. Commit, push, PR, merge

```bash
git add package.json package-lock.json
git commit -m "chore: bump version to <new-version> (#<issue>)"
git push -u origin <branch>
gh pr create --title "chore: release v<new-version>" --body "Closes #<issue>"
gh pr merge <pr-num> --squash --delete-branch
```

### 5. Tag and push

```bash
git checkout main && git pull
git tag v<new-version>
git push origin v<new-version>
```

This triggers `.github/workflows/release.yml` which:
1. `npm ci` - install all deps
2. `npm run build` - compile TypeScript
3. `npm install -g @anthropic-ai/mcpb` - install bundle CLI
4. Updates `manifest.json` version from tag
5. `mcpb pack` - creates `github-mcp.mcpb`
6. Creates GitHub release with the `.mcpb` asset
7. `npm publish` - publishes to npm

### 6. Verify

```bash
gh run list --limit 1
gh run watch <run-id> --exit-status
gh release view v<new-version> --json assets
```

Confirm the release has `github-mcp.mcpb` as an asset.

## Important Notes

- The manifest.json hardcodes `--preset core` - the .mcpb only loads core tools (~109)
- `.mcpbignore` excludes src/, docs/, .git/, etc. from the bundle
- `npm ci --omit=dev` is NOT yet in the workflow - bundle is bloated (~23MB vs ideal ~3MB). See issue #66.
- Do NOT create tar.gz or zip archives - .mcpb is the only distribution format
