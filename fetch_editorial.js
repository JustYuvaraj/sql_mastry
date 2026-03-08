
import fs from 'fs';
const slug = process.argv[2] || 'find-customer-referee';


async function fetchCommunitySolution(questionSlug) {
  const listQuery = `
    query ugcArticleSolutionArticles($questionSlug: String!, $orderBy: ArticleOrderByEnum, $userInput: String, $tagSlugs: [String!], $skip: Int, $first: Int) {
      ugcArticleSolutionArticles(
        questionSlug: $questionSlug
        orderBy: $orderBy
        userInput: $userInput
        tagSlugs: $tagSlugs
        skip: $skip
        first: $first
      ) {
        edges {
          node {
            topicId
            title
          }
        }
      }
    }
  `;

  const contentQuery = `
    query ugcArticleSolutionArticle($articleId: ID, $topicId: ID) {
      ugcArticleSolutionArticle(articleId: $articleId, topicId: $topicId) {
        content
      }
    }
  `;

  console.log(`Fetching top community solution for: ${questionSlug}...`);

  try {
    // 1. Get the top solution topicId
    const listResponse = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com'
      },
      body: JSON.stringify({
        query: listQuery,
        variables: {
          questionSlug,
          skip: 0,
          first: 1,
          orderBy: "MOST_VOTES",
          userInput: "",
          tagSlugs: []
        }
      }),
    });

    const listData = await listResponse.json();
    const topSolution = listData?.data?.ugcArticleSolutionArticles?.edges?.[0]?.node;

    if (!topSolution || !topSolution.topicId) {
      console.log('No community solutions found.');
      return null;
    }

    console.log(`Found solution: "${topSolution.title}". Fetching content...`);

    // 2. Get the full content
    const contentResponse = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com'
      },
      body: JSON.stringify({
        query: contentQuery,
        variables: { topicId: topSolution.topicId }
      }),
    });

    const contentData = await contentResponse.json();
    return contentData?.data?.ugcArticleSolutionArticle?.content || null;

  } catch (err) {
    console.error('Error fetching community solution:', err.message);
    return null;
  }
}

async function fetchEditorial(titleSlug) {
  const query = `
    query questionSolution($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        solution {
          content
          canSeeDetail
          paidOnly
        }
      }
    }
  `;

  console.log(`Fetching editorial for: ${titleSlug}...`);

  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      body: JSON.stringify({
        query,
        variables: { titleSlug },
      }),
    });

    const data = await response.json();
    const question = data.data.question;

    let content = null;
    if (question && question.solution && question.solution.content) {
      console.log('Official editorial found.');
      content = question.solution.content;
    } else {
      console.log('No official editorial found or premium only. Trying community fallback...');
      content = await fetchCommunitySolution(titleSlug);
    }

    if (content) {
      fs.writeFileSync('editorial_temp.txt', content);
      console.log('Success! Content saved to editorial_temp.txt');
    } else {
      console.log('Failed to retrieve any solution content.');
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

fetchEditorial(slug);
