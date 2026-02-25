export const windowFunctionsNotes = {
    category: "Window Functions",
    icon: "🪟",
    color: "#06b6d4",
    sections: [
        {
            title: "🧱 What Are Window Functions?",
            content: `
<div class="note-callout note-info">
  <strong>Window functions perform calculations across a set of rows related to the current row — WITHOUT collapsing them like GROUP BY.</strong>
</div>

<div class="note-two-col">
  <div class="note-col">
    <h4>GROUP BY</h4>
    <div class="note-code"><span class="code-comment">-- Collapses to 1 row per group</span>
SELECT dept, AVG(salary)
FROM employees
GROUP BY dept;

<span class="code-comment">-- Result: 3 rows (3 depts)</span></div>
  </div>
  <div class="note-col">
    <h4>Window Function</h4>
    <div class="note-code"><span class="code-comment">-- Keeps ALL rows + adds aggregate</span>
SELECT name, dept, salary,
  AVG(salary) <span class="code-hl">OVER</span> (
    PARTITION BY dept
  ) AS dept_avg
FROM employees;
<span class="code-comment">-- Result: ALL rows with dept avg</span></div>
  </div>
</div>

<div class="note-code cheat"><span class="code-hl">FUNCTION</span>() OVER (
  <span class="code-hl">PARTITION BY</span> col      <span class="code-comment">-- optional: group rows</span>
  <span class="code-hl">ORDER BY</span> col           <span class="code-comment">-- optional: sort within partition</span>
)</div>`
        },
        {
            title: "📊 Ranking Functions",
            content: `
<table class="note-table">
  <thead>
    <tr><th>Function</th><th>Ties?</th><th>Example: [100, 90, 90, 80]</th></tr>
  </thead>
  <tbody>
    <tr><td><code>ROW_NUMBER()</code></td><td>No ties — always unique</td><td>1, 2, 3, 4</td></tr>
    <tr><td><code>RANK()</code></td><td>Ties share rank, skips next</td><td>1, 2, 2, <span class="code-hl">4</span></td></tr>
    <tr><td><code>DENSE_RANK()</code></td><td>Ties share rank, no skip</td><td>1, 2, 2, <span class="code-hl">3</span></td></tr>
  </tbody>
</table>

<div class="note-code">SELECT name, salary,
  <span class="code-hl">ROW_NUMBER</span>() OVER (ORDER BY salary DESC) AS rn,
  <span class="code-hl">RANK</span>()       OVER (ORDER BY salary DESC) AS rnk,
  <span class="code-hl">DENSE_RANK</span>() OVER (ORDER BY salary DESC) AS dr
FROM employees;</div>

<div class="note-callout note-tip">
  <strong>💡 When to use which?</strong><br>
  • <code>ROW_NUMBER</code> — pagination, pick exactly 1 per group<br>
  • <code>RANK</code> — include ties, skip numbers (tournament ranking)<br>
  • <code>DENSE_RANK</code> — include ties, no gaps (Nth highest salary)
</div>`
        },
        {
            title: "🎯 Top-N per Group",
            content: `
<div class="note-callout note-danger">
  <strong>This is the #1 most-asked window function pattern!</strong>
</div>

<h4>Pattern: Top N per Group</h4>
<div class="note-code"><span class="code-comment">-- Top 3 salaries per department</span>
SELECT * FROM (
  SELECT name, dept, salary,
    <span class="code-hl">ROW_NUMBER() OVER (
      PARTITION BY dept
      ORDER BY salary DESC
    )</span> AS rn
  FROM employees
) sub
WHERE <span class="code-hl">rn <= 3</span>;</div>

<div class="note-callout note-tip">
  <strong>💡 Use RANK() if you want ties included:</strong>
</div>
<div class="note-code"><span class="code-comment">-- Highest salary per dept (including all ties)</span>
... <span class="code-hl">RANK()</span> OVER (PARTITION BY dept ORDER BY salary DESC) AS rnk
WHERE rnk = 1;  <span class="code-comment">-- keeps ALL employees tied for #1</span></div>`
        },
        {
            title: "📏 LAG & LEAD",
            content: `
<div class="note-callout note-info">
  <strong>LAG looks at the PREVIOUS row. LEAD looks at the NEXT row.</strong>
</div>

<div class="note-two-col">
  <div class="note-col">
    <h4>LAG — Previous row</h4>
    <div class="note-code">SELECT date, temp,
  <span class="code-hl">LAG</span>(temp) OVER (
    ORDER BY date
  ) AS prev_temp
FROM weather;</div>
  </div>
  <div class="note-col">
    <h4>LEAD — Next row</h4>
    <div class="note-code">SELECT date, temp,
  <span class="code-hl">LEAD</span>(temp) OVER (
    ORDER BY date
  ) AS next_temp
FROM weather;</div>
  </div>
</div>

<div class="note-code"><span class="code-comment">-- With default value and offset</span>
LAG(col, <span class="code-hl">2</span>, <span class="code-hl">0</span>) OVER (ORDER BY date)
<span class="code-comment">--     offset=2  default=0 (if no prev row)</span></div>

<div class="note-callout note-tip">
  <strong>🎯 LC 197: Rising Temperature Pattern</strong>
</div>
<div class="note-code">SELECT id FROM (
  SELECT id, temp,
    <span class="code-hl">LAG(temp)</span> OVER (ORDER BY date) AS prev
  FROM weather
) WHERE temp > prev;</div>`
        },
        {
            title: "📊 Running Totals & Averages",
            content: `
<div class="note-grid">

<div class="note-card pattern">
  <h4>Running Total</h4>
  <div class="note-code">SELECT date, amount,
  <span class="code-hl">SUM(amount) OVER (
    ORDER BY date
  )</span> AS running_total
FROM orders;</div>
</div>

<div class="note-card pattern">
  <h4>Running Average</h4>
  <div class="note-code">SELECT date, amount,
  <span class="code-hl">AVG(amount) OVER (
    ORDER BY date
  )</span> AS running_avg
FROM orders;</div>
</div>

<div class="note-card pattern">
  <h4>Running Total per Group</h4>
  <div class="note-code">SELECT player, date, games,
  SUM(games) OVER (
    <span class="code-hl">PARTITION BY player</span>
    ORDER BY date
  ) AS cumulative
FROM game_play;</div>
</div>

<div class="note-card pattern">
  <h4>Moving Average (3-day)</h4>
  <div class="note-code">SELECT date, amount,
  AVG(amount) OVER (
    ORDER BY date
    <span class="code-hl">ROWS BETWEEN 2 PRECEDING
    AND CURRENT ROW</span>
  ) AS moving_avg_3
FROM orders;</div>
</div>

</div>`
        },
        {
            title: "📝 Cheat Sheet",
            content: `
<div class="note-code cheat"><span class="code-comment">-- Ranking</span>
ROW_NUMBER() OVER (PARTITION BY g ORDER BY s)
RANK()       OVER (PARTITION BY g ORDER BY s)
DENSE_RANK() OVER (ORDER BY s DESC)

<span class="code-comment">-- Navigation</span>
LAG(col, offset, default)  OVER (ORDER BY col)
LEAD(col, offset, default) OVER (ORDER BY col)
FIRST_VALUE(col)           OVER (ORDER BY col)
LAST_VALUE(col)            OVER (ORDER BY col)

<span class="code-comment">-- Aggregation as window</span>
SUM(col)   OVER (PARTITION BY g ORDER BY s)
AVG(col)   OVER (PARTITION BY g)
COUNT(col) OVER (PARTITION BY g)
MAX(col)   OVER (PARTITION BY g)
MIN(col)   OVER (PARTITION BY g)</div>

<table class="note-table">
  <thead>
    <tr><th>Pattern</th><th>Use</th></tr>
  </thead>
  <tbody>
    <tr><td><code>PARTITION BY</code></td><td>Group rows for the window (like GROUP BY but keeps all rows)</td></tr>
    <tr><td><code>ORDER BY</code></td><td>Sort within partition</td></tr>
    <tr><td><code>ROWS BETWEEN ... AND ...</code></td><td>Define frame (sliding window)</td></tr>
  </tbody>
</table>`
        }
    ]
};
