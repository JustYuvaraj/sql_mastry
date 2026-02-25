export const stringDateNotes = {
    category: "String & Date",
    icon: "📅",
    color: "#a855f7",
    sections: [
        {
            title: "🔤 String Functions",
            content: `
<table class="note-table">
  <thead>
    <tr><th>Function</th><th>Example</th><th>Result</th></tr>
  </thead>
  <tbody>
    <tr><td><code>LENGTH(s)</code></td><td><code>LENGTH('Hello')</code></td><td>5</td></tr>
    <tr><td><code>UPPER(s)</code></td><td><code>UPPER('hello')</code></td><td>HELLO</td></tr>
    <tr><td><code>LOWER(s)</code></td><td><code>LOWER('HELLO')</code></td><td>hello</td></tr>
    <tr><td><code>SUBSTR(s, start, len)</code></td><td><code>SUBSTR('Hello', 1, 3)</code></td><td>Hel</td></tr>
    <tr><td><code>REPLACE(s, old, new)</code></td><td><code>REPLACE('abc', 'b', 'x')</code></td><td>axc</td></tr>
    <tr><td><code>TRIM(s)</code></td><td><code>TRIM('  hi  ')</code></td><td>hi</td></tr>
    <tr><td><code>INSTR(s, find)</code></td><td><code>INSTR('a@b.com', '@')</code></td><td>2</td></tr>
    <tr><td><code>s1 || s2</code></td><td><code>'Hi' || ' World'</code></td><td>Hi World</td></tr>
  </tbody>
</table>

<div class="note-grid">
<div class="note-card">
  <h4>LIKE Patterns</h4>
  <div class="note-code"><span class="code-hl">%</span>  = any chars  <span class="code-hl">_</span> = 1 char

'J%'     → starts with J
'%son'   → ends with "son"
'%oh%'   → contains "oh"
'_o%'    → 2nd char is "o"</div>
</div>
<div class="note-card">
  <h4>Extract Domain from Email</h4>
  <div class="note-code">SELECT
  SUBSTR(email,
    <span class="code-hl">INSTR(email,'@')+1</span>
  ) AS domain
FROM users;</div>
</div>
</div>`
        },
        {
            title: "📅 Date Functions (SQLite)",
            content: `
<table class="note-table">
  <thead>
    <tr><th>Function</th><th>Example</th><th>Result</th></tr>
  </thead>
  <tbody>
    <tr><td><code>date('now')</code></td><td>Current date</td><td><code>'2024-02-25'</code></td></tr>
    <tr><td><code>strftime('%Y', d)</code></td><td>Extract year</td><td><code>'2024'</code></td></tr>
    <tr><td><code>strftime('%m', d)</code></td><td>Extract month</td><td><code>'02'</code></td></tr>
    <tr><td><code>strftime('%d', d)</code></td><td>Extract day</td><td><code>'25'</code></td></tr>
    <tr><td><code>strftime('%w', d)</code></td><td>Weekday (0=Sun)</td><td><code>'2'</code></td></tr>
    <tr><td><code>strftime('%Y-%m', d)</code></td><td>Year-Month</td><td><code>'2024-02'</code></td></tr>
  </tbody>
</table>

<h4 style="margin-top:20px;">Date Arithmetic</h4>
<div class="note-code">date(col, '<span class="code-hl">+30 days</span>')    <span class="code-comment">-- add 30 days</span>
date(col, '<span class="code-hl">-1 year</span>')     <span class="code-comment">-- subtract 1 year</span>
date(col, '<span class="code-hl">+3 months</span>')   <span class="code-comment">-- add 3 months</span>

<span class="code-comment">-- Day difference:</span>
<span class="code-hl">julianday</span>('2024-12-31') - julianday(hire_date)</div>`
        },
        {
            title: "🎯 Interview Patterns",
            content: `
<div class="note-grid">

<div class="note-card pattern">
  <h4>Year/Month Grouping</h4>
  <div class="note-code">SELECT
  <span class="code-hl">strftime('%Y-%m', date)</span>
    AS month,
  COUNT(*) AS orders
FROM orders
GROUP BY month;</div>
</div>

<div class="note-card pattern">
  <h4>Consecutive Days (LC 197)</h4>
  <div class="note-code">SELECT a.id
FROM weather a
JOIN weather b ON
  <span class="code-hl">julianday(a.date)</span>
  <span class="code-hl">- julianday(b.date) = 1</span>
WHERE a.temp > b.temp;</div>
</div>

<div class="note-card pattern">
  <h4>Filter Last 30 Days</h4>
  <div class="note-code">WHERE order_date >=
  <span class="code-hl">date('now', '-30 days')</span>;</div>
</div>

<div class="note-card pattern">
  <h4>Day-of-Week Report</h4>
  <div class="note-code">SELECT
  CASE strftime('%w', date)
    WHEN '0' THEN 'Sunday'
    WHEN '1' THEN 'Monday'
    <span class="code-comment">-- ... etc</span>
  END AS day_name,
  COUNT(*) FROM orders
GROUP BY day_name;</div>
</div>

</div>`
        }
    ]
};
