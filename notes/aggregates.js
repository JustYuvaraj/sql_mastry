export const aggregatesNotes = {
    category: "Aggregates",
    icon: "📈",
    color: "#10b981",
    sections: [
        {
            title: "🧱 Aggregate Functions",
            content: `
<div class="note-callout note-info">
  <strong>Aggregates collapse multiple rows into a single value.</strong> Use with GROUP BY to aggregate per group.
</div>

<table class="note-table">
  <thead>
    <tr><th>Function</th><th>What it does</th><th>Example</th></tr>
  </thead>
  <tbody>
    <tr><td><code>COUNT(*)</code></td><td>Count all rows (incl NULLs)</td><td><code>SELECT COUNT(*) FROM orders;</code></td></tr>
    <tr><td><code>COUNT(col)</code></td><td>Count non-NULL values</td><td><code>SELECT COUNT(email) FROM users;</code></td></tr>
    <tr><td><code>COUNT(DISTINCT col)</code></td><td>Count unique values</td><td><code>SELECT COUNT(DISTINCT city) FROM users;</code></td></tr>
    <tr><td><code>SUM(col)</code></td><td>Total sum</td><td><code>SELECT SUM(amount) FROM orders;</code></td></tr>
    <tr><td><code>AVG(col)</code></td><td>Average (skips NULLs!)</td><td><code>SELECT AVG(salary) FROM employees;</code></td></tr>
    <tr><td><code>MIN(col)</code></td><td>Smallest value</td><td><code>SELECT MIN(price) FROM products;</code></td></tr>
    <tr><td><code>MAX(col)</code></td><td>Largest value</td><td><code>SELECT MAX(salary) FROM employees;</code></td></tr>
  </tbody>
</table>`
        },
        {
            title: "🎯 Key Patterns",
            content: `
<div class="note-grid">

<div class="note-card pattern">
  <h4>Total Revenue per Customer</h4>
  <div class="note-code">SELECT customer_id,
  <span class="code-hl">SUM</span>(amount) AS total
FROM orders
GROUP BY customer_id
ORDER BY total DESC;</div>
</div>

<div class="note-card pattern">
  <h4>Percentage of Total</h4>
  <div class="note-code">SELECT department,
  ROUND(<span class="code-hl">100.0</span> * COUNT(*) /
    (SELECT COUNT(*) FROM employees)
  , 2) AS pct
FROM employees GROUP BY department;</div>
</div>

<div class="note-card pattern">
  <h4>Conditional Aggregation</h4>
  <div class="note-code">SELECT
  SUM(<span class="code-hl">CASE WHEN</span> type='credit'
    THEN amount ELSE 0 END) AS credits,
  SUM(CASE WHEN type='debit'
    THEN amount ELSE 0 END) AS debits
FROM transactions;</div>
</div>

<div class="note-card pattern">
  <h4>Multiple Aggregates Together</h4>
  <div class="note-code">SELECT dept,
  COUNT(*) AS cnt,
  <span class="code-hl">AVG</span>(salary) AS avg_sal,
  <span class="code-hl">MAX</span>(salary) AS max_sal,
  <span class="code-hl">MIN</span>(salary) AS min_sal
FROM employees GROUP BY dept;</div>
</div>

</div>

<div class="note-callout note-tip">
  <strong>💡 Integer Division Trap:</strong> Always use <code>100.0 *</code> (not <code>100 *</code>) for percentages to avoid truncation.
</div>`
        },
        {
            title: "🚫 NULL Traps",
            content: `
<div class="note-callout note-danger">
  <strong>NULLs are the #1 source of wrong aggregate results!</strong>
</div>

<table class="note-table">
  <thead>
    <tr><th>Data</th><th>COUNT(*)</th><th>COUNT(col)</th><th>AVG(col)</th><th>SUM(col)</th></tr>
  </thead>
  <tbody>
    <tr><td>[100, NULL, 200]</td><td>3</td><td class="code-good">2</td><td class="code-good">150</td><td>300</td></tr>
    <tr><td>[NULL, NULL]</td><td>2</td><td class="code-bad">0</td><td class="code-bad">NULL</td><td class="code-bad">NULL</td></tr>
  </tbody>
</table>

<div class="note-code"><span class="code-comment">-- If you want NULLs counted as 0:</span>
AVG(<span class="code-hl">COALESCE</span>(salary, 0))

<span class="code-comment">-- Safe SUM (returns 0 instead of NULL):</span>
<span class="code-hl">COALESCE</span>(SUM(amount), 0)</div>`
        }
    ]
};
