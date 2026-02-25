export const caseWhenNotes = {
    category: "CASE WHEN",
    icon: "🔀",
    color: "#ef4444",
    sections: [
        {
            title: "🧱 CASE WHEN Syntax",
            content: `
<div class="note-callout note-info">
  <strong>CASE WHEN is SQL's IF-ELSE.</strong> It transforms values, creates categories, and enables conditional logic.
</div>

<div class="note-two-col">
  <div class="note-col">
    <h4>Simple CASE</h4>
    <div class="note-code">CASE <span class="code-hl">column</span>
  WHEN 'value1' THEN 'result1'
  WHEN 'value2' THEN 'result2'
  ELSE 'default'
END</div>
  </div>
  <div class="note-col">
    <h4>Searched CASE (more flexible)</h4>
    <div class="note-code">CASE
  WHEN <span class="code-hl">salary > 80000</span> THEN 'High'
  WHEN <span class="code-hl">salary > 50000</span> THEN 'Mid'
  ELSE 'Low'
END</div>
  </div>
</div>

<div class="note-callout note-danger">
  <strong>⚠️ Order matters!</strong> CASE evaluates top-to-bottom and stops at the first TRUE condition.
</div>`
        },
        {
            title: "🎯 Interview Patterns",
            content: `
<div class="note-grid">

<div class="note-card pattern">
  <h4>Categorization (LC 608: Tree Node)</h4>
  <div class="note-code">SELECT id,
  <span class="code-hl">CASE</span>
    WHEN p_id IS NULL THEN 'Root'
    WHEN id IN (SELECT p_id FROM tree)
      THEN 'Inner'
    ELSE 'Leaf'
  <span class="code-hl">END</span> AS type
FROM tree;</div>
</div>

<div class="note-card pattern">
  <h4>Conditional Aggregation</h4>
  <div class="note-code">SELECT
  SUM(<span class="code-hl">CASE WHEN</span> gender='M'
    THEN 1 ELSE 0 END) AS male_cnt,
  SUM(CASE WHEN gender='F'
    THEN 1 ELSE 0 END) AS female_cnt
FROM employees;</div>
</div>

<div class="note-card pattern">
  <h4>Pivot / Transpose (LC 1795)</h4>
  <div class="note-code">SELECT product_id,
  SUM(CASE WHEN store='s1'
    THEN price END) AS store1,
  SUM(CASE WHEN store='s2'
    THEN price END) AS store2
FROM products GROUP BY product_id;</div>
</div>

<div class="note-card pattern">
  <h4>Bonus Calculation (LC 1907)</h4>
  <div class="note-code">SELECT id, name,
  <span class="code-hl">CASE</span>
    WHEN id % 2 = 1
      AND name NOT LIKE 'M%'
      THEN salary
    ELSE 0
  END AS bonus
FROM employees;</div>
</div>

</div>`
        },
        {
            title: "📌 CASE in Different Clauses",
            content: `
<table class="note-table">
  <thead>
    <tr><th>Clause</th><th>Use</th><th>Example</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>SELECT</strong></td><td>Create computed column</td><td><code>SELECT CASE WHEN... AS label</code></td></tr>
    <tr><td><strong>WHERE</strong></td><td>Conditional filtering</td><td><code>WHERE CASE WHEN a THEN b END = 'x'</code></td></tr>
    <tr><td><strong>ORDER BY</strong></td><td>Custom sort order</td><td><code>ORDER BY CASE WHEN... END</code></td></tr>
    <tr><td><strong>GROUP BY</strong></td><td>Group by category</td><td><code>GROUP BY CASE WHEN... END</code></td></tr>
    <tr><td><strong>Inside SUM/COUNT</strong></td><td>Conditional aggregation</td><td><code>SUM(CASE WHEN... THEN 1 END)</code></td></tr>
  </tbody>
</table>

<div class="note-callout note-tip">
  <strong>💡 Pro Move — CASE in ORDER BY:</strong>
</div>
<div class="note-code">ORDER BY
  <span class="code-hl">CASE</span> difficulty
    WHEN 'easy' THEN 1
    WHEN 'medium' THEN 2
    WHEN 'hard' THEN 3
  <span class="code-hl">END</span>;</div>`
        }
    ]
};
