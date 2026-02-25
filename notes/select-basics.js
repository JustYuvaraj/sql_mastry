export const selectBasicsNotes = {
  category: "SELECT Basics",
  icon: "📋",
  color: "#6366f1",
  sections: [
    {
      title: "🧱 Execution Order",
      content: `
<div class="note-callout note-danger">
  <strong>⚠️ SQL does NOT execute in the order you write it!</strong> Knowing this prevents 90% of beginner errors.
</div>

<div class="note-two-col">
  <div class="note-col">
    <h4>✍️ Write Order</h4>
    <ol class="note-ol">
      <li><code>SELECT</code></li>
      <li><code>FROM</code></li>
      <li><code>WHERE</code></li>
      <li><code>GROUP BY</code></li>
      <li><code>HAVING</code></li>
      <li><code>ORDER BY</code></li>
      <li><code>LIMIT</code></li>
    </ol>
  </div>
  <div class="note-col">
    <h4>⚙️ Execution Order</h4>
    <ol class="note-ol highlight">
      <li><code>FROM</code> — pick tables</li>
      <li><code>WHERE</code> — filter rows</li>
      <li><code>GROUP BY</code> — group rows</li>
      <li><code>HAVING</code> — filter groups</li>
      <li><code>SELECT</code> — pick columns</li>
      <li><code>ORDER BY</code> — sort</li>
      <li><code>LIMIT</code> — cap rows</li>
    </ol>
  </div>
</div>

<div class="note-callout note-tip">
  <strong>💡 Key Insight:</strong> <code>WHERE</code> runs <strong>before</strong> <code>SELECT</code>, so you <strong>cannot</strong> use a SELECT alias in WHERE.
</div>

<div class="note-code">
<span class="code-bad">-- ❌ WRONG</span>
SELECT salary * 1.1 AS new_sal
WHERE new_sal > 50000;

<span class="code-good">-- ✅ RIGHT</span>
SELECT salary * 1.1 AS new_sal
WHERE salary * 1.1 > 50000;
</div>`
    },
    {
      title: "📌 SELECT Tricks",
      content: `
<div class="note-grid">

<div class="note-card">
  <h4>Select All / Specific</h4>
  <div class="note-code">SELECT * FROM employees;
SELECT name, salary FROM employees;</div>
</div>

<div class="note-card">
  <h4>Aliases (AS is optional)</h4>
  <div class="note-code">SELECT name <span class="code-hl">AS</span> employee_name,
       salary <span class="code-hl">annual_pay</span>
FROM employees;</div>
</div>

<div class="note-card">
  <h4>Math in SELECT</h4>
  <div class="note-code">SELECT name, salary,
       salary * 1.2 AS raise,
       <span class="code-hl">ROUND</span>(salary / 12.0, 2) AS monthly
FROM employees;</div>
</div>

<div class="note-card">
  <h4>String Concatenation</h4>
  <div class="note-code">SELECT first_name <span class="code-hl">||</span> ' ' <span class="code-hl">||</span> last_name
       AS full_name
FROM employees;</div>
</div>

<div class="note-card">
  <h4>DISTINCT — Remove Dupes</h4>
  <div class="note-code">SELECT <span class="code-hl">DISTINCT</span> department_id
FROM employees;</div>
</div>

<div class="note-card">
  <h4>COALESCE — Replace NULL</h4>
  <div class="note-code">SELECT name,
  <span class="code-hl">COALESCE</span>(salary, 0) AS salary
FROM employees;</div>
</div>

<div class="note-card">
  <h4>Inline CASE WHEN</h4>
  <div class="note-code">SELECT name,
  <span class="code-hl">CASE WHEN</span> salary > 80000
       <span class="code-hl">THEN</span> 'Senior'
       <span class="code-hl">ELSE</span> 'Junior'
  <span class="code-hl">END</span> AS level
FROM employees;</div>
</div>

<div class="note-card">
  <h4>String Literal Column</h4>
  <div class="note-code">SELECT name,
  <span class="code-hl">'Active'</span> AS status
FROM employees;</div>
</div>

</div>`
    },
    {
      title: "🔢 NULL Rules",
      content: `
<div class="note-callout note-danger">
  <strong>NULL is NOT a value — it is the ABSENCE of a value.</strong>
</div>

<table class="note-table">
  <thead>
    <tr><th>Expression</th><th>Result</th><th>Why?</th></tr>
  </thead>
  <tbody>
    <tr><td><code>NULL = NULL</code></td><td class="code-bad">FALSE</td><td>Use <code>IS NULL</code> instead</td></tr>
    <tr><td><code>NULL != NULL</code></td><td class="code-bad">FALSE</td><td>Same reason</td></tr>
    <tr><td><code>NULL + 5</code></td><td class="code-bad">NULL</td><td>Any math with NULL = NULL</td></tr>
    <tr><td><code>NULL OR TRUE</code></td><td class="code-good">TRUE</td><td>Special case</td></tr>
    <tr><td><code>NULL AND FALSE</code></td><td class="code-good">FALSE</td><td>Special case</td></tr>
  </tbody>
</table>

<h4 style="margin-top: 20px;">✅ Correct NULL Checks</h4>
<div class="note-code">WHERE column <span class="code-hl">IS NULL</span>
WHERE column <span class="code-hl">IS NOT NULL</span>
<span class="code-hl">COALESCE</span>(column, 'default')   -- replace NULL
<span class="code-hl">NULLIF</span>(column, 0)             -- turn 0 → NULL (avoid DIV/0)</div>

<div class="note-callout note-danger">
  <strong>❌ NEVER do this:</strong> <code>WHERE column = NULL</code> — always returns 0 rows!
</div>

<div class="note-callout note-tip">
  <strong>🎯 Interview Trap:</strong><br>
  <code>COUNT(*)</code> counts all rows <strong>including</strong> NULLs.<br>
  <code>COUNT(column)</code> <strong>skips</strong> NULLs. Always clarify which one you need.
</div>`
    },
    {
      title: "🔤 String Functions",
      content: `
<table class="note-table">
  <thead>
    <tr><th>Function</th><th>Example</th><th>Result</th></tr>
  </thead>
  <tbody>
    <tr><td><code>LENGTH()</code></td><td><code>LENGTH('Hello')</code></td><td>5</td></tr>
    <tr><td><code>UPPER()</code></td><td><code>UPPER('hello')</code></td><td>HELLO</td></tr>
    <tr><td><code>LOWER()</code></td><td><code>LOWER('HELLO')</code></td><td>hello</td></tr>
    <tr><td><code>SUBSTR()</code></td><td><code>SUBSTR('Hello', 1, 3)</code></td><td>Hel</td></tr>
    <tr><td><code>SUBSTR()</code></td><td><code>SUBSTR('Hello', -3)</code></td><td>llo</td></tr>
    <tr><td><code>REPLACE()</code></td><td><code>REPLACE('a@b.com','@b.com','')</code></td><td>a</td></tr>
    <tr><td><code>TRIM()</code></td><td><code>TRIM('  hi  ')</code></td><td>hi</td></tr>
    <tr><td><code>INSTR()</code></td><td><code>INSTR('a@b.com', '@')</code></td><td>2</td></tr>
    <tr><td><code>||</code></td><td><code>'Hi' || ' ' || 'World'</code></td><td>Hi World</td></tr>
  </tbody>
</table>

<h4 style="margin-top: 20px;">LIKE Pattern Matching</h4>
<table class="note-table">
  <thead>
    <tr><th>Pattern</th><th>Matches</th></tr>
  </thead>
  <tbody>
    <tr><td><code>'%abc%'</code></td><td>Contains "abc"</td></tr>
    <tr><td><code>'abc%'</code></td><td>Starts with "abc"</td></tr>
    <tr><td><code>'%abc'</code></td><td>Ends with "abc"</td></tr>
    <tr><td><code>'a_c'</code></td><td>a + any 1 char + c</td></tr>
  </tbody>
</table>

<div class="note-callout note-tip">
  <strong>💡</strong> SQLite LIKE is <strong>case-insensitive for ASCII</strong> by default. <code>WHERE name LIKE 'john%'</code> matches John, JOHN, john.
</div>`
    },
    {
      title: "🔢 Numbers",
      content: `
<table class="note-table">
  <thead>
    <tr><th>Function</th><th>Example</th><th>Result</th></tr>
  </thead>
  <tbody>
    <tr><td><code>ABS()</code></td><td><code>ABS(-42)</code></td><td>42</td></tr>
    <tr><td><code>ROUND()</code></td><td><code>ROUND(3.456, 2)</code></td><td>3.46</td></tr>
    <tr><td><code>CAST()</code></td><td><code>CAST(3.9 AS INTEGER)</code></td><td>3</td></tr>
    <tr><td><code>%</code> (mod)</td><td><code>7 % 3</code></td><td>1</td></tr>
  </tbody>
</table>

<div class="note-callout note-danger">
  <strong>⚠️ Integer Division Trap!</strong>
</div>

<div class="note-code"><span class="code-bad">SELECT 7 / 2      → 3</span>     (integer division!)
<span class="code-good">SELECT 7 / 2.0    → 3.5</span>   (float division ✅)
<span class="code-good">SELECT 100.0 * count / total</span>  (always use .0 for percentages)</div>

<div class="note-callout note-tip">
  <strong>💡 Pro Tip:</strong> Always write <code>100.0 * count / total</code> (not <code>100 * count / total</code>) to avoid truncation to 0.
</div>`
    },
    {
      title: "📅 Date Functions",
      content: `
<h4>SQLite stores dates as TEXT: <code>'YYYY-MM-DD'</code></h4>

<table class="note-table">
  <thead>
    <tr><th>Function</th><th>Example</th><th>What it does</th></tr>
  </thead>
  <tbody>
    <tr><td><code>date('now')</code></td><td><code>→ '2024-02-25'</code></td><td>Current date</td></tr>
    <tr><td><code>strftime('%Y', d)</code></td><td><code>→ '2024'</code></td><td>Extract year</td></tr>
    <tr><td><code>strftime('%m', d)</code></td><td><code>→ '02'</code></td><td>Extract month</td></tr>
    <tr><td><code>strftime('%d', d)</code></td><td><code>→ '25'</code></td><td>Extract day</td></tr>
    <tr><td><code>strftime('%w', d)</code></td><td><code>→ '2'</code></td><td>Weekday (0=Sun)</td></tr>
  </tbody>
</table>

<h4 style="margin-top: 20px;">Date Arithmetic</h4>
<div class="note-code">date(hire_date, '<span class="code-hl">+30 days</span>')   -- 30 days later
date(hire_date, '<span class="code-hl">-1 year</span>')    -- 1 year earlier
date(hire_date, '<span class="code-hl">+1 month</span>')   -- 1 month later</div>

<h4 style="margin-top: 20px;">Date Difference (in days)</h4>
<div class="note-code"><span class="code-hl">julianday</span>('2024-12-31') - <span class="code-hl">julianday</span>(hire_date) AS days_employed</div>

<div class="note-callout note-tip">
  <strong>🎯 Must-Know Pattern (LeetCode 197 — Rising Temperature):</strong>
</div>
<div class="note-code">SELECT a.id FROM weather a
JOIN weather b
  ON <span class="code-hl">julianday(a.date) - julianday(b.date) = 1</span>
WHERE a.temperature > b.temperature;</div>`
    },
    {
      title: "🏆 ORDER BY",
      content: `
<div class="note-grid">

<div class="note-card">
  <h4>Basic Sorting</h4>
  <div class="note-code">SELECT * FROM employees
ORDER BY salary;          <span class="code-comment">-- ASC default</span>

SELECT * FROM employees
ORDER BY salary <span class="code-hl">DESC</span>;     <span class="code-comment">-- descending</span></div>
</div>

<div class="note-card">
  <h4>Multi-Column Sort</h4>
  <div class="note-code">ORDER BY dept_id <span class="code-hl">ASC</span>,
         salary <span class="code-hl">DESC</span>;</div>
  <p class="note-desc">First sort by department, then by salary within each dept.</p>
</div>

<div class="note-card">
  <h4>Sort by Expression</h4>
  <div class="note-code">ORDER BY salary * 1.2 DESC;
ORDER BY LENGTH(name) ASC;</div>
</div>

<div class="note-card">
  <h4>Push NULLs Last</h4>
  <div class="note-code">ORDER BY
  <span class="code-hl">CASE WHEN col IS NULL
       THEN 1 ELSE 0 END</span>,
  col;</div>
</div>

<div class="note-card">
  <h4>Custom Sort Order</h4>
  <div class="note-code">ORDER BY <span class="code-hl">CASE</span> difficulty
  WHEN 'easy' THEN 1
  WHEN 'medium' THEN 2
  WHEN 'hard' THEN 3
<span class="code-hl">END</span>;</div>
</div>

</div>`
    },
    {
      title: "📏 LIMIT & Pagination",
      content: `
<div class="note-grid">

<div class="note-card">
  <h4>Top N Rows</h4>
  <div class="note-code">SELECT * FROM employees
ORDER BY salary DESC
<span class="code-hl">LIMIT 5</span>;</div>
</div>

<div class="note-card">
  <h4>Pagination (Skip + Take)</h4>
  <div class="note-code"><span class="code-comment">-- Skip 20, take 10</span>
SELECT * FROM employees
ORDER BY id
<span class="code-hl">LIMIT 10 OFFSET 20</span>;</div>
</div>

</div>

<div class="note-callout note-danger">
  <strong>🎯 Classic Interview: Second Highest Salary (LeetCode 176)</strong>
</div>

<div class="note-code"><span class="code-bad">-- ❌ Naive (fails with ties or missing 2nd value)</span>
ORDER BY salary DESC LIMIT 1, 1;

<span class="code-good">-- ✅ Correct Pattern</span>
SELECT <span class="code-hl">MAX</span>(salary) AS SecondHighestSalary
FROM employees
WHERE salary < (SELECT <span class="code-hl">MAX</span>(salary) FROM employees);

<span class="code-good">-- ✅ Nth Highest (generalised)</span>
SELECT salary FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET (N-1);  <span class="code-comment">-- replace N</span></div>`
    },
    {
      title: "⚡ DISTINCT vs GROUP BY",
      content: `
<div class="note-two-col">
  <div class="note-col">
    <h4>DISTINCT</h4>
    <p class="note-desc">Remove duplicate rows in final output. No aggregation.</p>
    <div class="note-code">SELECT <span class="code-hl">DISTINCT</span> dept_id
FROM employees;

<span class="code-comment">-- Distinct COMBINATIONS</span>
SELECT DISTINCT dept_id,
       job_title
FROM employees;</div>
  </div>
  <div class="note-col">
    <h4>GROUP BY</h4>
    <p class="note-desc">Collapse rows into groups → enables aggregation.</p>
    <div class="note-code">SELECT dept_id,
       <span class="code-hl">COUNT(*)</span>
FROM employees
<span class="code-hl">GROUP BY</span> dept_id;</div>
  </div>
</div>

<div class="note-callout note-tip">
  <strong>💡 COUNT(DISTINCT col)</strong> — Count unique values of one column:
</div>
<div class="note-code">SELECT <span class="code-hl">COUNT(DISTINCT</span> department_id<span class="code-hl">)</span> AS num_depts
FROM employees;</div>`
    },
    {
      title: "🎯 Interview Patterns",
      content: `
<div class="note-grid">

<div class="note-card pattern">
  <h4>1️⃣ Second Highest</h4>
  <div class="note-code">SELECT MAX(salary) FROM employees
WHERE salary < (
  SELECT MAX(salary) FROM employees
);</div>
</div>

<div class="note-card pattern">
  <h4>2️⃣ Duplicate Detection</h4>
  <div class="note-code">SELECT email, COUNT(*)
FROM employees
GROUP BY email
<span class="code-hl">HAVING COUNT(*) > 1</span>;</div>
</div>

<div class="note-card pattern">
  <h4>3️⃣ Self-Join Comparison</h4>
  <div class="note-code">SELECT e.name FROM employees e
<span class="code-hl">JOIN</span> employees m
  ON e.manager_id = m.id
WHERE e.salary > m.salary;</div>
</div>

<div class="note-card pattern">
  <h4>4️⃣ Running Total</h4>
  <div class="note-code">SELECT *,
  <span class="code-hl">SUM(salary) OVER (ORDER BY id)</span>
  AS running_total
FROM employees;</div>
</div>

<div class="note-card pattern">
  <h4>5️⃣ Percentage Calc</h4>
  <div class="note-code">SELECT dept,
  ROUND(<span class="code-hl">100.0</span> * COUNT(*) /
    (SELECT COUNT(*) FROM employees),
  2) AS pct
FROM employees GROUP BY dept;</div>
</div>

<div class="note-card pattern">
  <h4>6️⃣ Safe Division (no DIV/0)</h4>
  <div class="note-code">SELECT <span class="code-hl">CASE WHEN</span> total = 0
  <span class="code-hl">THEN</span> 0
  <span class="code-hl">ELSE</span> num * 1.0 / total
<span class="code-hl">END</span> FROM t;</div>
</div>

</div>`
    },
    {
      title: "🚫 Common Mistakes",
      content: `
<table class="note-table mistakes">
  <thead>
    <tr><th>#</th><th>❌ Wrong</th><th>✅ Right</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td><code>WHERE salary = NULL</code></td><td><code>WHERE salary IS NULL</code></td></tr>
    <tr><td>2</td><td><code>WHERE alias > 5000</code></td><td><code>WHERE column > 5000</code></td></tr>
    <tr><td>3</td><td><code>SELECT 5/2</code> → 2 (integer!)</td><td><code>SELECT 5/2.0</code> → 2.5</td></tr>
    <tr><td>4</td><td><code>COUNT(*)</code> when NULLs matter</td><td><code>COUNT(column)</code> skips NULLs</td></tr>
    <tr><td>5</td><td>ORDER BY in subquery</td><td>ORDER BY only in final SELECT</td></tr>
    <tr><td>6</td><td><code>SELECT *</code> in subquery</td><td>Select specific columns</td></tr>
    <tr><td>7</td><td>Forgetting DISTINCT</td><td>Duplicates silently appear ⚠️</td></tr>
    <tr><td>8</td><td>GROUP BY without HAVING filter</td><td>Use HAVING for group conditions</td></tr>
    <tr><td>9</td><td><code>LIKE '%John'</code> (starts match?)</td><td><code>LIKE 'John%'</code> (starts with)</td></tr>
    <tr><td>10</td><td>Using <code>=</code> for multiple values</td><td>Use <code>IN (v1, v2, v3)</code></td></tr>
  </tbody>
</table>`
    },
    {
      title: "📝 Cheat Sheet",
      content: `
<div class="note-callout note-info">
  <strong>Complete SELECT Syntax:</strong>
</div>
<div class="note-code cheat">SELECT [<span class="code-hl">DISTINCT</span>] col1, col2, expr <span class="code-hl">AS</span> alias
FROM table_name
WHERE condition
GROUP BY col1
HAVING aggregate_condition
ORDER BY col1 [<span class="code-hl">ASC</span>|<span class="code-hl">DESC</span>]
LIMIT n [OFFSET m];</div>

<div class="note-two-col" style="margin-top: 20px;">
  <div class="note-col">
    <h4>🔤 String</h4>
    <div class="note-code compact">LENGTH  UPPER  LOWER
SUBSTR  REPLACE  TRIM
INSTR   LIKE   ||</div>
  </div>
  <div class="note-col">
    <h4>🔢 Number</h4>
    <div class="note-code compact">ABS   ROUND   CAST
MOD(%)  COALESCE  NULLIF</div>
  </div>
</div>
<div class="note-two-col">
  <div class="note-col">
    <h4>📅 Date</h4>
    <div class="note-code compact">strftime('%Y/%m/%d', date)
julianday(date)
date(col, '+N days')</div>
  </div>
  <div class="note-col">
    <h4>📊 Aggregates</h4>
    <div class="note-code compact">COUNT(*)  COUNT(col)
SUM  AVG  MIN  MAX</div>
  </div>
</div>

<div class="note-callout note-tip" style="margin-top: 16px;">
  <strong>Key Operators:</strong><br>
  <code>BETWEEN x AND y</code> (inclusive both ends) •
  <code>IN (v1, v2, v3)</code> •
  <code>IS NULL</code> •
  <code>CASE WHEN...THEN...ELSE...END</code>
</div>`
    }
  ]
};
