import MicIcon from "../../atoms/Icons/MicIcon";
import MicOffIcon from "../../atoms/Icons/MicOffIcon";
import MicButton from "./UserOnOffButton";

export default {
  title: "molecules/Button",
  component: MicButton,
};

export const Mic = () => <MicButton OnIcon={<MicIcon />} OffIcon={<MicOffIcon />} onClick={() => {}} />;
