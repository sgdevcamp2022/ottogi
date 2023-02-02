import MicIcon from "../../atoms/Icons/MicIcon";
import MicOffIcon from "../../atoms/Icons/MicOffIcon";
import UserOnOffButton from "./UserOnOffButton";

export default {
  title: "molecules/Button",
  component: UserOnOffButton,
};

export const UserOnOff = () => <UserOnOffButton OnIcon={<MicIcon />} OffIcon={<MicOffIcon />} onClick={() => {}} />;
