import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
// import { chatWithBot } from "./src/utils/fetchHuggingFace.js";
import { getResponse } from "./src/utils/fetchOpenAI.js";
import { fetchNews } from "./src/utils/fetchNews.js";
import { displayEducationalResources } from "./src/utils/fetchEducation.js";
// import { startHigherLower } from "./src/gameLogic.js";

    const resolveAnimations = (ms = 3000) => new Promise((resolve) => setTimeout(resolve, ms));

    async function startGame() {
    const welcomeMsg = chalkAnimation.rainbow('Loading MoneyBuddyCLI... \n');
    await resolveAnimations();
    welcomeMsg.stop();

    console.clear();
    await mainMenu();
    }

    async function mainMenu() {
    console.log(chalk.greenBright(figlet.textSync('MoneyBuddyCLI')));

    const options = [
    {
        name: `${chalk.blueBright('MoneyBuddyAI')} - ${chalk.white('Chat with a virtual assistant.')}`,
        value: 'money_buddy'
    },
    {
        name: `${chalk.blueBright('Financial News')} - ${chalk.white('Get the latest market news')}`,
        value: 'news'
    },
    {
        name: `${chalk.blueBright('Investment Calculator')} - ${chalk.white('Calculate potential investment growth')}`,
        value: 'invest_calc'
    }, 
    {
        name: `${chalk.blueBright('Educational Resources')} - ${chalk.white('Learn about personal finance')}`,
        value: "education"
    }, 
    // {
    //     name: `${chalk.red('HigherLowerGame')} - ${chalk.white('Play a fun guessing game! ')}`,
    //     value: 'game'
    // },
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
        case 'invest_calc':
            await investmentCalculator();
            break;
        case 'education':
            await educationalResources();
            break;
        // case 'stock_lookup':
        //     await stockSearch();
        //     break;
        
        // TODO: FIGURE OUT WHY THIS DOESN'T WORK RIGHT !!!!!!!!!!!
        // case 'game': 
        //     await startHigherLower();
        //     
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

    // MoneyBuddyAI
    async function handleMoneyBuddy() {
        let continueChat = true;
      
        while (continueChat) {
          const { user_question } = await inquirer.prompt({
            name: 'user_question',
            type: 'input',
            message: 'Ask MoneyBuddy a question about finance (or type "exit" to return to the main menu):'
          });
      
          if (user_question.toLowerCase() === 'exit') {
            continueChat = false;
            console.log('Exiting MoneyBuddyAI chat...');
            break;
          }
      
          const response = await getResponse(user_question);
          console.log(chalk.greenBright('\nResponse:\n'), response);
        }
      
        await mainMenu();
      }
      
    // News
    async function financeNews() {
        console.log('Fetching the latest financial news...');
        await fetchNews();
        await resolveAnimations();
        await mainMenu();
    }

    // Calculator
    async function investmentCalculator() {
        console.log('Investment Calculator');
        
        const { initialInvestment } = await inquirer.prompt({
          name: 'initialInvestment',
          type: 'number',
          message: 'Enter the initial investment amount:'
        });
      
        const { interestRate } = await inquirer.prompt({
          name: 'interestRate',
          type: 'list',
          message: 'Select the type of investment:',
          choices: [
            { name: 'Savings Account (1.5%)', value: 0.015 },
            { name: 'Bonds (3%)', value: 0.03 },
            { name: 'Real Estate (5%)', value: 0.05 },
            { name: 'Stock Market (7%)', value: 0.07 },
            { name: 'Cryptocurrency (15%)', value: 0.15 },
          ]
        });
      
        const { years } = await inquirer.prompt({
          name: 'years',
          type: 'number',
          message: 'Enter the number of years:',
        });
      
        const finalAmount = initialInvestment * Math.pow((1 + interestRate), years);
        console.log(`\nAfter ${chalk.bold(years)} years, your investment will be worth about $${chalk.greenBright(finalAmount.toFixed(2))}.\n`);
      
        await mainMenu();
      }

    // Educational Resources
    async function educationalResources() {
        console.log('Providing educational resources...');
        await displayEducationalResources();
        await resolveAnimations();
        await mainMenu();
    }

    // Stock Look up
    async function stockSearch() {
        console.log('Providing stocks');
        //TODO: finish and call function from fetchStock.js
        await resolveAnimations();
        await mainMenu();
    }

    // HigherLowerGame
    async function startHigherLower() {
        //TODO: Call higherlowergame
    }

    // Secret
    async function display3DLogo() {
        console.clear();
        
        const logo1 = `
        ,ad8888ba,                            88                       88       ,ad8888ba,                             
       d8"'    \`"8b                           ""    ,d                 88      d8"'    \`"8b                            
      d8'                                           88                 88     d8'        \`8b                           
      88             ,adPPYYba,  8b,dPPYba,   88  MM88MMM  ,adPPYYba,  88     88          88  8b,dPPYba,    ,adPPYba,  
      88             ""     \`Y8  88P'    "8a  88    88     ""     \`Y8  88     88          88  88P'   \`"8a  a8P_____88  
      `;
      
        const logo2 = `
      Y8,            ,adPPPPP88  88       d8  88    88     ,adPPPPP88  88     Y8,        ,8P  88       88  8PP"""""""  
       Y8a.    .a8P  88,    ,88  88b,   ,a8"  88    88,    88,    ,88  88      Y8a.    .a8P   88       88  "8b,   ,aa  
        \`"Y8888Y"'   \`"8bbdP"Y8  88\`YbbdP"'   88    "Y888  \`"8bbdP"Y8  88       \`"Y8888Y"'    88       88   \`"Ybbd8"'  
                                 88                                                                                    
                                 88                                                                                    
      `;
      
        const logo3 = `
        888888888888  88b           d88  88b           d88      ad888888b,       ,d8    d8'  
             88       888b         d888  888b         d888     d8"     "88     ,d888   d8'   
             88       88\`8b       d8'88  88\`8b       d8'88             a8P   ,d8" 88  ""     
             88       88 \`8b     d8' 88  88 \`8b     d8' 88          ,d8P"  ,d8"   88         
             88       88  \`8b   d8'  88  88  \`8b   d8'  88        a8P"   ,d8"     88         
             88       88   \`8b d8'   88  88   \`8b d8'   88      a8P'     8888888888888       
             88       88    \`888'    88  88    \`888'    88     d8"                88         
             88       88     \`8'     88  88     \`8'     88     88888888888        88         
                                                                                             
      `;
      
        console.log(chalk.blue(logo1), chalk.red(logo2), chalk.white(logo3));
        await inquirer.prompt({
          name: 'key',
          type: 'input',
          message: 'Press Enter to return to menu...',
        });
        
        // Call mainMenu function if defined elsewhere
        await mainMenu();
      }
      

    console.clear();
    startGame();
