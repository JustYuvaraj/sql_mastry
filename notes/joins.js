export const joinsNotes = {
    category: "JOINs",
    icon: "🔗",
    color: "#ec4899",
    sections: [
        {
            title: "🧱 JOIN Types Visual",
            content: `
<div class="note-callout note-info">
  <strong>JOINs combine rows from two or more tables based on a related column.</strong>
</div>

<div class="note-grid">

<div class="note-card pattern">
  <h4>INNER JOIN</h4>
  <p class="note-desc">Only matching rows from BOTH tables. Most common.</p>
  <div class="note-code">SELECT * FROM A
<span class="code-hl">INNER JOIN</span> B ON A.id = B.a_id;</div>
</div>

<div class="note-card pattern">
  <h4>LEFT JOIN</h4>
  <p class="note-desc">ALL rows from left + matching from right. NULLs if no match.</p>
  <div class="note-code">SELECT * FROM A
<span class="code-hl">LEFT JOIN</span> B ON A.id = B.a_id;</div>
</div>

<div class="note-card pattern">
  <h4>RIGHT JOIN</h4>
  <p class="note-desc">ALL rows from right + matching from left. (SQLite: not supported, swap tables)</p>
  <div class="note-code"><span class="code-comment">-- SQLite workaround:</span>
SELECT * FROM B
<span class="code-hl">LEFT JOIN</span> A ON A.id = B.a_id;</div>
</div>

<div class="note-card pattern">
  <h4>CROSS JOIN</h4>
  <p class="note-desc">Every row × every row. Cartesian product. Rarely used.</p>
  <div class="note-code">SELECT * FROM A
<span class="code-hl">CROSS JOIN</span> B;
<span class="code-comment">-- rows = A_count × B_count</span></div>
</div>

<div class="note-card pattern">
  <h4>SELF JOIN</h4>
  <p class="note-desc">Table joins with itself using aliases. For hierarchies/comparisons.</p>
  <div class="note-code">SELECT e.name, m.name AS manager
FROM employees <span class="code-hl">e</span>
JOIN employees <span class="code-hl">m</span>
  ON e.manager_id = m.id;</div>
</div>

<div class="note-card pattern">
  <h4>FULL OUTER JOIN</h4>
  <p class="note-desc">All from both. SQLite: simulate with UNION of two LEFT JOINs.</p>
  <div class="note-code">SELECT * FROM A LEFT JOIN B ON ...
<span class="code-hl">UNION</span>
SELECT * FROM B LEFT JOIN A ON ...;</div>
</div>

</div>`
        },
        {
            title: "📌 JOIN Syntax Patterns",
            content: `
<h4>Standard JOIN</h4>
<div class="note-code">SELECT e.name, d.name AS dept
FROM employees <span class="code-hl">e</span>
<span class="code-hl">JOIN</span> departments <span class="code-hl">d</span> ON e.department_id = d.id;</div>

<h4 style="margin-top:20px;">Multi-Table JOIN</h4>
<div class="note-code">SELECT o.id, c.name, p.name AS product
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id;</div>

<h4 style="margin-top:20px;">JOIN with WHERE filter</h4>
<div class="note-code">SELECT e.name, d.name
FROM employees e
JOIN departments d ON e.department_id = d.id
<span class="code-hl">WHERE</span> e.salary > 60000;</div>

<div class="note-callout note-tip">
  <strong>💡 Always use table aliases</strong> (e, d, o, c, p). They make queries shorter and prevent ambiguous column errors.
</div>`
        },
        {
            title: "🎯 LEFT JOIN + NULL Pattern",
            content: `
<div class="note-callout note-danger">
  <strong>This is the #1 most-asked JOIN pattern in interviews!</strong>
</div>

<h4>"Find X that has NO related Y"</h4>
<div class="note-code"><span class="code-good">-- 🎯 LeetCode 183: Customers Who Never Order</span>
SELECT c.name
FROM customers c
<span class="code-hl">LEFT JOIN</span> orders o ON c.id = o.customer_id
WHERE <span class="code-hl">o.id IS NULL</span>;</div>

<div class="note-callout note-tip">
  <strong>💡 Pattern: LEFT JOIN + WHERE right.id IS NULL</strong><br>
  This is the "anti-join" — find rows in the left table with NO matching rows in the right. Works for:
</div>

<div class="note-grid">
<div class="note-card">
  <h4>Customers with no orders</h4>
  <div class="note-code">LEFT JOIN orders... WHERE o.id IS NULL</div>
</div>
<div class="note-card">
  <h4>Employees with no manager</h4>
  <div class="note-code">LEFT JOIN employees m... WHERE m.id IS NULL</div>
</div>
<div class="note-card">
  <h4>Products never sold</h4>
  <div class="note-code">LEFT JOIN order_items... WHERE oi.id IS NULL</div>
</div>
<div class="note-card">
  <h4>Students not enrolled</h4>
  <div class="note-code">LEFT JOIN enrollments... WHERE e.id IS NULL</div>
</div>
</div>`
        },
        {
            title: "🔄 Self JOIN Patterns",
            content: `
<div class="note-callout note-info">
  <strong>Self-join = joining a table to ITSELF.</strong> Must use different aliases.
</div>

<div class="note-grid">

<div class="note-card pattern">
  <h4>Employee vs Manager (LeetCode 181)</h4>
  <div class="note-code">SELECT e.name AS employee
FROM employees <span class="code-hl">e</span>
JOIN employees <span class="code-hl">m</span>
  ON e.manager_id = m.id
WHERE e.salary > m.salary;</div>
</div>

<div class="note-card pattern">
  <h4>Consecutive Day Comparison (LeetCode 197)</h4>
  <div class="note-code">SELECT a.id FROM weather <span class="code-hl">a</span>
JOIN weather <span class="code-hl">b</span>
  ON julianday(a.date)
   - julianday(b.date) = 1
WHERE a.temp > b.temp;</div>
</div>

<div class="note-card pattern">
  <h4>Find Duplicates</h4>
  <div class="note-code">SELECT a.email FROM person <span class="code-hl">a</span>
JOIN person <span class="code-hl">b</span>
  ON a.email = b.email
  AND a.id < b.id;</div>
</div>

</div>`
        },
        {
            title: "🚫 Common JOIN Mistakes",
            content: `
<table class="note-table mistakes">
  <thead>
    <tr><th>#</th><th>❌ Wrong</th><th>✅ Right</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Missing ON clause → Cartesian</td><td>Always specify <code>ON a.col = b.col</code></td></tr>
    <tr><td>2</td><td>Ambiguous column <code>SELECT id</code></td><td><code>SELECT a.id</code> — use alias prefix</td></tr>
    <tr><td>3</td><td>INNER when you need LEFT</td><td>LEFT JOIN to keep non-matching rows</td></tr>
    <tr><td>4</td><td>Filter in ON vs WHERE confusion</td><td>ON = join condition, WHERE = row filter</td></tr>
    <tr><td>5</td><td>Duplicate rows from many-to-many</td><td>Use DISTINCT or GROUP BY</td></tr>
  </tbody>
</table>

<div class="note-callout note-danger">
  <strong>⚠️ ON vs WHERE in LEFT JOIN</strong>
</div>
<div class="note-code"><span class="code-bad">-- ❌ This filters AFTER the join — removes NULLs</span>
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.status = 'completed';

<span class="code-good">-- ✅ This filters DURING the join — keeps NULLs</span>
LEFT JOIN orders o ON c.id = o.customer_id
  <span class="code-hl">AND</span> o.status = 'completed';</div>`
        }
    ]
};
