export const advancedNotes = {
    category: "Advanced SQL",
    icon: "🚀",
    color: "#e11d48",
    sections: [
        {
            title: "🧱 UNION & Set Operations",
            content: `
<table class="note-table">
  <thead>
    <tr><th>Operation</th><th>Duplicates?</th><th>What it does</th></tr>
  </thead>
  <tbody>
    <tr><td><code>UNION</code></td><td>Removes</td><td>Combine + deduplicate</td></tr>
    <tr><td><code>UNION ALL</code></td><td>Keeps</td><td>Combine (faster, keeps dupes)</td></tr>
    <tr><td><code>INTERSECT</code></td><td>—</td><td>Only rows in BOTH queries</td></tr>
    <tr><td><code>EXCEPT</code></td><td>—</td><td>Rows in first NOT in second</td></tr>
  </tbody>
</table>

<div class="note-code">SELECT name FROM customers
<span class="code-hl">UNION</span>
SELECT name FROM suppliers;

<span class="code-comment">-- Rules: same # of columns, compatible types</span></div>

<div class="note-callout note-tip">
  <strong>💡 Always use UNION ALL unless you specifically need deduplication.</strong> UNION ALL is significantly faster.
</div>`
        },
        {
            title: "🔀 Pivoting & Unpivoting",
            content: `
<div class="note-callout note-info">
  <strong>Pivoting transforms rows → columns. Unpivoting does the reverse.</strong>
</div>

<h4>Pivot (Rows → Columns)</h4>
<div class="note-code">SELECT product_id,
  SUM(CASE WHEN store = 'store1'
    THEN price END) AS <span class="code-hl">store1</span>,
  SUM(CASE WHEN store = 'store2'
    THEN price END) AS <span class="code-hl">store2</span>,
  SUM(CASE WHEN store = 'store3'
    THEN price END) AS <span class="code-hl">store3</span>
FROM products
GROUP BY product_id;</div>

<h4 style="margin-top:20px;">Unpivot (Columns → Rows)</h4>
<div class="note-code">SELECT product_id, 'store1' AS store, store1 AS price
FROM products WHERE store1 IS NOT NULL
<span class="code-hl">UNION ALL</span>
SELECT product_id, 'store2', store2
FROM products WHERE store2 IS NOT NULL
<span class="code-hl">UNION ALL</span>
SELECT product_id, 'store3', store3
FROM products WHERE store3 IS NOT NULL;</div>`
        },
        {
            title: "🎯 DELETE Duplicates",
            content: `
<div class="note-callout note-danger">
  <strong>Classic interview question: Delete duplicate rows, keeping the one with the smallest ID.</strong>
</div>

<div class="note-code"><span class="code-good">-- LeetCode 196: Delete Duplicate Emails</span>
DELETE FROM person
WHERE id NOT IN (
  SELECT MIN(id)
  FROM person
  GROUP BY email
);</div>

<h4 style="margin-top:20px;">Alternative with Self-Join</h4>
<div class="note-code">DELETE p1 FROM person p1
JOIN person p2
  ON p1.email = p2.email
  AND <span class="code-hl">p1.id > p2.id</span>;</div>`
        },
        {
            title: "📏 Consecutive Problems",
            content: `
<div class="note-callout note-info">
  <strong>"Find N consecutive" is a classic hard interview pattern.</strong> Key techniques: self-join, LAG/LEAD, or row_number gaps.
</div>

<h4>Method 1: Self-Join (3 consecutive)</h4>
<div class="note-code">SELECT DISTINCT a.num AS ConsecutiveNums
FROM logs a
JOIN logs b ON <span class="code-hl">a.id = b.id + 1</span>
JOIN logs c ON <span class="code-hl">a.id = c.id + 2</span>
WHERE a.num = b.num AND b.num = c.num;</div>

<h4 style="margin-top:20px;">Method 2: Window Function Gap Detection</h4>
<div class="note-code">WITH grouped AS (
  SELECT *,
    id - <span class="code-hl">ROW_NUMBER() OVER (
      PARTITION BY num ORDER BY id
    )</span> AS grp
  FROM logs
)
SELECT num FROM grouped
GROUP BY num, grp
HAVING COUNT(*) >= 3;</div>

<div class="note-callout note-tip">
  <strong>💡 The "row_number gap" trick:</strong> If consecutive rows have the same value, <code>id - ROW_NUMBER()</code> will be constant. This groups consecutive sequences together.
</div>`
        },
        {
            title: "🔧 Performance Tips",
            content: `
<div class="note-grid">

<div class="note-card">
  <h4>Index Awareness</h4>
  <div class="note-code"><span class="code-comment">-- WHERE on indexed col = fast</span>
WHERE id = 5;

<span class="code-comment">-- Function on indexed col = slow</span>
<span class="code-bad">WHERE UPPER(name) = 'JOHN';</span></div>
</div>

<div class="note-card">
  <h4>EXPLAIN</h4>
  <div class="note-code"><span class="code-hl">EXPLAIN QUERY PLAN</span>
SELECT * FROM employees
WHERE salary > 50000;</div>
</div>

<div class="note-card">
  <h4>Avoid SELECT *</h4>
  <div class="note-code"><span class="code-bad">SELECT * FROM employees;</span>

<span class="code-good">SELECT id, name, salary
FROM employees;</span></div>
</div>

<div class="note-card">
  <h4>EXISTS vs IN</h4>
  <div class="note-code"><span class="code-comment">-- EXISTS is often faster
-- for large correlated sets</span>
WHERE <span class="code-hl">EXISTS</span> (
  SELECT 1 FROM orders
  WHERE customer_id = c.id
);</div>
</div>

</div>`
        }
    ]
};
