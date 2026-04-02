// SWOT feature deprecated and removed.

export const askTutor = async (question: string, context?: string) => {
  try {
    const response = await fetch('/api/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, context })
    });

    if (!response.ok) {
      throw new Error('Errore dal server API');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error asking tutor (Client):", error);
    return "Mi dispiace, il server AI non è momentaneamente raggiungibile. Riprova più tardi!";
  }
};

export const runPitchBattle = async (messages: any[]) => {
  try {
    const response = await fetch('/api/pitch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });

    if (!response.ok) {
      throw new Error('Errore dal server API');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error asking Pitch AI (Client):", error);
    return "Connessione con l'investitore persa (forse è in galleria). Riprova!";
  }
};
