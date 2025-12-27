import { GoogleGenAI, Type } from "@google/genai";
import { MarketPosition, PortfolioStats } from "../types";

// Always initialize with process.env.API_KEY directly as a named parameter
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPortfolioInsights = async (stats: PortfolioStats, positions: MarketPosition[]) => {
  const prompt = `Analyze the following prediction market portfolio data for a user on the 'Limitless' platform.
    Stats: ${JSON.stringify(stats)}
    Positions: ${JSON.stringify(positions)}
    
    Provide 3 distinct insights covering: 
    1. Overall risk profile (conservative vs aggressive)
    2. Specific market opportunities based on current world events
    3. Trading style summary.
    
    Return as JSON array of objects.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              type: { type: Type.STRING, enum: ['risk', 'opportunity', 'summary'] },
              riskScore: { type: Type.NUMBER }
            },
            required: ["title", "description", "type", "riskScore"]
          }
        }
      }
    });

    // Extract text output using the .text property (not a method)
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Insights Error:", error);
    return [];
  }
};

export const getTrendingMarkets = async () => {
  const prompt = "What are the top 3 most trending and high-volume prediction markets today? Look for markets related to politics, crypto (ETH/BTC), and major sporting events. Provide their names, current odds/sentiment, and a brief description.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              sentiment: { type: Type.STRING },
              link: { type: Type.STRING }
            },
            required: ["name", "description", "sentiment"]
          }
        }
      }
    });

    // Extract text output using the .text property (not a method)
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Trending Error:", error);
    return [];
  }
};