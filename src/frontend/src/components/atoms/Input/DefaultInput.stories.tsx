import { useState } from "react";
import DefaultInput from "./DefaultInput";

export default {
  title: "atoms/Input",
  component: DefaultInput,
};

export const Default = () => {
  const [text, setText] = useState("");
  return <DefaultInput value={text} onChange={({ target: { value } }) => setText(value)} />;
};
