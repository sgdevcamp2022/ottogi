import ChatIcon from "@components/atoms/Icons/ChatIcon";
import RoundButton from "./RoundButton";

export default {
  title: "molecules/Button",
  component: RoundButton,
};

export const Round = () => (
  <RoundButton onClick={() => null} Icon={<ChatIcon />} />
);
