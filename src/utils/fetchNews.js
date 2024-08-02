import axios from 'axios';
import dotenv from 'dotenv';
import chalk from 'chalk';

// Load from .env file
dotenv.config();

const API_KEY = process.env.NEWS_API_KEY; // API Key
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

// fetch news function
async function fetchNews() {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        category: 'business',
        language: 'en',
        apiKey: API_KEY,
      },
    });

    // Limit articles displayed to 5 total
    const articles = response.data.articles.slice(0, 5);

    console.log(chalk.gray('---------------------------------------'));
    articles.forEach((article, index) => {
      console.log(chalk.bold.blue(`${index + 1}. ${article.title}`));
      console.log(chalk.red(`   Source: ${article.source.name}`));
      console.log(chalk.white(`   Description: ${article.description}`));
      console.log(chalk.gray(`   URL: ${article.url}`));
      console.log(chalk.gray('---------------------------------------'));
    });
  } catch (error) {
    console.error(chalk.red('Error fetching news:'), error.message);
  }
}

export { fetchNews };
