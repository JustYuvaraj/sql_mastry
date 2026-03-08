import { selectbasics } from './problems/select-basics.js';
import { joins } from './problems/joins.js';
import { aggregates } from './problems/aggregates.js';
import { groupby } from './problems/group-by.js';
import { subqueries } from './problems/subqueries.js';
import { advanced } from './problems/advanced.js';
import { windowfunctions } from './problems/window-functions.js';
import { stringdate } from './problems/string-date.js';

// Unstop problem imports
import { unstopJoins } from './problems/unstop/joins.js';
import { unstopAggregation } from './problems/unstop/aggregation.js';
import { unstopFiltering } from './problems/unstop/filtering.js';
import { unstopWindowFunctions } from './problems/unstop/window-functions.js';
import { unstopStringPattern } from './problems/unstop/string-pattern.js';
import { unstopDateTime } from './problems/unstop/date-time.js';
import { unstopSubqueriesCtes } from './problems/unstop/subqueries-ctes.js';
import { unstopMathPagination } from './problems/unstop/math-pagination.js';
import { unstopSetOperations } from './problems/unstop/set-operations.js';

const leetcodeCategories = {
    "Select": selectbasics,
    "Basic Joins": joins,
    "Basic Aggregate Functions": aggregates,
    "Sorting and Grouping": groupby,
    "Subqueries": subqueries,
    "Advanced Select and Joins": advanced,
    "Advanced String Functions / Regex / Clause": stringdate,
    "Window Functions": windowfunctions
};

const unstopCategories = {
    "Joins & Cross Joins": unstopJoins,
    "Aggregation & GROUP BY": unstopAggregation,
    "Window Functions": unstopWindowFunctions,
    "String & Pattern Matching": unstopStringPattern,
    "Subqueries & CTEs": unstopSubqueriesCtes,
    "Date & Time": unstopDateTime,
    "Set Operations & UNION": unstopSetOperations,
    "Math & Pagination": unstopMathPagination,
    "Filtering & Conditions": unstopFiltering
};

// Section state
let currentSection = 'leetcode';
function getActiveCategories() {
    return currentSection === 'leetcode' ? leetcodeCategories : unstopCategories;
}
function getActiveProblems() {
    const cats = getActiveCategories();
    const arr = [];
    for (const [cat, probs] of Object.entries(cats)) {
        if (probs) probs.forEach(p => {
            p._category = cat;
            p.type = currentSection;
            arr.push(p);
        });
    }
    return arr;
}

// Backward compat alias
const allCategories = leetcodeCategories;
const allProblems = getActiveProblems();

let db = null;
let SQL = null;
let currentProblem = null;
let currentIndex = -1;

// ─── Persistent Completion Tracking ───
const STORAGE_KEY = 'sql_mastery_solved';
function getSolvedSet() {
    try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')); }
    catch { return new Set(); }
}
function saveSolvedSet(s) { localStorage.setItem(STORAGE_KEY, JSON.stringify([...s])); }
function isSolved(slug) { return getSolvedSet().has(slug); }
function toggleSolved(slug) {
    const s = getSolvedSet();
    if (s.has(slug)) s.delete(slug); else s.add(slug);
    saveSolvedSet(s);
    updateCheckbox(slug);
}
function markSolved(slug) {
    const s = getSolvedSet();
    s.add(slug);
    saveSolvedSet(s);
    updateCheckbox(slug);
}
function updateCheckbox(slug) {
    const item = document.querySelector(`.problem-item[data-slug="${slug}"]`);
    if (!item) return;
    const check = item.querySelector('.problem-item-check');
    if (isSolved(slug)) {
        item.classList.add('solved');
        check.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2cbb5d" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
    } else {
        item.classList.remove('solved');
        check.innerHTML = '';
    }
}

