import React, { useState, useEffect } from 'react';
import { CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilChatBubble } from '@coreui/icons';
import { cilXCircle } from '@coreui/icons';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: (
        <>
          🙏  Namaste! <br />
          Welcome to BookMyYagna. How can we help you?  🕉️
        </>
      ),
    },
  ]);

  const [input, setInput] = useState('');

  // Auto open after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { sender: 'user', text: input },
      { sender: 'bot', text: "Thankyou !, We'll contact you Soon 🙏" }
    ]);
    setInput('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
.close-btn {
  margin-left: auto;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
}
        .chat-toggle-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255, 103, 0, 0.98);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: pointer;
          color: #fff;
        }

        .chat-widget {
          position: fixed;
          bottom: 90px;
          right: 16px;
          width: 100%;
          max-width: 390px;
          height: 70vh;
          max-height: 500px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUpFade 0.4s ease-out;
          font-family: 'Inter', sans-serif;
          z-index: 9999;
        }

        .chat-header {
          padding: 14px 18px;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          background: rgba(255, 103, 0, 0.98);
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content:space-between;
        }

        .chat-body {
          padding: 14px;
          overflow-y: auto;
          flex: 1;
          background: transparent;
        }

        .chat-msg {
          display: flex;
          width: 100%;
          margin-bottom: 10px;
        }

        .chat-msg.user {
          justify-content: flex-end;
        }

        .chat-msg.bot {
          justify-content: flex-start;
        }

        .chat-msg .bubble {
          max-width: 75%;
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 14px;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .chat-msg.user .bubble {
          background: rgba(255, 103, 0, 0.98);
          color: #fff;
          border-top-right-radius: 0;
        }

        .chat-msg.bot .bubble {
          background: #f0f0f0;
          color: #444;
          border-top-left-radius: 0;
        }

        .chat-input {
          padding: 10px;
          display: flex;
          border-top: 1px solid #e0e0e0;
          background: #ffffffa6;
        }

        .chat-input input {
          flex: 1;
          border: none;
          border-radius: 10px;
          background: #f0f0f0;
          padding: 10px;
          font-size: 14px;
          outline: none;
        }

        .chat-input button {
          background: rgba(255, 103, 0, 0.98);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 10px 16px;
          margin-left: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }

        .chat-input button:hover {
          background: #e65c00;
        }

        @media screen and (max-width: 480px) {
          .chat-widget {
            right: 10px;
            left: 10px;
            width: auto;
            height: 65vh;
            bottom: 90px;
          }

          .chat-msg .bubble {
            max-width: 85%;
            font-size: 13px;
          }

          .chat-header {
            font-size: 14px;
            padding: 12px;
          }

          .chat-input button {
            padding: 8px 12px;
            font-size: 13px;
          }

          .chat-input input {
            font-size: 13px;
          }
       .close-btn {
  margin-left: auto;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;

}


        }
      `}</style>


      {!isOpen && (
        <div className="chat-toggle-btn" onClick={toggleChat}>
          <CIcon icon={cilChatBubble} size="lg" />
        </div>
      )}

      {isOpen && (
        <div className="chat-widget">

          <div className="chat-header">
            🕉️ Chat with BookMyYagna
            <span className="close-btn" onClick={toggleChat}>✖</span>
          </div>


          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.sender}`}>
                <div className="bubble">{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
