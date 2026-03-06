import { selectbasics } from './problems/select-basics.js';
import { joins } from './problems/joins.js';
import { aggregates } from './problems/aggregates.js';
import { groupby } from './problems/group-by.js';
import { subqueries } from './problems/subqueries.js';
import { advanced } from './problems/advanced.js';
import { windowfunctions } from './problems/window-functions.js';
import { stringdate } from './problems/string-date.js';

const allCategories = {
    "Select": selectbasics,
    "Basic Joins": joins,
    "Basic Aggregate Functions": aggregates,
    "Sorting and Grouping": groupby,
    "Subqueries": subqueries,
    "Advanced Select and Joins": advanced,
    "Advanced String Functions / Regex / Clause": stringdate,
    "Window Functions": windowfunctions
};

// Flatten all problems into a single ordered list
const allProblems = [];
for (const [cat, probs] of Object.entries(allCategories)) {
    if (probs) probs.forEach(p => { p._category = cat; allProblems.push(p); });
}

let db = null;
let SQL = null;
let currentProblem = null;
let currentIndex = -1;

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

    // Perform multi-line replacements on the full string first
    let cleaned = mysqlSql
        .replace(/ENUM\s*\((?:[^)]|\n)*\)/gi, "VARCHAR(255)")
        .replace(/Truncate table \w+/gi, "")
        .replace(/unsigned/gi, "")
        .replace(/AUTO_INCREMENT/gi, "")
        .replace(/DEFAULT CHARSET=[a-z0-9]+/gi, "");

    // Now split and ensure semicolons
    return cleaned.split('\n')
        .map(line => {
            line = line.trim();
            if (line.length > 0 && !line.endsWith(';')) return line + ';';
            return line;
        })
        .filter(line => line.length > 0)
        .join('\n');
}

function resetDB(schema) {
    if (!SQL) return;
    db = new SQL.Database();
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

    for (const [catName, problems] of Object.entries(allCategories)) {
        if (!problems || problems.length === 0) continue;

        const group = document.createElement('div');
        group.className = 'category-group';

        const title = document.createElement('div');
        title.className = 'category-title';
        title.textContent = catName;
        group.appendChild(title);

        problems.forEach(prob => {
            const item = document.createElement('div');
            item.className = 'problem-item';
            item.dataset.slug = prob.slug;
            item.innerHTML = `
                <div class="problem-item-check"></div>
                <span class="problem-item-title">${prob.title}</span>
                <span class="problem-item-difficulty diff-${prob.difficulty}">${capitalize(prob.difficulty)}</span>
            `;
            item.onclick = () => selectProblem(prob);
            group.appendChild(item);
        });

        sidebar.appendChild(group);
    }
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ─── Select Problem ───
function selectProblem(prob) {
    currentProblem = prob;
    currentIndex = allProblems.indexOf(prob);

    // Switch to Description tab
    showTab('description');

    // Update problem list active state
    document.querySelectorAll('.problem-item').forEach(el => {
        el.classList.toggle('active', el.dataset.slug === prob.slug);
    });

    // Render description
    const view = document.getElementById('description-view');
    view.innerHTML = `
        <h2 class="problem-number-title">${prob.id}. ${prob.title}</h2>
        <div class="problem-tags">
            <span class="tag tag-${prob.difficulty}">${capitalize(prob.difficulty)}</span>
        </div>
        <div class="sql-schema-link">
            <span>SQL Schema</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"/>
            </svg>
        </div>
        <div class="description-body">${prob.description}</div>
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
    document.getElementById('results-container').innerHTML = '<div class="empty-state"><p>Click <strong>Run</strong> to see results</p></div>';

    // Load schema into DB
    resetDB(prob.schema);
}

// ─── Tab Switching ───
function showTab(tabName) {
    const descTab = document.getElementById('tab-description');
    const probTab = document.getElementById('tab-problems');
    const descView = document.getElementById('description-view');
    const probView = document.getElementById('problems-view');

    if (tabName === 'description') {
        descTab.classList.add('active');
        probTab.classList.remove('active');
        descView.style.display = '';
        probView.style.display = 'none';
    } else {
        descTab.classList.remove('active');
        probTab.classList.add('active');
        descView.style.display = 'none';
        probView.style.display = '';
    }
}

// ─── Run Query ───
function runQuery() {
    if (!db) return;
    const sql = document.getElementById('sql-editor').value;
    const container = document.getElementById('results-container');
    container.innerHTML = '';

    // Switch to Test Result tab
    document.getElementById('tab-result').classList.add('active');
    document.getElementById('tab-testcase').classList.remove('active');

    try {
        const res = db.exec(sql);
        if (res.length === 0) {
            container.innerHTML = '<div class="empty-state"><p class="success-msg">Query executed — no rows returned.</p></div>';
            return;
        }

        const columns = res[0].columns;
        const values = res[0].values;

        const table = document.createElement('table');
        table.className = 'results-table';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        columns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = col;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        values.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(val => {
                const td = document.createElement('td');
                td.textContent = val === null ? 'null' : val;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        container.appendChild(table);
    } catch (err) {
        container.innerHTML = `<div class="empty-state"><p class="error-msg">SQL Error: ${err.message}</p></div>`;
    }
}

// ─── Navigation (Prev / Next) ───
function navigatePrev() {
    if (currentIndex > 0) selectProblem(allProblems[currentIndex - 1]);
}
function navigateNext() {
    if (currentIndex < allProblems.length - 1) selectProblem(allProblems[currentIndex + 1]);
}

// ─── Draggable Gutter ───
function initGutter() {
    const gutter = document.getElementById('gutter');
    const left = document.getElementById('left-panel');
    const right = document.getElementById('right-panel');
    let isResizing = false;

    gutter.addEventListener('mousedown', () => { isResizing = true; document.body.style.cursor = 'col-resize'; });
    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        const containerWidth = document.querySelector('.workspace').offsetWidth;
        const newLeftWidth = ((e.clientX - 8) / containerWidth) * 100;
        if (newLeftWidth > 20 && newLeftWidth < 80) {
            left.style.flex = `0 0 ${newLeftWidth}%`;
            right.style.flex = `0 0 ${100 - newLeftWidth - 1}%`;
        }
    });
    document.addEventListener('mouseup', () => { isResizing = false; document.body.style.cursor = ''; });
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
    document.getElementById('tab-problems').onclick = () => showTab('problems');
    document.getElementById('problem-list-btn').onclick = () => showTab('problems');

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

    // Navigation
    document.getElementById('prev-btn').onclick = navigatePrev;
    document.getElementById('next-btn').onclick = navigateNext;

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            runQuery();
        }
    });

    // Auto-select first problem
    if (allProblems.length > 0) selectProblem(allProblems[0]);
});

// Helper for showing modal
window.showSchemaModal = function () {
    if (!currentProblem) return;
    const modal = document.getElementById('schema-modal');
    const content = document.getElementById('modal-schema-content');
    content.textContent = currentProblem.schema;
    modal.style.display = 'flex';
};
