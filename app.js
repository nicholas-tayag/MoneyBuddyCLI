import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { chatWithBot } from "./src/utils/fetchHuggingFace.js";
import { fetchNews } from "./src/utils/fetchNews.js";
import { displayEducationalResources } from "./src/utils/fetchEducation.js";
import { startHigherLower } from "./src/gameLogic.js";

    const resolveAnimations = (ms = 3000) => new Promise((resolve) => setTimeout(resolve, ms));

    async function startGame() {
    const welcomeMsg = chalkAnimation.rainbow('Loading MoneyBuddyCLI... \n');
    await resolveAnimations();
    welcomeMsg.stop();

    console.clear();
    await mainMenu();
    }

    async function mainMenu() {
    console.log(chalk.blueBright(figlet.textSync('MoneyBuddyCLI')));

    const options = [
    {
        name: `${chalk.red('MoneyBuddyAI')} - ${chalk.white('Chat with a virtual assistant.')}`,
        value: 'money_buddy'
    },
    {
        name: `${chalk.red('Financial News')} - ${chalk.white('Get the latest market news')}`,
        value: 'news'
    },
    {
        name: `${chalk.red('Stock Price Lookup')} - ${chalk.white('Check current stock rices')}`,
        value: 'stock_price'
    }, 
    {
        name: `${chalk.red('Educational Resources')} - ${chalk.white('Learn about personal finance')}`,
        value: "education"
    }, 
    {
        name: `${chalk.red('HigherLowerGame')} - ${chalk.white('Play a recreated Higher Lower Game ')}`,
        value: 'game'
    },
    {
        name: `${chalk.red('🕵️')}`,
        value: 'secret'
    },
    {
        name:  `${chalk.redBright('Exit')}`,
        value: 'exit'
    }
    ];

    const choice = await inquirer.prompt({
        name: 'menu_choice',
        type: 'list',
        message: 'Choose an option:',
        choices: options
    });

    switch (choice.menu_choice) {
    case 'money_buddy':
        await handleMoneyBuddy();
        break;
    case 'news':
        await financeNews();
        break;
    case 'stock_price':
        await stockPrice();
        break;
    case 'education':
        await educationalResources();
        break;
    case 'game':
        await startHigherLower();
        break;
    case 'secret':
        await display3DLogo();
        break;
    case 'exit':
        console.log('Thanks for using MoneyBuddy!');
        process.exit(0);
    default:
        console.log('Invalid choice, please try again.');
        await mainMenu();
    }
    }

    // Handle MoneyBuddy option
    async function handleMoneyBuddy() {
        const { user_question } = await inquirer.prompt({
            name: 'user_question',
            type: 'input',
            message: 'Ask the MoneyBuddy a question about finance:'
    });
        await chatWithBot(user_question);
        await mainMenu();
    }

    // Handle Financial News
    async function financeNews() {
        console.log('Fetching the latest financial news...');
        await fetchNews();
        await resolveAnimations();
        await mainMenu();
    }

    // Handle Stock Price Lookup
    async function stockPrice() {
        console.log('Checking current stock prices...');
        // Implement the logic to lookup stock prices
        await resolveAnimations();
        console.log('Stock price lookup feature is not yet implemented.');
        await mainMenu();
    }

    // Handle Educational Resources
    async function educationalResources() {
        console.log('Providing educational resources...');
        await displayEducationalResources();
        await resolveAnimations();
        await mainMenu();
    }

    async function display3DLogo() {
        console.clear();
        const logo = `
  ,ad8888ba,                            88                       88        ,ad8888ba,                             
 d8"'    \`"8b                           ""    ,d                 88       d8"'    \`"8b                            
d8'                                           88                 88      d8'        \`8b                           
88             ,adPPYYba,  8b,dPPYba,   88  MM88MMM  ,adPPYYba,  88      88          88  8b,dPPYba,    ,adPPYba,  
88             ""     \`Y8  88P'    "8a  88    88     ""     \`Y8  88      88          88  88P'   \`"8a  a8P_____88  
Y8,            ,adPPPPP88  88       d8  88    88     ,adPPPPP88  88      Y8,        ,8P  88       88  8PP"""""""  
 Y8a.    .a8P  88,    ,88  88b,   ,a8"  88    88,    88,    ,88  88       Y8a.    .a8P   88       88  "8b,   ,aa  
  \`"Y8888Y"'   \`"8bbdP"Y8  88\`YbbdP"'   88    "Y888  \`"8bbdP"Y8  88        \`"Y8888Y"'    88       88   \`"Ybbd8"'  
                           88                                                                                     
                           88                                                                                     
`;

      
        console.log(chalk.blue(logo));
        await inquirer.prompt({
          name: 'key',
          type: 'input',
          message: 'Press Enter to return to menu...',
        });
        await mainMenu();
      }


    console.clear();
    startGame();
