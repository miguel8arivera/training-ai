# Expense Tracker

A personal app for recording purchases made while out and about (starting with trips to a shopping mall), so the owner can spot Ant Expenses and plan how to save.

## Language

### Recording

**Expense**:
A single purchase the user records, made up of a Title, an Amount, a Subcategory, a Motive, a Necessity and the moment (date and time, Lima time) it was recorded.
_Avoid_: Purchase, spending, gasto

**Title**:
The short text the user types saying what they bought and where, such as "popcorn at Cineplanet"; a Title too vague to classify, such as "stuff", is rejected.
_Avoid_: Description, name, concept, note

**Amount**:
How much money an Expense cost, always in Peruvian soles (PEN).
_Avoid_: Price, total, monto

**Voided Expense**:
An Expense marked as a mistake (for example, saved twice); it stays visible but no longer counts toward any total. Expenses are voided, never deleted.
_Avoid_: Deleted, removed, cancelled

**Closed Month**:
A calendar month (Lima time) that has ended; its Expenses can no longer be edited or voided.
_Avoid_: Archived month, locked period

### Classification

**Category**:
The top-level kind of product an Expense was, from a fixed list defined by the project; a popcorn combo is Food wherever it was bought.
_Avoid_: Section, folder, tag

**Subcategory**:
A finer kind of product within a Category; every Expense belongs to exactly one.
_Avoid_: Product, type, layer

**Motive**:
The occasion an Expense was made for, from a fixed list; independent of the Category.
_Avoid_: Reason, purpose, context

**Necessity**:
Whether an Expense was necessary or unnecessary, decided by default from its Motive (Daily necessity and Commute are necessary; the rest are not) and correctable by the user.
_Avoid_: Priority, essential, need

#### Categories and Subcategories

- **Food**: Meals, Snacks, Drinks, Desserts
- **Clothing**: Clothes, Footwear, Accessories
- **Transport**: Taxi/app, Public transport, Parking
- **Leisure**: Cinema tickets, Games, Events

#### Motives

Entertainment, Dining out, Shopping, Daily necessity, Commute

### Analysis

**Ant Expense**:
An unnecessary Expense of S/ 20 or less whose Subcategory repeats at least 3 times within 30 days, such as a S/ 7 soda bought on every outing.
_Avoid_: Small expense, gasto hormiga

**Outing**:
A trip out, such as an afternoon at the mall, that groups the Expenses made during it.
_Avoid_: Trip, visit, salida
