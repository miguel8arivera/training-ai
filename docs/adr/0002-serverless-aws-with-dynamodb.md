# Serverless on AWS with DynamoDB, and the AI classifier behind a port

The app runs on AWS as serverless infrastructure: API Gateway + Lambda (TypeScript) for the backend, DynamoDB for storage, Cognito for the single-user login, and Claude Haiku 4.5 on Amazon Bedrock for classifying Titles, all defined with AWS CDK in TypeScript. We chose this because there is only one user and a handful of Expenses per day, so pay-per-request pricing keeps the monthly bill near zero, and Bedrock lets Lambda call the model through its IAM role with no API key to store.

## Considered Options

- **Containers (App Runner/ECS) + Postgres on RDS**: more flexible querying, but the database alone costs roughly US$15/month even when idle.
- **Single EC2 instance**: simple, but we would own patching and uptime.
- **Anthropic API directly instead of Bedrock**: same model quality and a negligible price difference at this volume, but requires managing a secret API key.

## Consequences

- DynamoDB tables must be designed around the queries we need (Expenses by month, totals by Category); moving to SQL later means a data migration.
- The classifier is consumed only through an `ExpenseClassifier` port in the domain, so swapping Bedrock for another provider means writing a new adapter, not touching domain code.
