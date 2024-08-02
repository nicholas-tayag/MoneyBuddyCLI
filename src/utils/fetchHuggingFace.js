import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';


dotenv.config();

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

async function chatWithBot(question) {
  try {
    const response = await hf.textGeneration({
      model: 'gpt2', 
      inputs: question,
      parameters: {
        max_new_tokens: 150, 
        temperature: 0.7, 
      }
    });

    console.log(response.generated_text);
  } catch (error) {
    console.error('Error interacting with Hugging Face:', error.message);
  }
}

export { chatWithBot };
