import React from "react";
import BotAvatar from "../icons/bot.svg";
const CoBotAvatar = () => {
  return (
    <div className="react-chatbot-kit-chat-bot-avatar">
      <div
        className="react-chatbot-kit-chat-bot-avatar-container"
        style={{ background: "none",boxShadow: "0 0 8px rgba(0, 0, 0, 0.09)" }}
      >
        <img alt="BotAvatar" src={BotAvatar} />
      </div>
    </div>
  );
};

export default CoBotAvatar;
