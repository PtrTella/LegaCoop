import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito. Usa POST.' });
  }

  const { idea } = req.body;

  if (!idea) {
    return res.status(400).json({ error: 'Parametro "idea" mancante.' });
  }

  // Chiave conservata in modo sicuro nelle variabili d'ambiente di Vercel
  const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
  
  if (!API_KEY) {
    return res.status(500).json({ error: 'Configurazione API Key mancante sul server.' });
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const prompt = `
    Sei un esperto di cooperative italiane. 
    Analizza la seguente idea di business cooperativo: "${idea}"
    Genera un'analisi SWOT (Strengths, Weaknesses, Opportunities, Threats) dettagliata, 
    specificamente focalizzata sul modello cooperativo (es. democrazia interna, mutualità, rete territoriale).
    Formatta la risposta in JSON con questa struttura:
    {
      "strengths": ["punto1", "punto2"],
      "weaknesses": ["punto1", "punto2"],
      "opportunities": ["punto1", "punto2"],
      "threats": ["punto1", "punto2"],
      "summary": "un breve riassunto di 2 righe"
    }
  `;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });
    
    // Clean potential markdown code blocks
    const text = result.text || '';
    const jsonStr = text.replace(/```json|```/g, '').trim();
    const data = JSON.parse(jsonStr);
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Server API Error (SWOT):", error.message);
    return res.status(500).json({ error: 'Errore durante l\'analisi SWOT. Verifica i limiti di quota o la connessione.' });
  }
}
