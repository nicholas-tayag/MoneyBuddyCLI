import chalk from 'chalk';

const educationalResources = [
  {
    title: "Understanding Personal Finance",
    description: "A comprehensive guide to managing your personal finances, including budgeting, saving, and investing.",
    url: "https://www.investopedia.com/personal-finance-4427766"
  },
  {
    title: "Investing Basics",
    description: "An introduction to the basics of investing, covering different types of investments and strategies.",
    url: "https://www.investopedia.com/investing-4427781"
  },
  {
    title: "Building a Budget",
    description: "Learn how to create a budget that helps you manage your expenses and save for your goals.",
    url: "https://www.nerdwallet.com/article/finance/how-to-budget"
  },
  {
    title: "Retirement Planning",
    description: "A guide to planning for retirement, including how to estimate your retirement needs and choose the right accounts.",
    url: "https://www.fidelity.com/viewpoints/retirement/how-much-money-do-i-need-to-retire"
  },
  {
    title: "Understanding Credit Scores",
    description: "A detailed explanation of credit scores, how they are calculated, and how to improve them.",
    url: "https://www.experian.com/blogs/news/2019/10/credit-score-basics/"
  }
];

// display educational resources function
async function displayEducationalResources() {
  console.log(chalk.bold.yellow("Educational Resources on Finance:"));
  console.log(chalk.white("Here are some useful resources to help you learn more about finance."));
  console.log('');
  console.log(chalk.white('---------------------------------------'));
  
  educationalResources.forEach((resource, index) => {  
    console.log(chalk.blueBright(`${index + 1}. ${resource.title}`));
    console.log(chalk.red(`   ${resource.description}`));
    console.log(chalk.gray(`   URL: ${resource.url}`));
    console.log(chalk.white('---------------------------------------'));
  });
}

export { displayEducationalResources };
