import MicIcon from "../../atoms/Icons/MicIcon";
import MicOffIcon from "../../atoms/Icons/MicOffIcon";
import UserOnOffButton from "./UserOnOffButton";

export default {
  title: "molecules/Button",
  component: UserOnOffButton,
};

export const UserOnOff = () => (
  <UserOnOffButton
    text="음소거"
    OnIcon={<MicIcon />}
    OffIcon={<MicOffIcon />}
    onClick={() => {}}
  />
);
