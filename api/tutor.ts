import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito. Usa POST.' });
  }

  const { question, context } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Parametro "question" mancante.' });
  }

  const API_KEY = process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
  
  if (!API_KEY) {
    return res.status(500).json({ error: 'Configurazione API Key mancante sul server.' });
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const prompt = `
    Sei un tutor esperto della LegaCoop. Il tuo compito è spiegare i concetti cooperativi in modo semplice e motivante.
    Contesto attuale del corso: ${context || 'Introduzione generale'}
    Domanda dell'utente: ${question}
    Rispondi in modo conciso (max 3-4 righe) e amichevole.
  `;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });
    
    return res.status(200).json({ text: result.text || '' });
  } catch (error: any) {
    console.error("Server API Error (Tutor):", error.message);
    return res.status(500).json({ error: 'Mi dispiace, ho avuto un problema di connessione sul server. Riprova tra poco!' });
  }
}
