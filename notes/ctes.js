export const ctesNotes = {
    category: "CTEs",
    icon: "🔄",
    color: "#14b8a6",
    sections: [
        {
            title: "🧱 CTE Syntax",
            content: `
<div class="note-callout note-info">
  <strong>CTE (Common Table Expression) = temporary named result set.</strong> Makes complex queries readable by breaking them into logical steps.
</div>

<div class="note-code cheat"><span class="code-hl">WITH</span> cte_name <span class="code-hl">AS</span> (
    SELECT ...
    FROM ...
    WHERE ...
)
SELECT * FROM cte_name;</div>

<div class="note-two-col">
  <div class="note-col">
    <h4>Without CTE (nested mess)</h4>
    <div class="note-code">SELECT * FROM (
  SELECT * FROM (
    SELECT dept, AVG(salary)
    FROM employees
    GROUP BY dept
  ) sub1
  WHERE avg > 50000
) sub2;</div>
  </div>
  <div class="note-col">
    <h4>With CTE (clean!)</h4>
    <div class="note-code"><span class="code-hl">WITH</span> dept_avg AS (
  SELECT dept, AVG(salary) avg
  FROM employees
  GROUP BY dept
)
SELECT * FROM dept_avg
WHERE avg > 50000;</div>
  </div>
</div>`
        },
        {
            title: "🔗 Multiple CTEs",
            content: `
<div class="note-callout note-tip">
  <strong>Chain multiple CTEs with commas.</strong> Each can reference the previous ones.
</div>

<div class="note-code"><span class="code-hl">WITH</span>
  dept_stats AS (
    SELECT dept_id, AVG(salary) AS avg_sal, COUNT(*) AS cnt
    FROM employees GROUP BY dept_id
  )<span class="code-hl">,</span>
  big_depts AS (
    SELECT * FROM dept_stats WHERE cnt >= 10
  )
SELECT d.name, b.avg_sal, b.cnt
FROM big_depts b
JOIN departments d ON b.dept_id = d.id;</div>

<div class="note-callout note-danger">
  <strong>⚠️ No semicolons between CTEs!</strong> Use commas to separate them, semicolon only at the very end.
</div>`
        },
        {
            title: "🔄 Recursive CTE",
            content: `
<div class="note-callout note-info">
  <strong>Recursive CTEs iterate — perfect for hierarchies and sequences.</strong>
</div>

<div class="note-code cheat">WITH <span class="code-hl">RECURSIVE</span> cte AS (
  <span class="code-comment">-- Base case (anchor)</span>
  SELECT id, name, manager_id, 1 AS level
  FROM employees WHERE manager_id IS NULL

  <span class="code-hl">UNION ALL</span>

  <span class="code-comment">-- Recursive step</span>
  SELECT e.id, e.name, e.manager_id, c.level + 1
  FROM employees e
  JOIN cte c ON e.manager_id = c.id
)
SELECT * FROM cte;</div>

<div class="note-grid">
<div class="note-card pattern">
  <h4>Generate Numbers 1-10</h4>
  <div class="note-code">WITH RECURSIVE nums AS (
  SELECT <span class="code-hl">1 AS n</span>
  UNION ALL
  SELECT <span class="code-hl">n + 1</span> FROM nums
  WHERE n < 10
)
SELECT n FROM nums;</div>
</div>

<div class="note-card pattern">
  <h4>Org Chart — All Reports (LC 1405)</h4>
  <div class="note-code">WITH RECURSIVE reports AS (
  SELECT id FROM employees
  WHERE manager_id = 1
  UNION ALL
  SELECT e.id FROM employees e
  JOIN reports r ON e.manager_id = r.id
)
SELECT * FROM reports;</div>
</div>
</div>`
        },
        {
            title: "🎯 CTE vs Subquery",
            content: `
<table class="note-table">
  <thead>
    <tr><th>Feature</th><th>CTE</th><th>Subquery</th></tr>
  </thead>
  <tbody>
    <tr><td>Readability</td><td class="code-good">✅ Named, top-down flow</td><td class="code-bad">Nested, harder to read</td></tr>
    <tr><td>Reusability</td><td class="code-good">✅ Reference multiple times</td><td class="code-bad">Must duplicate</td></tr>
    <tr><td>Recursion</td><td class="code-good">✅ RECURSIVE keyword</td><td class="code-bad">Not possible</td></tr>
    <tr><td>Performance</td><td>Same (usually)</td><td>Same (usually)</td></tr>
    <tr><td>When to use</td><td>Complex, multi-step logic</td><td>Simple, one-off checks</td></tr>
  </tbody>
</table>

<div class="note-callout note-tip">
  <strong>💡 Interview tip:</strong> Always prefer CTEs over deeply nested subqueries. It shows clean coding habits.
</div>`
        }
    ]
};
