import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyCPHpxWFGVoOy5XsScj8qZORbM5STA2O4o';
const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
  try {
    const models = await genAI.listModels();
    console.log('Available models:');
    for await (const model of models) {
      console.log('- Name:', model.name);
      console.log('  Display:', model.displayName);
      console.log('  Methods:', model.supportedGenerationMethods);
      console.log('');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

listModels();
