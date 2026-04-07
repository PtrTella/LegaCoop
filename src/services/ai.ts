// AI service layer — handles communication with the server-side API endpoints.

interface MessagePart {
  text: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  parts: MessagePart[];
}

/**
 * Sends a question to the AI Tutor endpoint.
 */
export const askTutor = async (question: string, context?: string): Promise<string> => {
  try {
    const response = await fetch('/api/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, context }),
    });

    if (!response.ok) {
      throw new Error(`Tutor API responded with HTTP ${response.status}`);
    }

    const data = await response.json() as { text: string };
    return data.text;
  } catch (error) {
    console.error('[AI Service] askTutor error:', error);
    return 'Mi dispiace, il server AI non è momentaneamente raggiungibile. Riprova più tardi!';
  }
};

/**
 * Sends the full conversation history to the Pitch Battle endpoint.
 */
export const runPitchBattle = async (messages: ChatMessage[]): Promise<{ text: string, score: number }> => {
  try {
    const response = await fetch('/api/pitch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`Pitch API responded with HTTP ${response.status}`);
    }

    const data = await response.json() as { text: string, score: number };
    return { 
      text: data.text || '', 
      score: typeof data.score === 'number' ? data.score : 0 
    };
  } catch (error) {
    console.error('[AI Service] runPitchBattle error:', error);
    return { 
      text: "Connessione con l'investitore persa (forse è in galleria). Riprova!", 
      score: 0 
    };
  }
};
