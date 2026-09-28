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

The domain's isolation is enforced twice: pnpm's strict `node_modules` cannot resolve dependencies the package does not declare, and an ESLint rule rejects AWS, React and cross-package imports inside `packages/domain`.

## Workflow

Branching, commit and release conventions are in [`AGENTS.md`](AGENTS.md).
