// fetchHuggingFace.js

import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Hugging Face Inference with your API key
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Function to interact with the Hugging Face model
async function chatWithBot(question) {
  try {
    const response = await hf.textGeneration({
      model: 'gpt2', // Specify the model
      inputs: question,
      parameters: {
        max_new_tokens: 150, // Limit the response length
        temperature: 0.7, // Control the randomness of the response
      }
    });

    // Output the response from the API
    console.log(response.generated_text);
  } catch (error) {
    console.error('Error interacting with Hugging Face:', error.message);
    console.log(process.env.HUGGINGFACE_API_KEY);
  }
}

export { chatWithBot };
