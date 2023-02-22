import MicIcon from "@components/atoms/Icons/MicIcon";
import MicOffIcon from "@components/atoms/Icons/MicOffIcon";
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
