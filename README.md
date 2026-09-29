# Expense Tracker

Personal app for recording purchases made while out and about, to spot Ant Expenses. Domain language lives in [`CONTEXT.md`](CONTEXT.md); architecture decisions live in [`docs/adr/`](docs/adr/).

## Requirements

- Node.js 24+
- pnpm 12 (`brew install pnpm`)

## Getting started

```sh
pnpm install     # install every workspace package
pnpm test        # run all Vitest suites
pnpm lint        # run ESLint across the repo
pnpm typecheck   # type-check every package
```

## Workspace layout

| Package | Purpose |
|---|---|
| `packages/domain` | Pure domain: Expense rules, use cases and ports. Must not import AWS, React or other packages. |
| `packages/api` | Lambda handlers and AWS adapters (DynamoDB, Bedrock) that implement the domain ports. |
| `packages/web` | Vite + React SPA. |
| `packages/infra` | AWS CDK app that defines the whole stack. |

### Keeping the domain pure

Two rules keep `packages/domain` free of infrastructure:

1. **Where dependencies are installed.** AWS SDKs belong to `packages/api`, React to `packages/web` and CDK to `packages/infra`, never to the root `package.json`. pnpm does not hoist a package's dependencies to the root, so the domain cannot resolve them. Anything installed at the root *is* visible to every package, so the root holds only repo-wide tooling (ESLint, TypeScript).
2. **Lint.** An ESLint rule rejects Node built-ins, AWS, React, cross-package and dynamic imports inside `packages/domain`.

Each package declares the tools it runs (`vitest`, `typescript`).

## Workflow

Branching, commit and release conventions are in [`AGENTS.md`](AGENTS.md).

### Continuous integration

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every pull request to `dev`, `main` or `prod`, and on every push to `dev`. It installs dependencies exactly as locked, then runs `pnpm lint`, `pnpm typecheck` and `pnpm test`. Node comes from [`.nvmrc`](.nvmrc) and pnpm from `packageManager` in `package.json`, so CI and local machines use the same versions.

### Branch rules

A GitHub ruleset (**Settings → Rules → Rulesets**) protects `dev`, `main` and `prod`:

- no direct pushes, force pushes or deletions;
- every change arrives through a pull request;
- the **Lint, typecheck and test** check must pass before merging.

### Merging a pull request

Merging is always a manual decision by the repo owner. CI automates the checks, not the decision.

1. Open the PR and wait for **Lint, typecheck and test** to turn green.
2. Read the diff (**Files changed**).
3. Click **Merge** yourself.

GitHub does not let authors approve their own PRs, so on this single-owner repo the required approvals are 0 and the manual merge click is the approval. Auto-merge (`gh pr merge --auto`) is enabled in the repo settings, but it is not part of this workflow; agents must never merge PRs or queue auto-merge.
