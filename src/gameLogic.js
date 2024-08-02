import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { classicMode } from './classicMode.js';
import { timedMode } from './timedMode.js';


const resolveAnimations = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));

async function startHigherLower() {
  const welcomeMsg = chalkAnimation.rainbow('Welcome to the Higher Lower Game Spotify Version! \n');
  await resolveAnimations();
  welcomeMsg.stop();

  await mainMenu();
}

async function mainMenu() {
  console.clear();
  console.log(chalk.greenBright(figlet.textSync('Higher/Lower Spotify Version')));

  const options = [
    {
      name: 'Classic Mode - Guess which artist has more followers.',
      value: 'classic'
    },
    {
      name: 'Timed Mode - Play Against the Clock!',
      value: 'timed'
    },
    {
      name: 'Leaderboard - View the top scores.',
      value: 'leaderboard'
    },
    {
      name: 'Exit',
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
    case 'classic':
      await classicMode();
      break;
    case 'timed':
      await timedMode();
      break;
    case 'leaderboard':
      await showLeaderboard();
      break;
    case 'exit':
      console.log('Goodbye!');
      process.exit(0);
  }
}


export { startHigherLower };