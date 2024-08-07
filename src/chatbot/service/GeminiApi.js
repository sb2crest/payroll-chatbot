import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GOOGLE_GENERATIVE_AI_KEY;

if (!apiKey) {
  throw new Error('API key is missing');
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const sendMessage = async (prompt) => {
  try {
    const result = await model.generateContent( prompt );
    return result;
  } catch (error) {
    throw error;
  }
};
