import MessageLogDiv from "./MessageLog";

export default {
  title: "molecules/Div",
  component: MessageLogDiv,
};

export const MessageLog = () => (
  <MessageLogDiv text="안녕하세요" createdAt="" />
);
