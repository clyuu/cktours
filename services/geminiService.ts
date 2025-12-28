import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTravelAdvice = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: `You are a warm, knowledgeable, and enthusiastic travel guide for Sri Lanka (The Pearl of the Indian Ocean). 
        Your goal is to promote tourism to Sri Lanka.
        Answer questions about destinations (Ella, Sigiriya, Mirissa, etc.), culture, food (Kottu, Hoppers), and logistics.
        Keep answers concise, inviting, and formatted with Markdown. 
        Use emojis where appropriate 🐘🌴🫖.
        If asked about something unrelated to Sri Lanka, gently steer the conversation back to visiting this beautiful island.`,
      },
    });

    return response.text || "I couldn't find an answer for that right now, but Sri Lanka is always full of surprises!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a little trouble connecting to the island network. Please try again in a moment.";
  }
};