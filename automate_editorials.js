
import fs from 'fs';
import path from 'path';

const PROBLEMS_DIR = './problems';


async function fetchCommunitySolution(questionSlug) {
    const listQuery = `query ugcArticleSolutionArticles($questionSlug: String!, $orderBy: ArticleOrderByEnum, $userInput: String, $tagSlugs: [String!], $skip: Int, $first: Int) { ugcArticleSolutionArticles(questionSlug: $questionSlug orderBy: $orderBy userInput: $userInput tagSlugs: $tagSlugs skip: $skip first: $first) { edges { node { topicId title } } } }`;
    const contentQuery = `query ugcArticleSolutionArticle($articleId: ID, $topicId: ID) { ugcArticleSolutionArticle(articleId: $articleId, topicId: $topicId) { content } }`;

    try {
        const listResponse = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Referer': 'https://leetcode.com' },
            body: JSON.stringify({
                query: listQuery,
                variables: { questionSlug, skip: 0, first: 1, orderBy: "MOST_VOTES", userInput: "", tagSlugs: [] }
            }),
        });
        const listData = await listResponse.json();
        const topSolution = listData?.data?.ugcArticleSolutionArticles?.edges?.[0]?.node;

        if (!topSolution?.topicId) return null;

        const contentResponse = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Referer': 'https://leetcode.com' },
            body: JSON.stringify({ query: contentQuery, variables: { topicId: topSolution.topicId } }),
        });
        const contentData = await contentResponse.json();
        return contentData?.data?.ugcArticleSolutionArticle?.content || null;
    } catch (err) {
        return null;
    }
}

async function fetchEditorial(titleSlug) {
    const query = `
    query questionSolution($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        solution {
          content
        }
      }
    }
  `;

    try {
        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com'
            },
            body: JSON.stringify({ query, variables: { titleSlug } }),
        });

        const data = await response.json();
        let content = data?.data?.question?.solution?.content;

        if (!content) {
            content = await fetchCommunitySolution(titleSlug);
        }

        return content || null;
    } catch (err) {
        console.error(`Error fetching ${titleSlug}:`, err.message);
        return null;
    }
}

async function processFiles() {
    const files = fs.readdirSync(PROBLEMS_DIR).filter(f => f.endsWith('.js'));

    for (const file of files) {
        const filePath = path.join(PROBLEMS_DIR, file);
        let content = fs.readFileSync(filePath, 'utf-8');

        // Find all slugs in the file
        const slugRegex = /"slug":\s*"([^"]+)"/g;
        let match;
        const slugs = [];
        while ((match = slugRegex.exec(content)) !== null) {
            slugs.push(match[1]);
        }

        console.log(`\nProcessing ${file} (${slugs.length} problems)...`);

        for (const slug of slugs) {
            // Check if editorial already exists to avoid redundant fetches
            const editorialRegex = new RegExp(`"slug":\\s*"${slug}"[\\s\\S]*?"editorial":`, 'g');
            if (editorialRegex.test(content)) {
                console.log(`- ${slug}: Editorial already exists, skipping.`);
                continue;
            }

            console.log(`- ${slug}: Fetching editorial...`);
            const editorial = await fetchEditorial(slug);

            if (editorial) {
                // Inject editorial property after slug
                const target = new RegExp(`("slug":\\s*"${slug}")`, 'g');
                const replacement = `$1,\n        "editorial": \`${editorial.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\``;
                content = content.replace(target, replacement);
                console.log(`  Done.`);
            } else {
                console.log(`  No editorial found.`);
            }
        }

        fs.writeFileSync(filePath, content);
    }

    console.log('\nAll files processed!');
}

processFiles();