// ─── Initialize SQL.js ───
async function initSQL() {
    const config = {
        locateFile: filename => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.wasm`
    };
    SQL = await initSqlJs(config);
    console.log("SQL.js initialized");
}

// ─── MySQL → SQLite Schema Cleaner ───
function cleanSchema(mysqlSql) {
    if (!mysqlSql) return "";

    // 1. Basic keyword cleaning
    let cleaned = mysqlSql
        .replace(/\r/g, "")
        .replace(/--.*$/gm, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/ENUM\s*\((?:[^)]|\n)*\)/gi, "VARCHAR(255)")
        .replace(/Truncate\s+table\s+\w+\s*;?/gi, "")
        .replace(/\bunsigned\b/gi, "")
        .replace(/\bAUTO_INCREMENT\b/gi, "")
        .replace(/DEFAULT\s+CHARSET\s*=\s*[a-z0-9]+/gi, "")
        .replace(/ENGINE\s*=\s*\w+/gi, "")
        .replace(/`/g, "")
        .replace(/\bDECIMAL\s*\(\s*\d+\s*,\s*\d+\s*\)/gi, "REAL")
        .replace(/COLLATE\s+\w+/gi, "")
        .replace(/CHARACTER\s+SET\s+\w+/gi, "");

    // 2. Semicolon handling
    // If the original has NO semicolons at all (common in some LeetCode sets), 
    // we assume one statement per line and add them.
    if (!mysqlSql.includes(';')) {
        return cleaned.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(line => line + ';')
            .join('\n');
    }

    // 3. Otherwise, just return cleaned version, preserving statement structure
    return cleaned.trim();
}

function resetDB(schema) {
    if (!SQL) return;
    db = new SQL.Database();

    // ─── MySQL Polyfills ───
    try {
        // IF(condition, true_val, false_val)
        db.create_function("IF", (cond, t, f) => cond ? t : f);

        // CONCAT(s1, s2, ...)
        db.create_function("CONCAT", (...args) => args.join(''));

        // DATEDIFF(d1, d2) -> Returns difference in days (d1 - d2)
        db.create_function("DATEDIFF", (d1, d2) => {
            if (!d1 || !d2) return null;
            const date1 = new Date(d1);
            const date2 = new Date(d2);
            const diffTime = date1 - date2;
            return Math.floor(diffTime / (1000 * 60 * 60 * 24));
        });

        // YEAR(d), MONTH(d), DAY(d)
        db.create_function("YEAR", (d) => d ? new Date(d).getFullYear() : null);
        db.create_function("MONTH", (d) => d ? new Date(d).getMonth() + 1 : null);
        db.create_function("DAY", (d) => d ? new Date(d).getDate() : null);

        // Alias for common string functions
        db.create_function("SUBSTRING", (...args) => {
            const s = args[0];
            const start = args[1];
            const len = args[2];
            if (s === null || s === undefined) return null;
            return len !== undefined ? s.substring(start - 1, (start - 1) + len) : s.substring(start - 1);
        });
        db.create_function("CHAR_LENGTH", (s) => (s !== null && s !== undefined) ? s.length : 0);
        db.create_function("LENGTH", (s) => (s !== null && s !== undefined) ? s.length : 0);
        db.create_function("UPPER", (s) => s ? s.toUpperCase() : s);
        db.create_function("LOWER", (s) => s ? s.toLowerCase() : s);
        db.create_function("REPLACE", (s, from, to) => s ? s.split(from).join(to) : s);
        db.create_function("TRIM", (s) => s ? s.trim() : s);
        db.create_function("LEFT", (s, n) => s ? s.substring(0, n) : s);
        db.create_function("RIGHT", (s, n) => s ? s.substring(s.length - n) : s);

        // Math functions
        db.create_function("ROUND", (n, d = 0) => {
            if (n === null || n === undefined) return null;
            return Number(Math.round(n + "e" + d) + "e-" + d);
        });
        db.create_function("CEIL", (n) => n !== null ? Math.ceil(n) : null);
        db.create_function("CEILING", (n) => n !== null ? Math.ceil(n) : null);
        db.create_function("FLOOR", (n) => n !== null ? Math.floor(n) : null);
        db.create_function("ABS", (n) => n !== null ? Math.abs(n) : null);

        // Logic & Nulls
        db.create_function("COALESCE", (...args) => args.find(a => a !== null && a !== undefined) ?? null);
        db.create_function("IFNULL", (a, b) => a ?? b);
        db.create_function("NULLIF", (a, b) => a === b ? null : a);

        // MOD(n, m)
        db.create_function("MOD", (n, m) => n % m);

        // CURDATE(), NOW(), CURTIME()
        db.create_function("CURDATE", () => new Date().toISOString().split('T')[0]);
        db.create_function("NOW", () => new Date().toISOString().replace('T', ' ').split('.')[0]);
        db.create_function("CURTIME", () => new Date().toTimeString().split(' ')[0]);

    } catch (err) {
        console.error("Failed to register MySQL polyfills:", err.message);
    }

    try {
        const cleaned = cleanSchema(schema);
        // Use exec() to support multiple statements (CREATE + INSERTs)
        db.exec(cleaned);
    } catch (err) {
        console.error("Schema injection error:", err.message);
    }
}

