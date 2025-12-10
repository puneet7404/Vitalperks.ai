import { GoogleGenAI, Type, Modality } from "@google/genai";
import { BillData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Feature 1: Analyze Images using gemini-3-pro-preview (Best for OCR/Extraction)
export const analyzeBillImage = async (base64Image: string): Promise<BillData> => {
  try {
    const model = "gemini-3-pro-preview";
    
    // We remove the data URL prefix if present to get just the base64 string
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.models.generateContent({
      model: model,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "Analyze this image. It is likely a health insurance premium bill or medical invoice. Extract the following details: Provider Name (e.g. Blue Cross, Aetna), Total Amount Due (as a number), Due Date (as string YYYY-MM-DD). If you cannot find a specific field, make a reasonable guess or return null. Also provide a confidence score from 0 to 1."
            },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Data
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            providerName: { type: Type.STRING },
            amountDue: { type: Type.NUMBER },
            dueDate: { type: Type.STRING },
            accountNumber: { type: Type.STRING },
            confidence: { type: Type.NUMBER }
          },
          required: ["providerName", "amountDue", "confidence"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text from Gemini");
    }

    const data = JSON.parse(text) as BillData;
    return data;
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    // Fallback mock data for demo purposes if API fails or key is missing
    return {
      providerName: "Unknown Provider",
      amountDue: 0,
      dueDate: new Date().toISOString().split('T')[0],
      confidence: 0
    };
  }
};

// Feature 2: Complex Reasoning ("Thinking Mode") for Financial Advice
export const askFinancialAdvisor = async (userContext: string, query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `User Context: ${userContext}\n\nUser Question: ${query}`,
      config: {
        thinkingConfig: {
          thinkingBudget: 32768, // Maximum thinking budget for deep reasoning
        },
      }
    });
    
    return response.text || "I couldn't generate advice at this moment.";
  } catch (error) {
    console.error("Gemini Advisor Failed:", error);
    return "I am currently unable to process complex financial queries. Please try again later.";
  }
};

// Feature 3: Text-to-Speech (TTS) for Daily Briefing
export const generateDailyBriefingAudio = async (text: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (error) {
    console.error("Gemini TTS Failed:", error);
    return null;
  }
};
