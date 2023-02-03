import ChatIcon from "../../atoms/Icons/ChatIcon";
import RoundButton from "./RoundButton";

export default {
  title: "molecules/Button",
  component: RoundButton,
};

export const Round = () => <RoundButton Icon={<ChatIcon />} />;
