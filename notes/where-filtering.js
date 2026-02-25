export const whereFilteringNotes = {
    category: "WHERE & Filtering",
    icon: "🔍",
    color: "#f59e0b",
    sections: [
        {
            title: "🧱 WHERE Syntax",
            content: `
<div class="note-callout note-info">
  <strong>WHERE filters rows BEFORE grouping.</strong> It runs as step 2 in execution order (after FROM).
</div>

<div class="note-code cheat">SELECT columns
FROM table
<span class="code-hl">WHERE</span> condition
ORDER BY column;</div>

<div class="note-callout note-danger">
  <strong>⚠️ You CANNOT use SELECT aliases in WHERE!</strong> Because WHERE executes before SELECT.
</div>

<div class="note-code"><span class="code-bad">-- ❌ WRONG</span>
SELECT salary * 1.1 AS new_sal FROM employees WHERE new_sal > 50000;

<span class="code-good">-- ✅ RIGHT</span>
SELECT salary * 1.1 AS new_sal FROM employees WHERE salary * 1.1 > 50000;</div>`
        },
        {
            title: "⚡ Comparison Operators",
            content: `
<table class="note-table">
  <thead>
    <tr><th>Operator</th><th>Meaning</th><th>Example</th></tr>
  </thead>
  <tbody>
    <tr><td><code>=</code></td><td>Equals</td><td><code>WHERE status = 'active'</code></td></tr>
    <tr><td><code>!=</code> or <code>&lt;&gt;</code></td><td>Not equal</td><td><code>WHERE dept &lt;&gt; 'HR'</code></td></tr>
    <tr><td><code>&gt;</code> <code>&lt;</code></td><td>Greater / Less</td><td><code>WHERE salary &gt; 50000</code></td></tr>
    <tr><td><code>&gt;=</code> <code>&lt;=</code></td><td>Greater/Less or equal</td><td><code>WHERE age &gt;= 18</code></td></tr>
    <tr><td><code>BETWEEN</code></td><td>Range (inclusive!)</td><td><code>WHERE salary BETWEEN 50000 AND 80000</code></td></tr>
    <tr><td><code>IN</code></td><td>Match any in list</td><td><code>WHERE dept IN ('HR', 'Sales')</code></td></tr>
    <tr><td><code>LIKE</code></td><td>Pattern match</td><td><code>WHERE name LIKE 'J%'</code></td></tr>
    <tr><td><code>IS NULL</code></td><td>Check for NULL</td><td><code>WHERE manager_id IS NULL</code></td></tr>
  </tbody>
</table>

<div class="note-callout note-tip">
  <strong>💡 BETWEEN is INCLUSIVE on both ends.</strong><br>
  <code>BETWEEN 1 AND 5</code> includes 1, 2, 3, 4, <strong>and</strong> 5.
</div>`
        },
        {
            title: "🔗 AND / OR / NOT",
            content: `
<div class="note-grid">

<div class="note-card">
  <h4>AND — Both must be true</h4>
  <div class="note-code">WHERE salary > 50000
  <span class="code-hl">AND</span> department = 'Engineering';</div>
</div>

<div class="note-card">
  <h4>OR — Either can be true</h4>
  <div class="note-code">WHERE department = 'HR'
  <span class="code-hl">OR</span> department = 'Sales';</div>
</div>

<div class="note-card">
  <h4>NOT — Negate condition</h4>
  <div class="note-code">WHERE <span class="code-hl">NOT</span> status = 'inactive';
WHERE department <span class="code-hl">NOT IN</span> ('HR','Sales');
WHERE name <span class="code-hl">NOT LIKE</span> '%test%';</div>
</div>

<div class="note-card">
  <h4>⚠️ Precedence Trap</h4>
  <div class="note-code"><span class="code-bad">-- ❌ AND binds tighter than OR</span>
WHERE a = 1 OR b = 2 AND c = 3
<span class="code-comment">-- This means: a=1 OR (b=2 AND c=3)</span>

<span class="code-good">-- ✅ Use parentheses!</span>
WHERE (a = 1 OR b = 2) AND c = 3</div>
</div>

</div>`
        },
        {
            title: "🔎 IN, BETWEEN, LIKE",
            content: `
<div class="note-grid">

<div class="note-card">
  <h4>IN — Match a set</h4>
  <div class="note-code"><span class="code-comment">-- Instead of multiple OR clauses:</span>
WHERE dept <span class="code-hl">IN</span> ('HR', 'Sales', 'Eng');

<span class="code-comment">-- With subquery:</span>
WHERE id <span class="code-hl">IN</span> (
  SELECT manager_id FROM employees
);</div>
</div>

<div class="note-card">
  <h4>BETWEEN — Inclusive range</h4>
  <div class="note-code">WHERE salary <span class="code-hl">BETWEEN</span> 50000 <span class="code-hl">AND</span> 80000;
<span class="code-comment">-- Equivalent to:</span>
WHERE salary >= 50000 AND salary <= 80000;

<span class="code-comment">-- Works on dates too:</span>
WHERE hire_date BETWEEN '2023-01-01'
  AND '2023-12-31';</div>
</div>

<div class="note-card">
  <h4>LIKE — Pattern matching</h4>
  <div class="note-code"><span class="code-hl">%</span> = any number of characters
<span class="code-hl">_</span> = exactly one character

'J%'     → starts with J
'%son'   → ends with "son"
'%oh%'   → contains "oh"
'_o%'    → 2nd char is "o"
'J___'   → J + exactly 3 chars</div>
</div>

<div class="note-card">
  <h4>NOT variants</h4>
  <div class="note-code">WHERE dept <span class="code-hl">NOT IN</span> ('HR', 'Sales');
WHERE salary <span class="code-hl">NOT BETWEEN</span> 50000 AND 80000;
WHERE name <span class="code-hl">NOT LIKE</span> '%test%';</div>
</div>

</div>`
        },
        {
            title: "🎯 EXISTS & Subquery Filters",
            content: `
<div class="note-callout note-info">
  <strong>EXISTS checks if a subquery returns ANY rows.</strong> Often faster than IN for large datasets.
</div>

<div class="note-two-col">
  <div class="note-col">
    <h4>IN (returns values)</h4>
    <div class="note-code">SELECT name FROM customers
WHERE id <span class="code-hl">IN</span> (
  SELECT customer_id
  FROM orders
);</div>
  </div>
  <div class="note-col">
    <h4>EXISTS (returns true/false)</h4>
    <div class="note-code">SELECT name FROM customers c
WHERE <span class="code-hl">EXISTS</span> (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.id
);</div>
  </div>
</div>

<div class="note-callout note-tip">
  <strong>💡 When to use which?</strong><br>
  • <code>IN</code> — simple, small subquery results<br>
  • <code>EXISTS</code> — correlated subqueries, large tables, better performance<br>
  • <code>NOT EXISTS</code> — "find X that has no Y" (classic interview pattern!)
</div>

<div class="note-code"><span class="code-good">-- 🎯 LeetCode 183: Customers Who Never Order</span>
SELECT name FROM customers c
WHERE <span class="code-hl">NOT EXISTS</span> (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);</div>`
        },
        {
            title: "🚫 Common WHERE Mistakes",
            content: `
<table class="note-table mistakes">
  <thead>
    <tr><th>#</th><th>❌ Wrong</th><th>✅ Right</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td><code>WHERE col = NULL</code></td><td><code>WHERE col IS NULL</code></td></tr>
    <tr><td>2</td><td><code>WHERE alias > 5000</code></td><td><code>WHERE original_col > 5000</code></td></tr>
    <tr><td>3</td><td><code>WHERE col = 'abc' OR 'def'</code></td><td><code>WHERE col IN ('abc','def')</code></td></tr>
    <tr><td>4</td><td>Mixing AND/OR without <code>()</code></td><td>Always use parentheses with mixed logic</td></tr>
    <tr><td>5</td><td><code>WHERE COUNT(*) > 5</code></td><td><code>HAVING COUNT(*) > 5</code></td></tr>
    <tr><td>6</td><td><code>NOT IN</code> with NULLs in subquery</td><td>Use <code>NOT EXISTS</code> instead</td></tr>
  </tbody>
</table>

<div class="note-callout note-danger">
  <strong>⚠️ NOT IN + NULLs = EMPTY RESULT!</strong><br>
  If your subquery returns even one NULL, <code>NOT IN</code> returns <strong>zero rows</strong>. Always use <code>NOT EXISTS</code> for safety.
</div>

<div class="note-code"><span class="code-bad">-- ❌ Dangerous if subquery has NULLs</span>
WHERE id NOT IN (SELECT manager_id FROM employees);

<span class="code-good">-- ✅ Safe alternative</span>
WHERE NOT EXISTS (
  SELECT 1 FROM employees e WHERE e.manager_id = t.id
);</div>`
        }
    ]
};
