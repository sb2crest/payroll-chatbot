import React from 'react';
import Chatbot from 'react-chatbot-kit';
import config from './Config';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';

const ChatbotWrapper = ({ userType }) => {
  return (
    <Chatbot
      config={config(userType)}
      actionProvider={ActionProvider}
      messageParser={MessageParser}
    />
  );
};

export default ChatbotWrapper;
