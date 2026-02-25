export const selectBasicsNotes = {
    category: "SELECT Basics",
    icon: "📋",
    color: "#6366f1",
    sections: [
        {
            title: "🧱 Core Syntax — The Execution Order (Most Important!)",
            content: `SQL does NOT execute in the order you write it. Knowing this prevents 90% of beginner errors.

WRITE ORDER:          EXECUTION ORDER:
SELECT                1️⃣  FROM      (which tables?)
FROM                  2️⃣  WHERE     (filter rows)
WHERE                 3️⃣  GROUP BY  (group rows)
GROUP BY              4️⃣  HAVING    (filter groups)
HAVING                5️⃣  SELECT    (pick columns)
ORDER BY              6️⃣  ORDER BY  (sort output)
LIMIT                 7️⃣  LIMIT     (cap rows)

💡 Key Insight: WHERE runs BEFORE SELECT, so you cannot use a SELECT alias inside WHERE.
   WRONG: SELECT salary * 1.1 AS new_sal WHERE new_sal > 50000
   RIGHT: SELECT salary * 1.1 AS new_sal WHERE salary * 1.1 > 50000`
        },
        {
            title: "📌 SELECT Clause — Every Trick You Need",
            content: `-- 1. Select all columns
SELECT * FROM employees;

-- 2. Select specific columns
SELECT name, salary FROM employees;

-- 3. Column alias (AS is optional)
SELECT name AS employee_name, salary annual_salary FROM employees;

-- 4. String literal in SELECT
SELECT name, 'Active' AS status FROM employees;

-- 5. Math in SELECT
SELECT name, salary, salary * 1.2 AS raise FROM employees;

-- 6. Concatenation (SQLite uses ||)
SELECT first_name || ' ' || last_name AS full_name FROM employees;

-- 7. DISTINCT — remove duplicates
SELECT DISTINCT department_id FROM employees;

-- 8. ROUND — control decimal places
SELECT name, ROUND(salary / 12.0, 2) AS monthly_salary FROM employees;

-- 9. COALESCE — replace NULL with a default
SELECT name, COALESCE(salary, 0) AS salary FROM employees;

-- 10. CASE WHEN inline (see full CASE section later)
SELECT name, CASE WHEN salary > 80000 THEN 'Senior' ELSE 'Junior' END AS level FROM employees;`
        },
        {
            title: "🔢 NULL — The Silent Killer",
            content: `NULL is not a value — it is the ABSENCE of a value.

Rules of NULL:
  NULL = NULL   → FALSE  (use IS NULL instead)
  NULL != NULL  → FALSE
  NULL + 5      → NULL   (any arithmetic with NULL = NULL)
  NULL OR TRUE  → TRUE   (special case)
  NULL AND FALSE → FALSE  (special case)

✅ Correct checks:
  WHERE column IS NULL
  WHERE column IS NOT NULL
  COALESCE(column, 'default')   -- replace NULL with a value
  NULLIF(column, 0)             -- turn 0 into NULL (useful for DIV/0)

❌ Wrong:
  WHERE column = NULL  -- always returns 0 rows!

💡 Interview Trap: COUNT(*) counts all rows including NULLs.
   COUNT(column) skips NULLs. Always clarify which count you want.`
        },
        {
            title: "🔤 String Functions (SQLite)",
            content: `-- Length of string
SELECT LENGTH(name) FROM employees;

-- Upper / Lower case
SELECT UPPER(name), LOWER(email) FROM employees;

-- Substring (1-indexed!)
SELECT SUBSTR(name, 1, 3) AS first3 FROM employees;  -- first 3 chars
SELECT SUBSTR(name, -3)   AS last3  FROM employees;  -- last 3 chars

-- Replace
SELECT REPLACE(email, '@company.com', '') AS username FROM employees;

-- Trim whitespace
SELECT TRIM(name) FROM employees;
SELECT LTRIM(name), RTRIM(name) FROM employees;

-- Find position (INSTR)
SELECT INSTR(email, '@') AS at_pos FROM employees;

-- Concatenation
SELECT name || ' — ' || department_id AS label FROM employees;

-- LIKE pattern matching
'%abc%'   → contains "abc"
'abc%'    → starts with "abc"
'%abc'    → ends with "abc"
'a_c'     → a, any 1 char, c (underscore = 1 wildcard char)

-- Case-insensitive by default in SQLite for ASCII
WHERE name LIKE 'john%'   -- matches John, JOHN, john`
        },
        {
            title: "🔢 Number Functions",
            content: `-- Absolute value
SELECT ABS(salary - 80000) AS diff FROM employees;

-- Round, Floor, Ceil
SELECT ROUND(3.7)   -- 4
SELECT ROUND(3.456, 2) -- 3.46
-- SQLite has no FLOOR/CEIL — use CAST workaround:
CAST(3.9 AS INTEGER)  -- 3 (truncates toward zero)

-- Integer division
SELECT 7 / 2    -- 3 (integer division in SQLite if both operands are INT)
SELECT 7 / 2.0  -- 3.5 (float division)

-- Modulo (remainder)
SELECT 7 % 3    -- 1

-- Power / Square Root (SQLite does not have POWER/SQRT natively)
-- Use: exp(n * log(x)) for power, or just avoid in SQLite interviews

💡 Tip: Always use 100.0 * count / total (not 100 * count / total) to avoid integer division truncating to 0.`
        },
        {
            title: "📅 Date Functions (SQLite)",
            content: `-- SQLite stores dates as TEXT: 'YYYY-MM-DD'

-- Current date / time
SELECT date('now');          -- '2024-02-25'
SELECT datetime('now');      -- '2024-02-25 09:30:00'

-- Extract parts of a date using strftime
SELECT strftime('%Y', hire_date) AS year   FROM employees;
SELECT strftime('%m', hire_date) AS month  FROM employees;
SELECT strftime('%d', hire_date) AS day    FROM employees;
SELECT strftime('%Y-%m', hire_date) AS yearmonth FROM employees;
SELECT strftime('%w', hire_date) AS weekday FROM employees;
-- %w: 0=Sunday, 1=Monday ... 6=Saturday

-- Date arithmetic
SELECT date(hire_date, '+30 days')  AS future FROM employees;
SELECT date(hire_date, '-1 year')   AS past   FROM employees;
SELECT date(hire_date, '+1 month')          FROM employees;

-- Difference between dates (in days)
SELECT julianday('2024-12-31') - julianday(hire_date) AS days_employed FROM employees;

-- Cast text date to year as integer
SELECT CAST(strftime('%Y', hire_date) AS INTEGER) AS hire_year FROM employees;

💡 Must-Know Pattern (LeetCode 197 — Rising Temperature):
SELECT a.id FROM weather a JOIN weather b
  ON julianday(a.date) - julianday(b.date) = 1
  WHERE a.temperature > b.temperature;`
        },
        {
            title: "🏆 ORDER BY — Sorting Like a Pro",
            content: `-- Ascending (default)
SELECT * FROM employees ORDER BY salary;

-- Descending
SELECT * FROM employees ORDER BY salary DESC;

-- Multi-column sort
SELECT * FROM employees ORDER BY department_id ASC, salary DESC;

-- Sort by column position (avoid in interviews, use names)
SELECT name, salary FROM employees ORDER BY 2 DESC;

-- Sort by expression
SELECT name, salary FROM employees ORDER BY salary * 1.2 DESC;

-- NULLs sort LAST in ASC, FIRST in DESC (SQLite default)
-- To push NULLs last always:
ORDER BY CASE WHEN col IS NULL THEN 1 ELSE 0 END, col

-- Sort by CASE WHEN (custom order)
ORDER BY CASE difficulty
  WHEN 'easy' THEN 1
  WHEN 'medium' THEN 2
  WHEN 'hard' THEN 3
END`
        },
        {
            title: "📏 LIMIT & OFFSET (Pagination)",
            content: `-- Top N rows
SELECT * FROM employees ORDER BY salary DESC LIMIT 5;

-- Skip first N rows, take next M (pagination)
SELECT * FROM employees ORDER BY id LIMIT 10 OFFSET 20;
-- Equivalent:
SELECT * FROM employees ORDER BY id LIMIT 20, 10;  -- LIMIT offset, count

-- Second highest salary (classic interview trap!)
-- WRONG: ORDER BY salary DESC LIMIT 1, 1 -- fails if no 2nd distinct value
-- RIGHT pattern (handles NULLs and ties):
SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);
-- OR:
SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;`
        },
        {
            title: "⚡ DISTINCT vs GROUP BY",
            content: `-- DISTINCT: remove duplicate rows in final output
SELECT DISTINCT department_id FROM employees;
SELECT DISTINCT department_id, job_title FROM employees; -- distinct COMBINATIONS

-- GROUP BY: collapse rows into groups for aggregation
SELECT department_id, COUNT(*) FROM employees GROUP BY department_id;

-- They are NOT the same:
-- DISTINCT just de-dupes. GROUP BY allows aggregate functions.

-- COUNT(DISTINCT col) — count unique values of ONE column
SELECT COUNT(DISTINCT department_id) AS num_departments FROM employees;

-- 💡 Trick: You can SELECT a column not in GROUP BY in SQLite (non-standard!)
-- but in PostgreSQL/MySQL this would be an error. Avoid it in interviews.`
        },
        {
            title: "🎯 Must-Know Interview Patterns",
            content: `-- Pattern 1: Second Highest (LeetCode 176)
SELECT MAX(salary) AS SecondHighestSalary
FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);

-- Pattern 2: Nth Highest (generalised)
SELECT salary FROM employees
ORDER BY salary DESC LIMIT 1 OFFSET (N-1);  -- replace N

-- Pattern 3: Duplicate detection
SELECT email, COUNT(*) FROM employees
GROUP BY email HAVING COUNT(*) > 1;

-- Pattern 4: Self-referencing (LeetCode 181)
SELECT e.name FROM employees e
JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary;

-- Pattern 5: Rolling/Running aggregation
SELECT *, SUM(salary) OVER (ORDER BY id) AS running_total FROM employees;

-- Pattern 6: Percentage calculation
SELECT dept, ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM employees), 2) AS pct
FROM employees GROUP BY dept;

-- Pattern 7: Safe division (avoid DIV/0)
SELECT CASE WHEN total = 0 THEN 0 ELSE numerator * 1.0 / total END FROM t;`
        },
        {
            title: "🚫 Common Mistakes to Avoid",
            content: `1. WHERE salary = NULL        ❌  →  WHERE salary IS NULL          ✅
2. WHERE alias > 5000         ❌  →  WHERE column > 5000            ✅
3. SELECT 5 / 2 = 2 (integer) ❌  →  SELECT 5 / 2.0 = 2.5          ✅
4. LIKE '%John'  (wrong case) ❌  →  LIKE '%John%' or ILIKE       check
5. ORDER BY in subquery       ❌  →  ORDER BY only in final SELECT  ✅
6. SELECT * in subquery       ❌  →  Always select specific columns ✅
7. Forgetting DISTINCT        ❌  →  Duplicates silently appear      ⚠️
8. COUNT(col) vs COUNT(*)     ⚠️  →  COUNT(col) skips NULLs
9. Modifying table in subquery (same table) — use alias trick
10. Forgetting semicolons... (only matters in multi-statement scripts)`
        },
        {
            title: "📝 Cheat Sheet — Quick Reference",
            content: `SELECT [DISTINCT] col1, col2, expr AS alias
FROM table_name
WHERE condition
GROUP BY col1
HAVING aggregate_condition
ORDER BY col1 [ASC|DESC]
LIMIT n [OFFSET m];

Key Functions:
  String: LENGTH, UPPER, LOWER, SUBSTR, REPLACE, TRIM, INSTR, LIKE
  Number: ABS, ROUND, MOD(%), CAST, COALESCE, NULLIF
  Date:   strftime('%Y/%m/%d/%w', date), julianday, date(col, '+N days')
  Null:   IS NULL, IS NOT NULL, COALESCE(col, default)

Aggregate (use with GROUP BY or window):
  COUNT(*), COUNT(col), SUM, AVG, MIN, MAX

Key Keywords:
  DISTINCT, AS, CASE WHEN...THEN...ELSE...END
  BETWEEN x AND y  ← inclusive on both ends
  IN (v1, v2, v3)
  LIKE 'pattern', NOT LIKE
  IS NULL, IS NOT NULL`
        }
    ]
};
