// src/apiService.js
import axios from 'axios';

// Replace with your actual Gemini API key
const API_KEY = 'AIzaSyAkhegVAo36BmLIaqvYG7gEyngApmt65CY'; 

const apiService = axios.create({
  baseURL: 'https://api.gemini.com/v1/chat', // Replace with the actual Gemini API endpoint
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

export const sendMessage = async (message) => {
  const data = {
    model: 'gemini', // Or specify a specific Gemini model 
    messages: [{ role: 'user', content: message }] 
  };

  try {
    const response = await apiService.post('/chat', data);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};