import { GoogleGenAI } from '@google/genai';

// --- CONFIGURAZIONE ESSENZIALE ---
const MODEL_CONFIG = {
  model: "gemma-4-26b-a4b-it",
  temperature: 0.5,
  systemPrompt: `Sei un tutor esperto della Legacoop. Il tuo compito è spiegare i concetti cooperativi in modo semplice e motivante. Rispondi in modo conciso (max 3-4 righe) e amichevole.`
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).send('POST only');

  const { question, context } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const userParts: any[] = [];
    userParts.push({ text: `[CONTEXT]: ${context || ''}\n\n[QUESTION]: ${question}` });

    const result = await ai.models.generateContent({
      model: MODEL_CONFIG.model,
      contents: [
        { role: "user", parts: userParts }
      ],
      config: { 
        temperature: MODEL_CONFIG.temperature,
        systemInstruction: MODEL_CONFIG.systemPrompt
      }
    });
    
    return res.status(200).json({ text: result.text || '' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
