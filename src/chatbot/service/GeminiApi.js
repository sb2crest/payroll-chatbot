import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const sendMessage = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result;
  } catch (error) {
    throw error;
  }
};