// ─── Render Problem List (Left Panel: Problems Tab) ───
function renderProblemList() {
    const sidebar = document.getElementById('sidebar-content');
    sidebar.innerHTML = '';
    const cats = getActiveCategories();
    let totalCount = 0;

    for (const [catName, problems] of Object.entries(cats)) {
        if (!problems || problems.length === 0) continue;
        totalCount += problems.length;

        const group = document.createElement('div');
        group.className = 'category-group';

        const title = document.createElement('div');
        title.className = 'category-title';
        title.textContent = catName;
        group.appendChild(title);

        problems.forEach(prob => {
            const item = document.createElement('div');
            item.className = 'problem-item' + (isSolved(prob.slug) ? ' solved' : '');
            item.dataset.slug = prob.slug;

            const check = document.createElement('div');
            check.className = 'problem-item-check';
            if (isSolved(prob.slug)) {
                check.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2cbb5d" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
            }
            check.onclick = (e) => { e.stopPropagation(); toggleSolved(prob.slug); };
            item.appendChild(check);

            const title = document.createElement('span');
            title.className = 'problem-item-title';
            title.textContent = prob.title;
            item.appendChild(title);

            const diff = document.createElement('span');
            diff.className = `problem-item-difficulty diff-${prob.difficulty}`;
            diff.textContent = capitalize(prob.difficulty);
            item.appendChild(diff);

            item.onclick = () => selectProblem(prob);
            group.appendChild(item);
        });

        sidebar.appendChild(group);
    }

    // Update counter
    document.getElementById('problem-counter').textContent = `0 / ${totalCount}`;
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// Format inline code by replacing single-quoted words with <code> tags, except inside HTML tags
function formatInlineCode(html) {
    if (!html) return '';

    // Match standard quotes, smart quotes, backticks, and HTML quote entities
    // $1 = preceding boundary (start, space, >, ()
    // $2 = the core text (no HTML brackets or newlines)
    const quotePattern = /(^|[\s>(])(?:&lsquo;|&apos;|&#39;|['‘`])([^<’\n]+?)(?:&rsquo;|&apos;|&#39;|['’`])(?=[\s<).,:;!?]|$)/g;

    // We run it twice to catch adjacent quoted words e.g. 'a', 'b', 'c' where they share boundary spaces/punctuation in the regex lookarounds
    let result = html.replace(quotePattern, '$1<code>$2</code>');
    result = result.replace(quotePattern, '$1<code>$2</code>');
    return result;
}

// ─── Select Problem ───
function selectProblem(prob) {
    currentProblem = prob;
    currentIndex = getActiveProblems().indexOf(prob);

    // Switch to Description tab
    showTab('description');

    // Update problem list active state
    document.querySelectorAll('.problem-item').forEach(el => {
        el.classList.toggle('active', el.dataset.slug === prob.slug);
    });

    let cleanDescription = prob.description || '';
    if (prob.type === 'unstop') {
        const tc = prob.sample_testcases && prob.sample_testcases.length > 0 ? prob.sample_testcases[0] : null;

        if (tc) {
            let exampleDataHtml = tc.explanation ? tc.explanation : '';

            if (tc.output) {
                let outputHTML = '';
                try {
                    const parsed = parseUnstopOutput(tc.output)[0];
                    if (parsed && parsed.columns.length > 0) {
                        outputHTML = generateTableHTML(parsed.columns, parsed.values);
                    } else {
                        outputHTML = `<div class="expected-output" style="font-family: monospace; white-space: pre-wrap; padding: 12px; border: 1px solid var(--border-light); background: var(--bg-layer-2); border-radius: 6px;">${tc.output}</div>`;
                    }
                } catch (e) {
                    outputHTML = `<div class="expected-output" style="font-family: monospace; white-space: pre-wrap; padding: 12px; border: 1px solid var(--border-light); background: var(--bg-layer-2); border-radius: 6px;">${tc.output}</div>`;
                }

                if (outputHTML) {
                    exampleDataHtml += `
                        <h4 style="margin-top: 24px; margin-bottom: 12px; color: var(--text-primary); font-size: 15px; font-weight: 600;">Expected Output</h4>
                        <div class="table-container">${outputHTML}</div>
                    `;
                }
            }

            if (exampleDataHtml) {
                cleanDescription += `<div class="example-data-section"><h3 style="margin-top: 24px; margin-bottom: 16px; color: var(--text-primary);">Example Data</h3>${exampleDataHtml}</div>`;
            }
        }
    }

    // Apply inline code formatting
    cleanDescription = formatInlineCode(cleanDescription);

    // Render description
    const view = document.getElementById('description-view');
    view.innerHTML = `
        <h2 class="problem-number-title">${prob.id}. ${prob.title}</h2>
        <div class="problem-tags">
            <span class="tag tag-${prob.difficulty}">${capitalize(prob.difficulty)}</span>
        </div>
        <div class="sql-schema-link" style="${prob.type === 'unstop' ? 'display: none;' : ''}">
            <span>SQL Schema</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"/>
            </svg>
        </div>
        <div class="description-body">${cleanDescription}</div>
    `;

    // Attach click handler to the newly created schema link
    const schemaLink = view.querySelector('.sql-schema-link');
    if (schemaLink) {
        schemaLink.onclick = () => showSchemaModal();
    }

    // Update bottom bar
    document.getElementById('difficulty-label').textContent = capitalize(prob.difficulty);

    // Update counter
    document.getElementById('problem-counter').textContent = `${currentIndex + 1} / ${allProblems.length}`;

    // Reset editor
    document.getElementById('sql-editor').value = '-- Write your MySQL query statement below\n';
    document.getElementById('result-view').innerHTML = '<div class="empty-state"><p>Click <strong>Run</strong> to see results</p></div>';

    // Render test cases
    renderTestcases(prob);
    showResultTab('testcase');

    // Load schema into DB
    resetDB(prob.schema);
}

// ─── Tab Switching ───
function showTab(tabName) {
    const descTab = document.getElementById('tab-description');
    const editTab = document.getElementById('tab-editorial');
    const descView = document.getElementById('description-view');
    const probView = document.getElementById('problems-view');
    const editView = document.getElementById('editorial-view');

    descTab.classList.toggle('active', tabName === 'description');
    editTab.classList.toggle('active', tabName === 'editorial');

    descView.style.display = tabName === 'description' ? '' : 'none';
    probView.style.display = tabName === 'problems' ? '' : 'none';
    editView.style.display = tabName === 'editorial' ? '' : 'none';

    if (tabName === 'editorial' && currentProblem) {
        showEditorial(currentProblem);
    }
}

function showResultTab(tabName) {
    const tcTab = document.getElementById('tab-testcase');
    const resTab = document.getElementById('tab-result');
    const tcView = document.getElementById('testcase-view');
    const resView = document.getElementById('result-view');

    tcTab.classList.toggle('active', tabName === 'testcase');
    resTab.classList.toggle('active', tabName === 'result');

    tcView.style.display = tabName === 'testcase' ? '' : 'none';
    resView.style.display = tabName === 'result' ? '' : 'none';
}


// ─── Editorial rendering ───
function showEditorial(problem) {
    const view = document.getElementById('editorial-view');
    if (!problem.editorial) {
        view.innerHTML = `
            <div class="empty-state">
                <p>No editorial available for this problem yet.</p>
                ${problem.slug ? `<p><small>You can find it on LeetCode: <a href="https://leetcode.com/problems/${problem.slug}/editorial/" target="_blank" style="color:var(--text-link)">${problem.title} Editorial</a></small></p>` : ''}
            </div>`;
        return;
    }

    // Use marked for high-fidelity Markdown/HTML rendering
    const contentHtml = typeof marked !== 'undefined' ? marked.parse(problem.editorial) : problem.editorial;

    view.innerHTML = `
        <div class="editorial-header">
            <div class="editorial-title">Editorial: ${problem.title}</div>
        </div>
        <div class="editorial-body">
            ${contentHtml}
        </div>
    `;
}

// ─── Testcase rendering ───
function renderTestcases(problem) {
    const selector = document.getElementById('testcase-tabs');
    const details = document.getElementById('testcase-details');

    if (!problem.sample_testcases || problem.sample_testcases.length === 0) {
        selector.innerHTML = '';
        details.innerHTML = '<div class="empty-state"><p>No test cases available for this problem.</p></div>';
        return;
    }

    selector.innerHTML = problem.sample_testcases.map((tc, i) => `
        <button class="case-btn ${i === 0 ? 'active' : ''}" data-index="${i}">Case ${i + 1}</button>
    `).join('');

    const showCase = (index) => {
        const tc = problem.sample_testcases[index];

        // Parse expected output TSV into columns and values
        let outputHTML = '';
        if (tc.output) {
            const parsed = parseUnstopOutput(tc.output)[0];
            if (parsed && parsed.columns.length > 0) {
                outputHTML = generateTableHTML(parsed.columns, parsed.values);
            } else {
                outputHTML = `<div class="expected-output">${tc.output}</div>`;
            }
        }

        details.innerHTML = `
            <div class="case-label">Input (Schema Initialization)</div>
            <div class="expected-output" style="max-height: 120px; font-size: 11px; overflow-y: auto; background: var(--bg-layer-1); border: 1px solid var(--border); padding: 8px; border-radius: 4px; font-family: 'JetBrains Mono', monospace;">${tc.input || 'Default Schema'}</div>
            
            <div class="case-label" style="margin-top: 16px;">Expected Output</div>
            <div class="table-container">${outputHTML || 'No expected output provided.'}</div>
        `;
    };

    // Initial first case
    showCase(0);

    // Click handlers
    selector.querySelectorAll('.case-btn').forEach(btn => {
        btn.onclick = () => {
            selector.querySelectorAll('.case-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showCase(parseInt(btn.dataset.index));
        };
    });
}

function parseUnstopOutput(tsv) {
    if (!tsv) return [];
    // Handle both Unix and Windows newlines
    const lines = tsv.trim().split(/\r?\n/).map(l => l.split('\t'));
    if (lines.length === 0) return [];

    const columns = lines[0].map(c => c.trim());
    const values = lines.slice(1).map(row => row.map(val => val.trim()));

    return [{ columns, values }];
}

/**
 * Generates a consistent HTML table string for a given set of columns and values.
 */
function generateTableHTML(columns, values) {
    if (!columns || columns.length === 0) return '';

    return `
        <table class="results-table">
            <thead>
                <tr>
                    ${columns.map(col => `<th>${col}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${values.map(row => `
                    <tr>
                        ${row.map(val => `<td>${val === null || val === 'NULL' ? '<span class="text-tertiary">null</span>' : val}</td>`).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ─── Run Query ───

function runQuery() {
    if (!currentProblem || !db) return;
    const query = document.getElementById('sql-editor').value;
    if (!query.trim()) {
        document.getElementById('result-view').innerHTML = '<div class="empty-state"><p>Enter a query and click <strong>Run</strong></p></div>';
        showResultTab('result');
        return;
    }
    try {
        resetDB(currentProblem.schema);
        const res = db.exec(query);
        renderResults(res);
        // Switch to result tab
        showResultTab('result');
    } catch (err) {
        document.getElementById('result-view').innerHTML = `<div class="empty-state"><p class="error-msg">${err.message}</p></div>`;
        showResultTab('result');
    }
}

// ─── Submit Query ───
async function submitQuery() {
    if (!currentProblem) return;

    const query = document.getElementById('sql-editor').value;
    const resultView = document.getElementById('result-view');
    resultView.innerHTML = '<div class="empty-state"><p>Submitting...</p></div>';
    showResultTab('result');

    // Simulate a bit of latency for effect
    await new Promise(r => setTimeout(r, 600));

    try {
        // Reset and run user query
        resetDB(currentProblem.schema);
        const userRes = db.exec(query);

        // If we have a solution query (LeetCode set)
        if (currentProblem.solution) {
            const expectedRes = db.exec(currentProblem.solution);
            const isCorrect = compareResults(userRes, expectedRes);
            showStatus(isCorrect);
        }
        // If we have sample testcases (Unstop set)
        else if (currentProblem.sample_testcases && currentProblem.sample_testcases.length > 0) {
            // Compare against first test case
            const expectedRes = parseUnstopOutput(currentProblem.sample_testcases[0].output);
            const isCorrect = compareResults(userRes, expectedRes);
            showStatus(isCorrect);
        }
        else {
            // Fallback to just running if no solution/testcase available
            renderResults(userRes);
            showResultTab('result');
        }

    } catch (err) {
        document.getElementById('result-view').innerHTML = `<div class="empty-state"><p class="error-msg">SQL Error: ${err.message}</p></div>`;
        showResultTab('result');
    }
}

function showStatus(isCorrect) {
    const container = document.getElementById('result-view');
    showResultTab('result');

    if (isCorrect) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="status-accepted">
                   <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#2cbb5d" stroke-width="2" style="margin-bottom:16px;">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <h3 style="color:#2cbb5d; font-size:24px; margin-bottom:8px;">Accepted</h3>
                    <p style="color:var(--text-secondary)">Runtime: ${Math.floor(Math.random() * 50) + 10} ms</p>
                </div>
            </div>
        `;
        // Mark as solved persistently
        markSolved(currentProblem.slug);
    } else {
        container.innerHTML = `
            <div class="empty-state">
                <div class="status-error">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ef4743" stroke-width="2" style="margin-bottom:16px;">
                        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    <h3 style="color:#ef4743; font-size:24px; margin-bottom:8px;">Wrong Answer</h3>
                    <p style="color:var(--text-secondary)">Your output does not match the expected result.</p>
                </div>
            </div>
        `;
    }
}


function compareResults(res1, res2) {
    if (res1.length !== res2.length) return false;
    for (let i = 0; i < res1.length; i++) {
        const r1 = res1[i];
        const r2 = res2[i];
        if (r1.columns.length !== r2.columns.length) return false;
        if (r1.values.length !== r2.values.length) return false;

        // Simple comparison: stringify values. 
        if (JSON.stringify(r1.values) !== JSON.stringify(r2.values)) return false;
    }
    return true;
}

// ─── Helper to render results (extracted from runQuery) ───
function renderResults(res) {
    const container = document.getElementById('result-view');
    container.innerHTML = '';

    if (!res || res.length === 0) {
        container.innerHTML = '<div class="empty-state"><p class="success-msg">Query executed — no rows returned.</p></div>';
        return;
    }

    const { columns, values } = res[0];
    container.innerHTML = generateTableHTML(columns, values);
}

// ─── Navigation (Prev / Next) ───
function navigatePrev() {
    const probs = getActiveProblems();
    if (currentIndex > 0) selectProblem(probs[currentIndex - 1]);
}
function navigateNext() {
    const probs = getActiveProblems();
    if (currentIndex < probs.length - 1) selectProblem(probs[currentIndex + 1]);
}

// ─── Draggable Gutter ───
function initGutter() {
    const gutter = document.getElementById('gutter');
    const left = document.getElementById('left-panel');
    const right = document.getElementById('right-panel');
    let isResizing = false;

    gutter.addEventListener('mousedown', (e) => {
        if (window.innerWidth <= 768) return; // Disable resizing on mobile
        isResizing = true;
        document.body.style.cursor = 'col-resize';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing || window.innerWidth <= 768) return;
        const containerWidth = document.querySelector('.workspace').offsetWidth;
        const newLeftWidth = ((e.clientX - 8) / containerWidth) * 100;
        if (newLeftWidth > 20 && newLeftWidth < 80) {
            left.style.flex = `0 0 ${newLeftWidth}%`;
            right.style.flex = `0 0 ${100 - newLeftWidth - 1}%`;
        }
    });

    document.addEventListener('mouseup', () => {
        isResizing = false;
        document.body.style.cursor = '';
    });

    // Handle window resize: reset flex if moving from mobile to desktop or vice versa
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            left.style.flex = '';
            right.style.flex = '';
        }
    });
}

// ─── Code Editor Line Numbers & Sync ───
function updateLineNumbers() {
    const editor = document.getElementById('sql-editor');
    const lineNumbers = document.getElementById('line-numbers');
    const text = editor.value;
    const lines = text.split('\n').length;

    // Calculate current line based on cursor position
    const cursorPos = editor.selectionStart;
    const currentLine = text.substring(0, cursorPos).split('\n').length;

    let html = '';
    for (let i = 1; i <= lines; i++) {
        const activeClass = i === currentLine ? 'active' : '';
        html += `<div class="${activeClass}">${i}</div>`;
    }
    lineNumbers.innerHTML = html;
}

function initEditorSync() {
    const editor = document.getElementById('sql-editor');
    const lineNumbers = document.getElementById('line-numbers');

    editor.addEventListener('input', updateLineNumbers);
    editor.addEventListener('click', updateLineNumbers);
    editor.addEventListener('keyup', updateLineNumbers);

    // Sync scrolling
    editor.addEventListener('scroll', () => {
        lineNumbers.scrollTop = editor.scrollTop;
    });
}

// ─── App Init ───
document.addEventListener('DOMContentLoaded', async () => {
    await initSQL();
    renderProblemList();
    initGutter();
    initEditorSync();
    updateLineNumbers();

    // Tab clicks
    document.getElementById('tab-description').onclick = () => showTab('description');
    document.getElementById('tab-editorial').onclick = () => showTab('editorial');
    document.getElementById('problem-list-btn').onclick = () => showTab('problems');

    // Result tabs
    document.getElementById('tab-testcase').onclick = () => showResultTab('testcase');
    document.getElementById('tab-result').onclick = () => showResultTab('result');

    // Modal Close
    document.getElementById('close-modal').onclick = () => {
        document.getElementById('schema-modal').style.display = 'none';
    };
    window.onclick = (event) => {
        const modal = document.getElementById('schema-modal');
        if (event.target == modal) modal.style.display = 'none';
    };

    // Run query
    document.getElementById('run-btn').onclick = runQuery;
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) submitBtn.onclick = submitQuery;

    // Navigation
    document.getElementById('prev-btn').onclick = navigatePrev;
    document.getElementById('next-btn').onclick = navigateNext;

    // Section toggle
    document.querySelectorAll('.section-btn').forEach(btn => {
        btn.onclick = () => {
            const section = btn.dataset.section;
            if (section === currentSection) return;
            currentSection = section;
            document.querySelectorAll('.section-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProblemList();
            const probs = getActiveProblems();
            if (probs.length > 0) selectProblem(probs[0]);
            showTab('problems');
        };
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            runQuery();
        }
    });

    // Auto-select first problem
    const initialProblems = getActiveProblems();
    if (initialProblems.length > 0) selectProblem(initialProblems[0]);
});

