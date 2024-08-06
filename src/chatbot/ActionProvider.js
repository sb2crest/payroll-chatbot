import { sendMessage } from "./service/GeminiApi";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, userType) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.userType = userType;
  }

  handleAddEmployee = () => {
    const message = this.createChatBotMessage(
      this.userType === 'Manager'
        ? "Fantastic, Manager. Please fill in the employee details below."
        : "Fantastic. Please fill in the employee details below.",
      { widget: "addEmployeeButton" }
    );

    this.addMessageToState(message);
  };

  handleGetEmployee = () => {
    const message = this.createChatBotMessage(
      this.userType === 'Manager'
        ? "How would you like to search for the employee, Manager?"
        : "How would you like to search for the employee?",
      { widget: "employeeOptions" }
    );

    this.addMessageToState(message);
  };

  handleGetEmployeeByID = () => {
    const message = this.createChatBotMessage(
      "Please enter the Employee ID.",
      { widget: "getEmployeeButtonByID" }
    );

    this.addMessageToState(message);
  };

  handleGetEmployeeByName = () => {
    const message = this.createChatBotMessage(
      "Please enter the Employee Name.",
      { widget: "getEmployeeButtonByName" }
    );

    this.addMessageToState(message);
  };

  handleOptions = (options) => {
    const message = this.createChatBotMessage(
      "How can I help you? Below are some possible options.",
      {
        widget: "options",
        loading: true,
        terminateLoading: true,
        ...options
      }
    );

    this.addMessageToState(message);
  };

  handleAfterSuccess = (message) => {
    this.createChatBotMessage(message, { widget: "options" });
    this.addMessageToState(message);
  };

  handleThanks = () => {
    const message = this.createChatBotMessage("You're welcome, and stay safe!");
    this.addMessageToState(message);
  };

  handleGreet = () => {
    const message = this.createChatBotMessage(`Hello, ${this.userType}!`);
    this.addMessageToState(message);
  };

  handleAIMessage = async (messages) => {
    try {
      console.log('AI message:', messages);
      const response = await sendMessage(messages);
      console.log('API response:', response);
      console.log('data', response.response.candidates[0].content.parts[0].text);
  
      const message = this.createChatBotMessage(response.response.candidates[0].content.parts[0].text);
      this.addMessageToState(message);
    } catch (error) {
      console.error('Error handling AI message:', error);
      const errorMessage = this.createChatBotMessage('Error fetching response.');
      this.addMessageToState(errorMessage);
    }
  };
  
  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
