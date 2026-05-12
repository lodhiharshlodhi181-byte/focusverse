import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const classifyActivity = async (activityData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      As an AI productivity assistant, classify the following user activity into one of these categories: 
      "Productive", "Neutral", "Distracting".
      
      Activity Details:
      - App Name: ${activityData.appName}
      - Page Title: ${activityData.title}
      - Scroll Speed: ${activityData.scrollSpeed}
      - Duration: ${activityData.duration} seconds
      
      Provide a brief reason and a classification. 
      Format the response as JSON: { "classification": "Category", "reason": "Brief reason" }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean JSON if needed
    const jsonMatch = text.match(/\{.*\}/s);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { classification: "Neutral", reason: "AI could not determine" };
  } catch (error) {
    console.error("AI Classification Error:", error);
    return { classification: "Neutral", reason: "AI Service Error" };
  }
};
