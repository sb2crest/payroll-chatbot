import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import AddEmployeeButton from "./widget/AddEmployeeButton";
import Options from "./widget/comp/Options";
import GetEmployeeButton from "./widget/GetEmployeeButton";
import headerImage from "./widget/icons/chat.svg";
import DownloadForm16Button from "./widget/DownloadForm16Button";
import ManagerOptions from "./widget/comp/ManagerOptions";
import EmployeeTimesheets from "./widget/EmployeeTimesheets";
import CheckInOutForm from "./widget/comp/CheckInButton";

const config = (userType) => {
  const botName = userType === "Manager" ? "Manager HR Bot" : "Employee Bot";

  const initialMessages = [
    createChatBotMessage(`Welcome ${userType} ! How can I assist you today?`),
    createChatBotMessage("Please use the navigation below to get started.", {
      widget: "options",
    }),
  ];

  const widgets = [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} userType={userType} />,
    },
    {
      widgetName: "getEmployeeButtonByID",
      widgetFunc: (props) => <GetEmployeeButton {...props} searchType="id" />,
    },
    {
      widgetName: "getEmployeeButtonByName",
      widgetFunc: (props) => <GetEmployeeButton {...props} searchType="name" />,
    },
    {
      widgetName: "getEmployeeTimeSheet",
      widgetFunc: (props) => <EmployeeTimesheets {...props} />,
    },
    {
      widgetName: "getEmployeeCheckIn",
      widgetFunc: (props) => <CheckInOutForm {...props} />,
    },
  ];

  if (userType === "Manager") {
    widgets.push(
      {
        widgetName: "employeeOptions",
        widgetFunc: (props) => <ManagerOptions {...props} />,
      },
      {
        widgetName: "addEmployeeButton",
        widgetFunc: (props) => <AddEmployeeButton {...props} />,
      }
    );
  } else if (userType === "User") {
    widgets.push(
      {
        widgetName: "generateForm16Button",
        widgetFunc: (props) => (
          <DownloadForm16Button {...props} userType={userType} />
        ),
      },
      {
        widgetName: "getEmployeeTimeSheet",
        widgetFunc: (props) => <EmployeeTimesheets {...props} />,
      }
    );
  }

  return {
    botName,
    initialMessages,
    customComponents: {
      header: () => (
        <div
          style={{
            backgroundColor: "rgba(110, 172, 218, 1)",
            padding: "5px",
            borderRadius: "3px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={headerImage}
            alt="Header"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          <div>
            <p style={{ fontSize: "16px", lineHeight: "0px" }}>
              <strong>{botName}</strong>
            </p>
            <p
              style={{
                fontSize: "10px",
                lineHeight: "0px",
                paddingLeft: "4px",
              }}
            >
              online
            </p>
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
