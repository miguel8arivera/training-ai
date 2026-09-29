# Expense Tracker

Personal app for recording purchases made while out and about, to spot Ant Expenses. Domain language lives in `CONTEXT.md`; architecture decisions live in `docs/adr/`.

## Git conventions

Environment branches (GitLab Flow style), promoted in one direction only:

```
feature/* → dev → main → prod
```

- `dev`: integration branch; every ticket branches from and merges back into it through a PR.
- `main`: release candidate; the weekly release (Fridays only) merges `dev` into `main` through a PR and tags it (`vX.Y.Z`).
- `prod`: what is deployed; promoted from a tagged `main` through a `main → prod` PR on release day only, never committed to directly.
- `dev`, `main` and `prod` are protected by a GitHub ruleset: no direct pushes, force pushes or deletions; every change arrives through a PR whose CI check ("Lint, typecheck and test") is green.
- Hotfixes branch from `main`, then merge into `main` and `dev`, and are promoted to `prod`.
- Branch every ticket from `dev`; merge back to `dev` through a PR.
- Branch name: `<type>/<JIRA-KEY>-<short-kebab-description>`, using the exact Jira key (no zero-padding), e.g. `feature/TIA-1-implement-login`, `fix/TIA-12-ant-expense-threshold`, `chore/TIA-7-setup-dynamodb-table`.
- `<type>` is one of `feature`, `fix`, `chore`, `refactor`, `docs`, `test`.
- Commits follow Conventional Commits and reference the Jira key, e.g. `feat(expenses): record expense [TIA-1]`.

## Agent skills

### Issue tracker

Issues are tracked in Jira project `TIA` via the Atlassian MCP. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
