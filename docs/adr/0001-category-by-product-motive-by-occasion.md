# Category is classified by product; the occasion lives in a separate Motive

An Expense is classified on two independent axes: its Category (and Subcategory) describes what was bought, while its Motive describes the occasion it was bought for. A popcorn combo at the cinema is therefore Food → Snacks with Motive "Entertainment", not Category "Entertainment". We chose this over classifying by occasion alone because detecting Ant Expenses needs to group repeated purchases of the same kind of product regardless of where they happened, while whether an Expense was necessary depends on the occasion; a single occasion-based Category could not serve both.

## Considered Options

- **Category by occasion** (popcorn at the cinema → Entertainment): rejected because the same product would land in different Categories depending on context, which breaks "same kind of product" grouping for Ant Expenses.
- **Category by product only, no Motive**: rejected because necessity cannot be judged from the product alone (a meal can be a daily necessity or a treat).

## Consequences

- Necessity is decided by a rule table keyed on Category + Motive, not by either one alone.
- The AI must infer both a Subcategory and a Motive from the Title, so Titles need enough context (e.g. "popcorn at Cineplanet").