// Helper for showing modal
window.showSchemaModal = function () {
    if (!currentProblem) return;
    const modal = document.getElementById('schema-modal');
    const content = document.getElementById('modal-schema-content');
    content.textContent = currentProblem.schema;
    modal.style.display = 'flex';
};

// ─── Webcam Overlay ───
(function () {
    const toggleBtn = document.getElementById('camera-toggle-btn');
    const overlay = document.getElementById('webcam-overlay');
    const video = document.getElementById('webcam-video');
    const closeBtn = document.getElementById('webcam-close-btn');
    const pipBtn = document.getElementById('webcam-pip-btn');
    const sizeBtns = document.querySelectorAll('.webcam-size-btn');
    const dragHandle = document.getElementById('webcam-drag-handle');

    let stream = null;
    let isOpen = false;

    // Default size
    overlay.classList.add('size-sm');

    // ─── Open / Close ───
    async function openCamera() {
        if (!stream) {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                video.srcObject = stream;
            } catch (err) {
                alert('Could not access camera: ' + err.message);
                return;
            }
        }
        overlay.classList.remove('hidden');
        toggleBtn.classList.add('cam-active');
        isOpen = true;
    }

    function closeCamera() {
        overlay.classList.add('hidden');
        toggleBtn.classList.remove('cam-active');
        isOpen = false;
    }

    function stopStream() {
        if (stream) {
            stream.getTracks().forEach(t => t.stop());
            stream = null;
            video.srcObject = null;
        }
    }

    toggleBtn.addEventListener('click', () => {
        isOpen ? closeCamera() : openCamera();
    });

    closeBtn.addEventListener('click', () => {
        closeCamera();
        stopStream();
    });

    // ─── Size Controls ───
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            overlay.classList.remove('size-sm', 'size-md', 'size-lg');
            overlay.classList.add('size-' + btn.dataset.size);
        });
    });

    // ─── Picture-in-Picture ───
    pipBtn.addEventListener('click', async () => {
        if (!video.srcObject) return;
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else {
                await video.requestPictureInPicture();
            }
        } catch (err) {
            console.warn('PiP not supported:', err);
        }
    });

    // ─── Dragging ───
    let dragging = false;
    let startX, startY, startRight, startBottom;

    dragHandle.addEventListener('mousedown', (e) => {
        dragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = overlay.getBoundingClientRect();
        startRight = window.innerWidth - rect.right;
        startBottom = window.innerHeight - rect.bottom;
        overlay.style.transition = 'none';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        overlay.style.right = Math.max(0, startRight - dx) + 'px';
        overlay.style.bottom = Math.max(0, startBottom - dy) + 'px';
        overlay.style.left = 'auto';
        overlay.style.top = 'auto';
    });

    document.addEventListener('mouseup', () => {
        if (dragging) {
            dragging = false;
            overlay.style.transition = '';
        }
    });
})();
