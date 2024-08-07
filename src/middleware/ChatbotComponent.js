import React, { useState } from 'react';
import 'react-chatbot-kit/build/main.css';

import { IoCloseCircleOutline } from "react-icons/io5";
import './ChatbotComponent.css'; 
import { motion, AnimatePresence } from 'framer-motion';
import botImage from '../chatbot/widget/icons/bots.svg';
import ChatbotWrapper from '../chatbot/ChatbotWrapper';

const ChatbotComponent = ({userType}) => {
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
            <ChatbotWrapper userType ={userType}/>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotComponent;
