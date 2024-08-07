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

    if (lowerCaseMessage.includes("thanks") || lowerCaseMessage.includes("thank you")) {
      return this.actionProvider.handleThanks();
    }

    if (lowerCaseMessage.includes("addemployee") || lowerCaseMessage.includes("add")) {
      return this.actionProvider.handleAddEmployee();
    }

    if (lowerCaseMessage.includes("hi ")) {
      return this.actionProvider.handleGreet();
    }
    if (lowerCaseMessage.includes("generate")) {
      return this.actionProvider.handleGenerateForm16();
    }
    return this.actionProvider.handleAIMessage(lowerCaseMessage);
  }
}

export default MessageParser;
