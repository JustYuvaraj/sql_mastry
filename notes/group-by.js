export const groupByNotes = {
    category: "GROUP BY & HAVING",
    icon: "📊",
    color: "#8b5cf6",
    sections: [
        {
            title: "🧱 GROUP BY Syntax",
            content: `
<div class="note-callout note-info">
  <strong>GROUP BY collapses rows into groups.</strong> Every non-aggregated column in SELECT must be in GROUP BY.
</div>

<div class="note-code cheat">SELECT column, <span class="code-hl">AGG_FUNC</span>(column2)
FROM table
WHERE row_filter
<span class="code-hl">GROUP BY</span> column
<span class="code-hl">HAVING</span> group_filter
ORDER BY column;</div>

<div class="note-two-col">
  <div class="note-col">
    <h4>WHERE vs HAVING</h4>
    <div class="note-code"><span class="code-hl">WHERE</span>  → filters <strong>rows</strong> BEFORE grouping
<span class="code-hl">HAVING</span> → filters <strong>groups</strong> AFTER grouping</div>
  </div>
  <div class="note-col">
    <h4>Execution Order</h4>
    <div class="note-code">1. FROM
2. <span class="code-hl">WHERE</span>   ← filter rows
3. <span class="code-hl">GROUP BY</span> ← group
4. <span class="code-hl">HAVING</span>  ← filter groups
5. SELECT</div>
  </div>
</div>`
        },
        {
            title: "📊 Aggregate Functions",
            content: `
<table class="note-table">
  <thead>
    <tr><th>Function</th><th>Does</th><th>NULL handling</th></tr>
  </thead>
  <tbody>
    <tr><td><code>COUNT(*)</code></td><td>Count all rows</td><td>Includes NULLs ✅</td></tr>
    <tr><td><code>COUNT(col)</code></td><td>Count non-NULL values</td><td>Skips NULLs ⚠️</td></tr>
    <tr><td><code>COUNT(DISTINCT col)</code></td><td>Count unique values</td><td>Skips NULLs</td></tr>
    <tr><td><code>SUM(col)</code></td><td>Total</td><td>Skips NULLs</td></tr>
    <tr><td><code>AVG(col)</code></td><td>Average</td><td>Skips NULLs ⚠️</td></tr>
    <tr><td><code>MIN(col)</code></td><td>Smallest value</td><td>Skips NULLs</td></tr>
    <tr><td><code>MAX(col)</code></td><td>Largest value</td><td>Skips NULLs</td></tr>
  </tbody>
</table>

<div class="note-callout note-danger">
  <strong>⚠️ AVG skips NULLs!</strong><br>
  AVG of [100, NULL, 200] = <strong>150</strong> (not 100). If you want NULLs treated as 0:
</div>
<div class="note-code">AVG(<span class="code-hl">COALESCE</span>(salary, 0))  <span class="code-comment">-- treats NULL as 0</span></div>`
        },
        {
            title: "🎯 HAVING Patterns",
            content: `
<div class="note-grid">

<div class="note-card pattern">
  <h4>Find Duplicates (LeetCode 182)</h4>
  <div class="note-code">SELECT email
FROM employees
GROUP BY email
<span class="code-hl">HAVING COUNT(*) > 1</span>;</div>
</div>

<div class="note-card pattern">
  <h4>Groups with Min Count</h4>
  <div class="note-code">SELECT dept, COUNT(*)
FROM employees
GROUP BY dept
<span class="code-hl">HAVING COUNT(*) >= 5</span>;</div>
</div>

<div class="note-card pattern">
  <h4>Groups Above Avg Salary</h4>
  <div class="note-code">SELECT dept, AVG(salary)
FROM employees
GROUP BY dept
<span class="code-hl">HAVING AVG(salary) > 70000</span>;</div>
</div>

<div class="note-card pattern">
  <h4>Cooperated 3+ Times (LC 1136)</h4>
  <div class="note-code">SELECT actor_id, director_id
FROM actors_directors
GROUP BY actor_id, director_id
<span class="code-hl">HAVING COUNT(*) >= 3</span>;</div>
</div>

</div>

<div class="note-callout note-tip">
  <strong>💡 Rule of thumb:</strong><br>
  • Filter on a <strong>column value</strong>? Use <code>WHERE</code><br>
  • Filter on an <strong>aggregate result</strong>? Use <code>HAVING</code>
</div>`
        },
        {
            title: "🔢 GROUP BY Multi-Column",
            content: `
<h4>Single Column Grouping</h4>
<div class="note-code">SELECT department, COUNT(*) AS cnt
FROM employees
GROUP BY <span class="code-hl">department</span>;</div>

<h4 style="margin-top:20px;">Multi-Column Grouping</h4>
<div class="note-code"><span class="code-comment">-- Each unique (department, job_title) pair is one group</span>
SELECT department, job_title, COUNT(*)
FROM employees
GROUP BY <span class="code-hl">department, job_title</span>;</div>

<h4 style="margin-top:20px;">GROUP BY with Expression</h4>
<div class="note-code"><span class="code-comment">-- Group by year of hire</span>
SELECT <span class="code-hl">strftime('%Y', hire_date)</span> AS year,
       COUNT(*) AS hires
FROM employees
GROUP BY <span class="code-hl">strftime('%Y', hire_date)</span>;</div>

<div class="note-callout note-danger">
  <strong>⚠️ Every non-aggregated SELECT column MUST be in GROUP BY!</strong>
</div>
<div class="note-code"><span class="code-bad">-- ❌ name is not in GROUP BY</span>
SELECT department, name, COUNT(*) FROM employees GROUP BY department;

<span class="code-good">-- ✅ All non-aggregated columns in GROUP BY</span>
SELECT department, COUNT(*), MAX(salary) FROM employees GROUP BY department;</div>`
        },
        {
            title: "🚫 Common Mistakes",
            content: `
<table class="note-table mistakes">
  <thead>
    <tr><th>#</th><th>❌ Wrong</th><th>✅ Right</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td><code>WHERE COUNT(*) > 5</code></td><td><code>HAVING COUNT(*) > 5</code></td></tr>
    <tr><td>2</td><td>SELECT col not in GROUP BY</td><td>Either add to GROUP BY or aggregate it</td></tr>
    <tr><td>3</td><td>Using AVG with NULLs blindly</td><td>Use <code>COALESCE(col, 0)</code></td></tr>
    <tr><td>4</td><td>Forgetting COUNT(DISTINCT)</td><td>Use when you need unique counts</td></tr>
    <tr><td>5</td><td>GROUP BY + ORDER BY confusion</td><td>GROUP BY groups, ORDER BY sorts the output</td></tr>
  </tbody>
</table>`
        }
    ]
};
