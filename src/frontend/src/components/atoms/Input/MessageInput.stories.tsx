import { useRef, useState } from "react";
import MessageInput from "./MessageInput";

export default {
  title: "atoms/Input",
  component: MessageInput,
};

export const Message = () => {
  const [text, setText] = useState("");
  const messageRef = useRef(null);
  return (
    <div style={{ backgroundColor: "black" }}>
      <MessageInput messageRef={messageRef} value={text} onChange={({ target: { value } }) => setText(value)} />
    </div>
  );
};
