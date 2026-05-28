# Super Lotto Checker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-file HTML app that stores five Super Lotto number sets locally, fetches official draw data from a configured third-party API, calculates prize grades, and summarizes winnings and spend.

**Architecture:** One `index.html` contains markup, CSS, and JavaScript. Local storage persists ticket sets, API configuration, query history, and spending settings. A small adapter layer normalizes different API response shapes into `{ issue, front, back, date }`.

**Tech Stack:** HTML, CSS, browser JavaScript, `fetch`, `localStorage`.

---

### Task 1: Create Single-File App Shell

**Files:**
- Create: `index.html`

- [ ] **Step 1: Add the HTML document**

Create a full document with sections for saved tickets, API settings, query controls, summary cards, result table, and usage notes.

- [ ] **Step 2: Add responsive CSS**

Use a restrained dashboard layout with dense controls, clear table states, and mobile-friendly stacking.

- [ ] **Step 3: Add default state initialization**

Define `DEFAULT_TICKETS`, `DEFAULT_PRIZE_TABLE`, and local storage keys in JavaScript.

### Task 2: Implement Number and Prize Logic

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add validators**

Implement front-zone validation for five unique numbers from 1-35 and back-zone validation for two unique numbers from 1-12.

- [ ] **Step 2: Add prize grading**

Implement Super Lotto grades 1-9 by matched front/back counts:

```text
1: 5+2
2: 5+1
3: 5+0
4: 4+2
5: 4+1 or 3+2
6: 4+0 or 3+1 or 2+2
7: 3+0 or 2+1 or 1+2 or 0+2
8: 2+0 or 1+1 or 0+1
9: 1+0 or 0+0 is not a prize; instead use official大乐透 rule: 9th is 1+2, 2+1, 0+2. Adjust lower fixed-grade mapping so non-prizes remain zero.
```

Final mapping in code must use common current fixed-prize rules:

```text
1: 5+2
2: 5+1
3: 5+0
4: 4+2
5: 4+1 or 3+2
6: 4+0 or 3+1 or 2+2
7: 3+0
8: 2+1 or 1+2 or 3+? no, only valid official fixed lower grade is 2+1 or 1+2
9: 2+0 or 1+1 or 0+2
```

- [ ] **Step 3: Add spending calculation**

Calculate spend as number of ticket groups times stake per group per issue, defaulting to 2 yuan per group.

### Task 3: Implement API Adapter

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Store API configuration**

Persist API URL template, API key, HTTP method, and response path hints.

- [ ] **Step 2: Build request URL**

Support placeholders `{issue}` and `{key}` in the API URL template.

- [ ] **Step 3: Normalize response**

Read common fields including `issue`, `lotteryDrawNum`, `lottery_no`, `code`, `red`, `blue`, `openCode`, `numbers`, `date`, and `lotteryDrawTime`.

- [ ] **Step 4: Handle failures**

Show user-facing errors for missing config, network failure, non-JSON response, missing draw numbers, or invalid draw numbers.

### Task 4: Implement Query Flows and UI

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Save ticket edits**

Render five ticket rows, allow edits, validate, and save to local storage.

- [ ] **Step 2: Fetch by issue list**

Allow entering comma/newline-separated issue numbers and fetch them sequentially.

- [ ] **Step 3: Filter by week/month/all history**

Use stored fetched draw history to summarize this week, this month, or all fetched records. API-only operation cannot discover all historical issues without an API endpoint for lists, so history mode uses previously fetched API records.

- [ ] **Step 4: Render summary and table**

Show total prizes, total spend, net result, winning row count, and per-ticket match details.

### Task 5: Verify

**Files:**
- Read: `index.html`

- [ ] **Step 1: Validate file exists**

Run `Get-ChildItem -LiteralPath index.html`.

- [ ] **Step 2: Smoke-check syntax**

Search for required functions and sections using `Select-String`.

- [ ] **Step 3: Verify prize logic manually**

Confirm code maps `5+2` to grade 1 and `0+2` to grade 9.

