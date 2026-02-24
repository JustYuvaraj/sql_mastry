// SQL Interview Mastery — Main Application
import { categories, allProblems } from './problems/index.js';
import { initializeDatabase } from './db/schema.js';

// ===== Global State =====
let db = null;
let currentProblem = null;
let solved = new Set(JSON.parse(localStorage.getItem('sqlMasterySolved') || '[]'));

// ===== Initialize sql.js =====
async function initDB() {
    const SQL = await initSqlJs({
        locateFile: file => `https://sql.js.org/dist/${file}`
    });
    db = new SQL.Database();
    initializeDatabase(db);
    console.log('✅ Database initialized with sample data');
}

// ===== Load sql.js from CDN =====
function loadSqlJs() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://sql.js.org/dist/sql-wasm.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// ===== Render Sidebar =====
function renderSidebar() {
    const list = document.getElementById('problemList');
    list.innerHTML = '';

    categories.forEach(cat => {
        const solvedInCat = cat.problems.filter(p => solved.has(p.id)).length;

        // Category header
        const header = document.createElement('div');
        header.className = 'category-header';
        header.innerHTML = `
      <span>${cat.icon} ${cat.name} (${solvedInCat}/${cat.problems.length})</span>
      <span class="arrow">▼</span>
    `;
        header.addEventListener('click', () => {
            header.classList.toggle('collapsed');
            items.classList.toggle('collapsed');
        });
        list.appendChild(header);

        // Problem items
        const items = document.createElement('div');
        items.className = 'category-items';
        items.style.maxHeight = '2000px';

        cat.problems.forEach(problem => {
            const item = document.createElement('div');
            item.className = `problem-item ${solved.has(problem.id) ? 'solved' : ''} ${currentProblem?.id === problem.id ? 'active' : ''}`;
            item.innerHTML = `
        <span class="diff-dot ${problem.difficulty}"></span>
        <span>${problem.id}. ${problem.title}</span>
      `;
            item.addEventListener('click', () => loadProblem(problem));
            items.appendChild(item);
        });

        list.appendChild(items);
    });

    updateProgress();
}

// ===== Load Problem =====
function loadProblem(problem) {
    currentProblem = problem;

    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('problemView').style.display = 'block';

    document.getElementById('problemId').textContent = `#${problem.id}`;
    document.getElementById('problemTitle').textContent = problem.title;
    document.getElementById('problemDesc').textContent = problem.description;

    const diffBadge = document.getElementById('difficultyBadge');
    diffBadge.textContent = problem.difficulty;
    diffBadge.className = `difficulty-badge ${problem.difficulty}`;

    document.getElementById('categoryBadge').textContent = problem.category;

    // Reset editor and results
    document.getElementById('sqlEditor').value = '';
    document.getElementById('resultsArea').innerHTML = '<p class="placeholder-text">Run your query to see results here</p>';
    document.getElementById('resultStatus').textContent = '';
    document.getElementById('resultStatus').className = 'result-status';
    document.getElementById('hintBox').style.display = 'none';
    document.getElementById('solutionBox').style.display = 'none';
    document.getElementById('expectedSection').style.display = 'none';

    // Show expected output
    showExpectedOutput(problem);

    // Update sidebar active state
    document.querySelectorAll('.problem-item').forEach(el => el.classList.remove('active'));
    const items = document.querySelectorAll('.problem-item');
    items.forEach(el => {
        if (el.textContent.includes(`${problem.id}. ${problem.title}`)) {
            el.classList.add('active');
        }
    });

    // Scroll to top
    document.getElementById('mainContent').scrollTop = 0;
}

// ===== Show Expected Output =====
function showExpectedOutput(problem) {
    try {
        const results = db.exec(problem.solution);
        if (results.length > 0) {
            document.getElementById('expectedSection').style.display = 'block';
            document.getElementById('expectedArea').innerHTML = renderTable(results[0]);
        }
    } catch (e) {
        console.error('Error generating expected output:', e);
    }
}

// ===== Run Query =====
function runQuery() {
    const sql = document.getElementById('sqlEditor').value.trim();
    if (!sql) {
        showError('Please enter a SQL query');
        return;
    }

    try {
        const results = db.exec(sql);
        if (results.length === 0) {
            document.getElementById('resultsArea').innerHTML = '<p class="placeholder-text">Query executed successfully. No rows returned.</p>';
            document.getElementById('resultStatus').textContent = '✓ Success';
            document.getElementById('resultStatus').className = 'result-status success';
        } else {
            document.getElementById('resultsArea').innerHTML = renderTable(results[0]);
            document.getElementById('resultStatus').textContent = `✓ ${results[0].values.length} row(s)`;
            document.getElementById('resultStatus').className = 'result-status success';

            // Check if result matches expected
            if (currentProblem) {
                checkAnswer(results[0]);
            }
        }
    } catch (e) {
        showError(e.message);
    }
}

