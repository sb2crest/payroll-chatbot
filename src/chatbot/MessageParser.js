// MessageParser.js
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (
      lowerCaseMessage.includes("options") ||
      lowerCaseMessage.includes("help") ||
      lowerCaseMessage.includes("do for me")
    ) {
      return this.actionProvider.handleOptions();
    }

    if (
      lowerCaseMessage.includes("joke") ||
      lowerCaseMessage.includes("jokes") ||
      lowerCaseMessage.includes("funny")
    ) {
      return this.actionProvider.handleJoke();
    }

    if (lowerCaseMessage.includes("thanks") || lowerCaseMessage.includes("thank you")) {
      return this.actionProvider.handleThanks();
    }

    if (lowerCaseMessage.includes("addemployee") || lowerCaseMessage.includes("add")) {
      return this.actionProvider.handleAddEmployee();
    }

    if (lowerCaseMessage.includes("hi ")) {
      return this.actionProvider.handleGreet();
    }
    return this.actionProvider.handleAIMessage(lowerCaseMessage);
  }
}

export default MessageParser;
