import { useState } from "react";
import MessageInput from "./MessageInput";

export default {
  title: "molecules/Input",
  component: MessageInput,
};

export const Message = () => {
  const [text, setText] = useState("");
  return <MessageInput value={text} nickname="nno3onn" onChange={(value: string) => setText(value)} onClick={() => {}} />;
};
