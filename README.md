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

Auto-merge is enabled for the repo. Queue a PR to merge by itself as soon as its checks are green:

```sh
gh pr merge <number> --auto --merge
```

If a check fails, the PR stays open. Push a fix and it merges once the check passes.
