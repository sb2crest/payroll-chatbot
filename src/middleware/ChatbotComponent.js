import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from '../chatbot/chatbotConfig'; 
import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider'; 
import { IoCloseCircleOutline } from "react-icons/io5";
import './ChatbotComponent.css'; 
import { motion, AnimatePresence } from 'framer-motion';
import botImage from '../chatbot/widget/icons/bots.svg';

const ChatbotComponent = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(prevState => !prevState);
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };

  return (
    <>
      {!isChatbotOpen && (
        <button className="toggle-button" onClick={toggleChatbot}>
          <img src={botImage} alt="botImage" style={{ width: '30px', height: '30px'}} />
        </button>
      )}

      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div
            initial={{ opacity: 0, y: "10%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "10%" }}
            transition={{ duration: 0.3 }}
            className={`chatbot-container ${isChatbotOpen ? 'open' : ''}`}
          >
            <button className="close-button" onClick={closeChatbot}>
              <IoCloseCircleOutline style={{ fontSize: "30px" }} />
            </button>
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotComponent;
