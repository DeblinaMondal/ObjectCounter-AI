import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CountResult } from "../types";

const MODEL_NAME = "gemini-3-pro-preview";

export const countObjectsInImage = async (
  base64Data: string,
  mimeType: string
): Promise<CountResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is available.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      objectName: {
        type: Type.STRING,
        description: "The name of the main object being counted (e.g., 'Red Apples', 'Books', 'Cars').",
      },
      count: {
        type: Type.INTEGER,
        description: "The total number of these objects found in the image.",
      },
      reasoning: {
        type: Type.STRING,
        description: "A brief explanation of how the objects were identified and counted, noting any potential ambiguity.",
      },
    },
    required: ["objectName", "count", "reasoning"],
  };

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
          {
            text: "Analyze this image. Identify the primary group of similar items (e.g., a pile of fruit, a row of books, scattered coins) and count them precisely. Be thorough in your examination.",
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        thinkingConfig: { thinkingBudget: 2048 } // Allow some thinking time for accurate counting
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text received from Gemini.");
    }

    const result = JSON.parse(text) as CountResult;
    return result;

  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
};
