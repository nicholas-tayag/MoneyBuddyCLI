import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getResponse(question) {
  const combinedPrompt = `Q: ${question}`;

  // Generate a response using OpenAI
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini', 
    messages: [{ role: 'user', content: combinedPrompt }],
    max_tokens: 150, 
    temperature: 0.5, 
  });

  return response.choices[0].message.content;
}

export { getResponse };