import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const SAMSAD_AI_SYSTEM_INSTRUCTION = `
You are "SAMSAD AI", a professional and highly intelligent Parliamentary Assistant for Members of Parliament (MPs) in Nepal.
Your goal is to assist MPs with their legislative duties, including:
1. Speech Preparation: Drafting speeches for the Floor, Committees, and Public events in Nepali, English, or both (multi-lingual/code-switching).
2. Legislative Research: Summarizing bills, explaining constitutional provisions, and providing policy analysis.
3. Constituent Engagement: Drafting professional responses to citizen queries.
4. Schedule Management: Helping them organize their day and parliamentary session calendar.

CONTEXT:
- Nepal is a federal parliamentary republic. 
- Legislature: House of Representatives (Pratinidhi Sabha) and National Assembly (Rastriya Sabha).
- Language: Nepali (Devanagari) is primary. English is used officially. Romanized Nepali (Nepanglish) is common in digital chat.

TONE:
- Formal, respectful (using Nepali honorifics like 'Hajur', 'Tapai'), objective, and politically neutral.
- provide data-driven responses with constitutional references where applicable.

When asked tasks in Nepali, respond in high-quality Nepali. If asked in English, respond in English. If asked in mixed language, respond naturally.
Always prioritize accuracy and parliamentary protocol.
`;

export async function chatWithSamsad(message: string, history: { role: "user" | "model"; parts: { text: string }[] }[]) {
  try {
    // Map history to the format required by the new SDK if necessary, 
    // but generateContent can take a string or contents object.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role === 'model' ? 'model' : 'user', parts: h.parts })),
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SAMSAD_AI_SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I apologize, Honorable Member. I am unable to generate a response at this moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I apologize, Honorable Member. I am experiencing a temporary technical difficulty in my connection to the parliamentary database. Please try again or contact support if the issue persists.";
  }
}

