import { useState } from "react";
import InviteInput from "./InviteInput";

export default {
  title: "molecules/Input",
  component: InviteInput,
};

export const Invite = () => {
  const [text, setText] = useState("");
  return <InviteInput value={text} onChange={({ target: { value } }) => setText(value)} onClick={() => console.log(1)} />;
};
