
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const generateAffiliateContent = async (productName: string, features: string) => {
  if (!API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `أريد كتابة مراجعة تسويقية احترافية لمنتج: "${productName}". 
    الميزات الرئيسية: ${features}. 
    يجب أن يتضمن المحتوى: مقدمة جذابة، قائمة بالمميزات والعيوب، وكيفية البدء في التسويق له. 
    اللغة: العربية الفصحى بأسلوب تسويقي مقنع.`,
    config: {
      temperature: 0.8,
      topP: 0.95,
      topK: 40,
    }
  });

  return response.text;
};

export const suggestAffiliateIdeas = async () => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "اقترح 5 أفكار لمقالات مدونة متخصصة في التسويق بالعمولة (أفلييت) تستهدف المبتدئين في عام 2024.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING }
          },
          required: ["title", "summary"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    return [];
  }
};
