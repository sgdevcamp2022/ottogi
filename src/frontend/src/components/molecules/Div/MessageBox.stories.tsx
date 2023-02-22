// import { useRef, useState } from "react";
// import MessageBoxDiv from "./MessageBox";

// export default {
//   title: "molecules/Div",
//   component: MessageBoxDiv,
// };

// export const MessageBox = () => {
//   const [text, setText] = useState("");
//   const messageRef = useRef<HTMLTextAreaElement>(null);

//   const resizeTextAreaHeight = () => {
//     if (messageRef.current instanceof HTMLTextAreaElement) {
//       messageRef.current.style.height = "auto";
//       messageRef.current.style.height = messageRef.current.scrollHeight + "px";
//     }
//   };

//   const handleChange = (value: string) => {
//     resizeTextAreaHeight();
//     setText(value);
//   };

//   return <MessageBoxDiv value={text} nickname="nno3onn" onChange={handleChange} onClick={() => null} />;
// };

export {};
