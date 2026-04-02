import { GoogleGenAI } from '@google/genai';
import path from 'path';

// --- CONFIGURAZIONE ESSENZIALE ---
const MODEL_CONFIG = {
  model: "gemini-2.5-flash",
  temperature: 0.5,
  systemPrompt: `Sei un tutor esperto della LegaCoop. Il tuo compito è spiegare i concetti cooperativi in modo semplice e motivante. Rispondi in modo conciso (max 3-4 righe) e amichevole.`,
  resources: ["resources/manuale_operativo.pdf"] // Metti qui i tuoi file in resources/
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).send('POST only');

  const { question, context } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  // Upload Manuale sulla File API (Ogni 48 ore)
  if (!global.fileUriTutor) {
    try {
      const uploadResult = await ai.files.upload({
        file: path.join(process.cwd(), MODEL_CONFIG.resources[0]),
        config: { mimeType: "application/pdf" }
      });
      global.fileUriTutor = uploadResult.uri;
      global.fileMimeTypeTutor = uploadResult.mimeType;
    } catch (e) { console.warn("Errore File API:", e); }
  }

  const fileData = global.fileUriTutor ? { fileUri: global.fileUriTutor, mimeType: global.fileMimeTypeTutor } : null;

  try {
    const result = await ai.models.generateContent({
      model: MODEL_CONFIG.model,
      contents: [
        ...(fileData ? [{ role: "user", parts: [{ fileData }] }] : []),
        { role: "user", parts: [{ text: `[SYSTEM]: ${MODEL_CONFIG.systemPrompt}\n\n[CONTEXT]: ${context || ''}\n\n[QUESTION]: ${question}` }] }
      ],
      config: { temperature: MODEL_CONFIG.temperature }
    });
    
    return res.status(200).json({ text: result.text || '' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