// ===== Check Answer =====
function checkAnswer(userResult) {
    try {
        const expectedResults = db.exec(currentProblem.solution);
        if (expectedResults.length === 0) return;

        const expected = expectedResults[0];
        const isCorrect =
            JSON.stringify(userResult.columns) === JSON.stringify(expected.columns) &&
            JSON.stringify(userResult.values) === JSON.stringify(expected.values);

        if (isCorrect) {
            document.getElementById('resultStatus').textContent = '🎉 Correct!';
            document.getElementById('resultStatus').className = 'result-status success';
            solved.add(currentProblem.id);
            localStorage.setItem('sqlMasterySolved', JSON.stringify([...solved]));
            renderSidebar();
        }
    } catch (e) {
        // silently fail comparison
    }
}

// ===== Render Table =====
function renderTable(result) {
    let html = '<table class="result-table"><thead><tr>';
    result.columns.forEach(col => {
        html += `<th>${col}</th>`;
    });
    html += '</tr></thead><tbody>';

    result.values.forEach(row => {
        html += '<tr>';
        row.forEach(val => {
            html += `<td>${val === null ? 'NULL' : val}</td>`;
        });
        html += '</tr>';
    });

    html += '</tbody></table>';
    return html;
}

// ===== Show Error =====
function showError(message) {
    document.getElementById('resultsArea').innerHTML = `<p class="error-text">❌ Error: ${message}</p>`;
    document.getElementById('resultStatus').textContent = '✗ Error';
    document.getElementById('resultStatus').className = 'result-status error';
}

// ===== Update Progress =====
function updateProgress() {
    const total = allProblems.length;
    const solvedCount = solved.size;
    const pct = (solvedCount / total * 100).toFixed(1);

    document.getElementById('progressBar').style.width = `${pct}%`;
    document.getElementById('progressText').textContent = `${solvedCount} / ${total} solved`;
    document.getElementById('totalCount').textContent = total;
}

// ===== Search =====
function setupSearch() {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.problem-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? '' : 'none';
        });

        // Show all categories when searching
        if (query) {
            document.querySelectorAll('.category-items').forEach(el => {
                el.classList.remove('collapsed');
            });
            document.querySelectorAll('.category-header').forEach(el => {
                el.classList.remove('collapsed');
            });
        }
    });
}

// ===== Navigation =====
function setupNavigation() {
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (!currentProblem) return;
        const idx = allProblems.findIndex(p => p.id === currentProblem.id);
        if (idx > 0) loadProblem(allProblems[idx - 1]);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        if (!currentProblem) return;
        const idx = allProblems.findIndex(p => p.id === currentProblem.id);
        if (idx < allProblems.length - 1) loadProblem(allProblems[idx + 1]);
    });
}

// ===== Button Handlers =====
function setupButtons() {
    document.getElementById('runBtn').addEventListener('click', runQuery);

    document.getElementById('hintBtn').addEventListener('click', () => {
        if (!currentProblem) return;
        const box = document.getElementById('hintBox');
        if (box.style.display === 'none') {
            box.textContent = `💡 ${currentProblem.hint}`;
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
    });

    document.getElementById('solutionBtn').addEventListener('click', () => {
        if (!currentProblem) return;
        const box = document.getElementById('solutionBox');
        if (box.style.display === 'none') {
            box.textContent = currentProblem.solution;
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        document.getElementById('sqlEditor').value = '';
        document.getElementById('resultsArea').innerHTML = '<p class="placeholder-text">Run your query to see results here</p>';
        document.getElementById('resultStatus').textContent = '';
        document.getElementById('resultStatus').className = 'result-status';
        document.getElementById('hintBox').style.display = 'none';
        document.getElementById('solutionBox').style.display = 'none';
    });

    // Ctrl+Enter to run
    document.getElementById('sqlEditor').addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            runQuery();
        }
        // Tab key inserts spaces
        if (e.key === 'Tab') {
            e.preventDefault();
            const editor = e.target;
            const start = editor.selectionStart;
            editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(editor.selectionEnd);
            editor.selectionStart = editor.selectionEnd = start + 2;
        }
    });
}

// ===== Initialize App =====
async function init() {
    try {
        await loadSqlJs();
        await initDB();
        renderSidebar();
        setupSearch();
        setupNavigation();
        setupButtons();
        console.log(`🚀 SQL Mastery loaded with ${allProblems.length} problems`);
    } catch (e) {
        console.error('Failed to initialize:', e);
        document.getElementById('welcomeScreen').innerHTML = `
      <div class="welcome-inner">
        <h2>⚠️ Loading Error</h2>
        <p>Failed to initialize SQLite. Please check your internet connection and refresh.</p>
        <p style="color: var(--danger); font-family: var(--font-mono); font-size: 0.8rem;">${e.message}</p>
      </div>
    `;
    }
}

init();
