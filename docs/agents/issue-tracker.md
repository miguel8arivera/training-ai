# Issue tracker: Jira

Issues for this repo live in Jira Cloud, project key `TIA` ("training-ai"),
accessed via the Atlassian MCP server. Resolve the site's `cloudId` at runtime
with `getAccessibleAtlassianResources`; never hard-code it in the repo.

## Conventions

- **Spec** (`/to-spec`): create one issue of type **Epic** in `TIA`.
- **Tickets** (`/to-tickets`): create one **Story** per ticket, with `parent` set
  to the spec's Epic. Publish in dependency order (blockers first).
- **Blocking edges**: use Jira's native "is blocked by" issue link, and also list
  the blockers under "Blocked by" in the description.
- **Triage state**: applied as a Jira label (e.g. `ready-for-agent`).
- **Reading**: `getJiraIssue` for one issue; `searchJiraIssuesUsingJql` for many.
  Always scope JQL (e.g. `project = TIA`); unbounded queries are rejected.
