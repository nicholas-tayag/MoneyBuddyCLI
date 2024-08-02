//TODO: import Alpha Vantage API
import dotenv from 'dotenv';

dotenv.config();

// TODO: Finish logic for api key
const alpha = new ({
    apiKey: process.env.ALPHA_VANTAGE_KEY,
  });


// TODO: Finish stock search function
async function stockSearch() {
    const { symbol } = await inquirer.prompt({
      name: 'symbol',
      type: 'input',
      message: 'Enter the stock symbol you want to look up:',
    });
  

    await mainMenu();
  }
  
