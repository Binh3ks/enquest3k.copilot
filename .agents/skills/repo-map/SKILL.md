---
name: repo-map
description: Generates or consults the Tree-sitter style AST Repo Map Skeleton (.agents/repo_map.md) to inspect function signatures across 500+ files without loading raw code bodies into context, saving up to 85% tokens.
---

# AST Repo Map & Token Compression Protocol (`repo-map`)

When navigating or searching for functions/components across the codebase:

## Execution Protocol:

1. **Consult AST Repo Map First**:
   - Before reading entire component or service files, inspect `.agents/repo_map.md`.
   - Locate exact line numbers (`L<num>`) and exported signatures (`function`, `const`, `class`).

2. **Re-generate Repo Map on Architecture Changes**:
   - Run `node scripts/build_repo_map.mjs` to refresh signatures whenever new modules or stations are added.

3. **Ignore Non-Essential Monolithic Data**:
   - Respect `.antigravityignore` and `.agentignore`. Do NOT load `dictionary.json` or binary media into context unless specifically targeted.
