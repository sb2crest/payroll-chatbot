import { GoogleGenerativeAI } from "@google/generative-ai";

// Retrieve API key from environment variables
const apiKey = process.env.REACT_APP_GOOGLE_GENERATIVE_AI_KEY;

if (!apiKey) {
  throw new Error('API key is missing');
}

// Initialize the GoogleGenerativeAI instance with the API key
const genAI = new GoogleGenerativeAI(apiKey);

// Get the generative model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const sendMessage = async (prompt) => {
  try {
    const result = await model.generateContent({ prompt });
    return result;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};
