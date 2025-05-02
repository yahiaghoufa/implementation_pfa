import React, { useState } from 'react';
import { marked } from 'marked';

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    // Affiche la clé API dans la console pour vérifier qu'elle est bien chargée
    console.log('API KEY:', import.meta.env.VITE_OPENROUTER_KEY);

    // Si l'utilisateur n'a pas saisi de message, on affiche une alerte
    if (!userInput.trim()) {
      setResponse('Please enter a message.');
      return;
    }

    // Affiche "Loading..." pendant que la requête est en cours
    setIsLoading(true);
    setResponse('Loading...');

    try {
      // Envoie de la requête à l'API
      const apiResponse = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            // Utilise la clé API dans les headers de la requête
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek/deepseek-r1:free',
            messages: [{ role: 'user', content: userInput }],
          }),
        }
      );

      // Récupère la réponse de l'API et parse le texte markdown
      const data = await apiResponse.json();
      const markdownText = data.choices?.[0]?.message?.content || 'No response received.';
      setResponse(marked.parse(markdownText)); // Affiche la réponse formatée en HTML
    } catch (error) {
      // Si une erreur se produit, on l'affiche
      setResponse('Error: ' + error.message);
    } finally {
      // Réinitialise l'état de "loading"
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-popup-container">
      <button
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)} // Ouvre/ferme le chat
      >
        Chat Assistant
      </button>

      {isOpen && (
        <div className="chat-popup active">
          <div className="chat-header">
            <h5>AI Assistant</h5>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)} // Ferme le chat
            >
              &times;
            </button>
          </div>

          <div className="chat-body">
            <div
              className="chat-response"
              dangerouslySetInnerHTML={{ __html: response }} // Affiche la réponse formatée en HTML
            />

            <div className="chat-input-group">
              <input
                type="text"
                className="form-control"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)} // Met à jour le message de l'utilisateur
                placeholder="Ask me anything..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()} // Envoie le message en appuyant sur 'Enter'
              />
              <button
                className="send-btn"
                onClick={sendMessage} // Envoie le message en cliquant sur le bouton
                disabled={isLoading} // Désactive le bouton si la requête est en cours
              >
                {isLoading ? 'Sending...' : 'Send'} {/* Affiche le texte 'Sending...' ou 'Send' */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
