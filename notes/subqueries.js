export const subqueriesNotes = {
    category: "Subqueries",
    icon: "🎯",
    color: "#f97316",
    sections: [
        {
            title: "🧱 Types of Subqueries",
            content: `
<div class="note-callout note-info">
  <strong>A subquery is a query nested inside another query.</strong> They can go in WHERE, FROM, or SELECT.
</div>

<div class="note-grid">

<div class="note-card pattern">
  <h4>Scalar Subquery</h4>
  <p class="note-desc">Returns a single value. Used in WHERE or SELECT.</p>
  <div class="note-code">SELECT name FROM employees
WHERE salary > (
  <span class="code-hl">SELECT AVG(salary)</span>
  <span class="code-hl">FROM employees</span>
);</div>
</div>

<div class="note-card pattern">
  <h4>Column Subquery</h4>
  <p class="note-desc">Returns a list. Used with IN, ANY, ALL.</p>
  <div class="note-code">SELECT name FROM employees
WHERE dept_id <span class="code-hl">IN</span> (
  SELECT id FROM departments
  WHERE location = 'NYC'
);</div>
</div>

<div class="note-card pattern">
  <h4>Table Subquery (Derived Table)</h4>
  <p class="note-desc">Returns a full table. Used in FROM with alias.</p>
  <div class="note-code">SELECT dept, avg_sal FROM (
  SELECT dept_id AS dept,
    AVG(salary) AS avg_sal
  FROM employees GROUP BY dept_id
) <span class="code-hl">sub</span>
WHERE avg_sal > 70000;</div>
</div>

<div class="note-card pattern">
  <h4>Correlated Subquery</h4>
  <p class="note-desc">References outer query. Runs once per outer row.</p>
  <div class="note-code">SELECT name FROM employees e
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
  WHERE dept_id = <span class="code-hl">e.dept_id</span>
);</div>
</div>

</div>`
        },
        {
            title: "🎯 Interview Patterns",
            content: `
<div class="note-grid">

<div class="note-card pattern">
  <h4>Above Average (most common!)</h4>
  <div class="note-code">SELECT name, salary
FROM employees
WHERE salary > (
  <span class="code-hl">SELECT AVG(salary)
  FROM employees</span>
);</div>
</div>

<div class="note-card pattern">
  <h4>Second Highest (LeetCode 176)</h4>
  <div class="note-code">SELECT MAX(salary)
  AS SecondHighestSalary
FROM employees
WHERE salary < (
  <span class="code-hl">SELECT MAX(salary)
  FROM employees</span>
);</div>
</div>

<div class="note-card pattern">
  <h4>Department Max Salary (LC 184)</h4>
  <div class="note-code">SELECT d.name, e.name, e.salary
FROM employees e
JOIN departments d
  ON e.dept_id = d.id
WHERE (e.dept_id, e.salary) <span class="code-hl">IN</span> (
  SELECT dept_id, MAX(salary)
  FROM employees GROUP BY dept_id
);</div>
</div>

<div class="note-card pattern">
  <h4>NOT EXISTS Anti-Pattern</h4>
  <div class="note-code"><span class="code-comment">-- Customers with no orders</span>
SELECT name FROM customers c
WHERE <span class="code-hl">NOT EXISTS</span> (
  SELECT 1 FROM orders
  WHERE customer_id = c.id
);</div>
</div>

</div>`
        },
        {
            title: "📌 WHERE to Place Subqueries",
            content: `
<table class="note-table">
  <thead>
    <tr><th>Location</th><th>Use Case</th><th>Example</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>WHERE</strong></td><td>Filter by computed value</td><td><code>WHERE salary > (SELECT AVG...)</code></td></tr>
    <tr><td><strong>FROM</strong></td><td>Derived table / inline view</td><td><code>FROM (SELECT ... GROUP BY) sub</code></td></tr>
    <tr><td><strong>SELECT</strong></td><td>Add computed column</td><td><code>SELECT (SELECT COUNT...) AS cnt</code></td></tr>
    <tr><td><strong>HAVING</strong></td><td>Filter groups by subquery</td><td><code>HAVING COUNT > (SELECT AVG...)</code></td></tr>
  </tbody>
</table>

<div class="note-callout note-tip">
  <strong>💡 Subquery vs JOIN:</strong> If you need data from the subquery table in your output, use a JOIN. If you only need a filter condition, use a subquery.
</div>`
        }
    ]
};
