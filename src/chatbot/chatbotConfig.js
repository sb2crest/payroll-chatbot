import { createChatBotMessage } from 'react-chatbot-kit';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import AddEmployeeButton from './widget/AddEmployeeButton';
import GetEmployeeByIDButton from './widget/GetEmployeeByIDButton';
import Options from './widget/comp/Options';
import EmployeeOptions from './widget/comp/EmployeeOptions';
import GetEmployeeByNameButton from './widget/GetButtonByNameButton';
import headerImage from './widget/icons/chat.svg';

const config = {
  botName: "HR Bot",
  initialMessages: [createChatBotMessage("Hello! How can I assist you today?", { widget: "options" })],
  customComponents: {
    header: () => (
      <div style={{ backgroundColor: 'rgba(235, 235, 235, 1)', padding: "5px", borderRadius: "3px", display: 'flex', alignItems: 'center' }}>
        <img src={headerImage} alt="Header" style={{ width: '40px', height: '40px', marginRight: '10px'}} />
        <div>
          <p style={{fontSize:'16px',lineHeight:'0px'}}>Welcome To HRChatBot</p>
          <p style={{fontSize:'10px', lineHeight:'0px'}}>Ask me anything about our employees</p>
        </div>
      </div>
    ),
    botAvatar: null,
    userAvatar: null,
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "addEmployeeButton",
      widgetFunc: (props) => <AddEmployeeButton {...props} />,
    },
    {
      widgetName: "employeeOptions",
      widgetFunc: (props) => <EmployeeOptions {...props} />,
    },
    {
      widgetName: "getEmployeeButtonByID",
      widgetFunc: (props) => <GetEmployeeByIDButton {...props} />,
    },    
    {
      widgetName: "getEmployeeButtonByName",
      widgetFunc: (props) => <GetEmployeeByNameButton {...props} />,
    }
  ],
  state: {},
  actionProvider: ActionProvider,
  messageParser: MessageParser,
};

export default config;
