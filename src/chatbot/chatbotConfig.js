import { createChatBotMessage } from 'react-chatbot-kit';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import AddEmployeeButton from './widget/AddEmployeeButton';
import GetEmployeeByIDButton from './widget/GetEmployeeByIDButton';
import Options from './widget/comp/Options';
import EmployeeOptions from './widget/comp/EmployeeOptions';
import GetEmployeeByNameButton from './widget/GetButtonByNameButton';
import headerImage from './widget/icons/chat.svg';

const config = (userType) => {

  const botName = userType === 'Manager' ? "Manager HR Bot" : "Employee HR Bot";

  const initialMessages = userType === 'User'
    ? [
        createChatBotMessage("Welcome User! How can I assist you today?"),
        createChatBotMessage("Please use the navigation below to get started.", { widget: "options" })
      ]
    : [
        createChatBotMessage(`Hello ${userType}! How can I assist you today?`),
        createChatBotMessage("What brings you here today? Please use the navigation below to ease out.", { widget: "options" })
      ];

  const widgets = [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} userType={userType} />,
    },
    {
      widgetName: "addEmployeeButton",
      widgetFunc: (props) => <AddEmployeeButton {...props} />,
    },
    {
      widgetName: "getEmployeeButtonByID",
      widgetFunc: (props) => <GetEmployeeByIDButton {...props} />,
    },
    {
      widgetName: "getEmployeeButtonByName",
      widgetFunc: (props) => <GetEmployeeByNameButton {...props} />,
    }
  ];

  if (userType === 'Manager') {
    widgets.push({
      widgetName: "employeeOptions",
      widgetFunc: (props) => <EmployeeOptions {...props} userType={userType} />,
    },
    {
      widgetName: "addEmployeeButton",
      widgetFunc: (props) => <AddEmployeeButton {...props} />,
    },
  );
  }

  return {
    botName,
    initialMessages,
    customComponents: {
      header: () => (
        <div style={{ backgroundColor: 'rgba(110, 172, 218, 1)', padding: "5px", borderRadius: "3px", display: 'flex', alignItems: 'center' }}>
          <img src={headerImage} alt="Header" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
          <div>
            <p style={{ fontSize: '16px', lineHeight: '0px' }}><strong>{botName}</strong></p>
            <p style={{ fontSize: '10px', lineHeight: '0px', paddingLeft: '4px' }}>online</p>
          </div>
        </div>
      ),
      userAvatar: null,
    },
    widgets,
    state: {},
    actionProvider: new ActionProvider(userType),
    messageParser: MessageParser,
  };
};

export default config;
