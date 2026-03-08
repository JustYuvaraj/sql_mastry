import fs from 'fs';
import path from 'path';

const data = JSON.parse(fs.readFileSync('../unstop_problems_data.json', 'utf-8'));

// Category classification based on tags
// Priority order matters - first matching category wins
const categoryRules = [
    {
        key: 'joins',
        name: 'Joins & Cross Joins',
        file: 'joins.js',
        exportName: 'unstopJoins',
        matchTags: ['JOIN Operation', 'Cross Join', 'Self Join']
    },
    {
        key: 'window-functions',
        name: 'Window Functions',
        file: 'window-functions.js',
        exportName: 'unstopWindowFunctions',
        matchTags: ['Window Function']
    },
    {
        key: 'subqueries-ctes',
        name: 'Subqueries & CTEs',
        file: 'subqueries-ctes.js',
        exportName: 'unstopSubqueriesCtes',
        matchTags: ['SubQueries', 'Recursive CTEs', 'CTEs', 'Nested Queries', 'Subquerys', 'conditional subqueries']
    },
    {
        key: 'aggregation',
        name: 'Aggregation & GROUP BY',
        file: 'aggregation.js',
        exportName: 'unstopAggregation',
        matchTags: ['Aggregation Functions', 'Aggregate functions', 'group by', 'Having Clause']
    },
    {
        key: 'string-pattern',
        name: 'String & Pattern Matching',
        file: 'string-pattern.js',
        exportName: 'unstopStringPattern',
        matchTags: ['String Manipulation', 'pattern matching', 'regEx', 'concat', 'String Matching']
    },
    {
        key: 'date-time',
        name: 'Date & Time',
        file: 'date-time.js',
        exportName: 'unstopDateTime',
        matchTags: ['date manipulation', 'date handling', 'date filtering', 'Time Difference']
    },
    {
        key: 'set-operations',
        name: 'Set Operations & UNION',
        file: 'set-operations.js',
        exportName: 'unstopSetOperations',
        matchTags: ['set membership', 'UNION Operation', 'Union All', 'distinct']
    },
    {
        key: 'math-pagination',
        name: 'Math & Pagination',
        file: 'math-pagination.js',
        exportName: 'unstopMathPagination',
        matchTags: ['Mathematics, Counting', 'Math', 'Pagination', 'Modulo Operations', 'Probability and Statistics']
    },
    {
        key: 'filtering',
        name: 'Filtering & Conditions',
        file: 'filtering.js',
        exportName: 'unstopFiltering',
        matchTags: ['Filtering', 'case when', 'conditional logics', 'Boolean Operations', 'Conditionals', 'where']
    }
];

function classifyProblem(problem) {
    const tags = problem.tags.filter(t => t !== 'Sql' && t !== 'SQL');
    for (const rule of categoryRules) {
        if (tags.some(t => rule.matchTags.includes(t))) {
            return rule;
        }
    }
    // Default: filtering (catch-all)
    return categoryRules.find(r => r.key === 'filtering');
}

function buildDescription(p) {
    // Build a full HTML description from the problem data
    let html = '';

    // Clean escaped HTML from the API
    function cleanHtml(s) {
        if (!s) return '';
        return s
            .replace(/\\\//g, '/')      // Unescape forward slashes
            .replace(/\\n/g, '\n')       // Unescape newlines
            .replace(/\\t/g, '\t');      // Unescape tabs
    }

    // Problem statement
    if (p.problem_statement) {
        html += cleanHtml(p.problem_statement);
    }


    // Constraints
    if (p.constraints) {
        html += '<h3>Constraints</h3>' + cleanHtml(p.constraints);
    }

    return html;
}

function escapeForJS(str) {
    if (!str) return '';
    return str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '');
}

// Classify all problems
const categorized = {};
for (const rule of categoryRules) {
    categorized[rule.key] = [];
}

for (const p of data) {
    const rule = classifyProblem(p);

    // Build schema from sample test cases
    let schema = '';
    if (p.sample_testcases && p.sample_testcases.length > 0) {
        schema = p.sample_testcases[0].input || '';
    }

    categorized[rule.key].push({
        id: String(p.id),
        title: p.name,
        difficulty: p.difficulty,
        description: buildDescription(p),
        schema: schema,
        slug: p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''),
        originalCategory: rule.key,
        tags: p.tags.filter(t => t !== 'Sql' && t !== 'SQL'),
        sample_testcases: p.sample_testcases || []
    });
}

// Generate JS files
const outDir = path.join('.', 'problems', 'unstop');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

let totalProblems = 0;
const summary = [];

for (const rule of categoryRules) {
    const problems = categorized[rule.key];
    totalProblems += problems.length;

    // Sort: easy, medium, hard
    const diffOrder = { easy: 0, medium: 1, hard: 2 };
    problems.sort((a, b) => (diffOrder[a.difficulty] || 0) - (diffOrder[b.difficulty] || 0));

    let js = `// Unstop SQL Practice - ${rule.name}\n`;
    js += `export const ${rule.exportName} = [\n`;

    for (let i = 0; i < problems.length; i++) {
        const p = problems[i];
        js += '    {\n';
        js += `        "id": "${p.id}",\n`;
        js += `        "title": "${escapeForJS(p.title)}",\n`;
        js += `        "difficulty": "${p.difficulty}",\n`;
        js += `        "description": "${escapeForJS(p.description)}",\n`;
        js += `        "schema": ${JSON.stringify(p.schema)},\n`;
        js += `        "slug": "${escapeForJS(p.slug)}",\n`;
        js += `        "originalCategory": "${rule.key}",\n`;
        js += `        "tags": ${JSON.stringify(p.tags)},\n`;
        js += `        "sample_testcases": ${JSON.stringify(p.sample_testcases)}\n`;
        js += '    }' + (i < problems.length - 1 ? ',' : '') + '\n';
    }

    js += '];\n';

    const filePath = path.join(outDir, rule.file);
    fs.writeFileSync(filePath, js);

    summary.push(`  ${rule.name} (${rule.file}): ${problems.length} problems`);
}

console.log('Generated Unstop problem files:\n');
summary.forEach(s => console.log(s));
console.log(`\nTotal: ${totalProblems} problems`);
