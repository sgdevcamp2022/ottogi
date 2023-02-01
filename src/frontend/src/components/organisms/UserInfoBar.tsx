import styled from "styled-components";
import HeadsetIcon from "../atoms/Icons/HeadsetIcon";
import HeadsetOffIcon from "../atoms/Icons/HeadsetOffIcon";
import MicIcon from "../atoms/Icons/MicIcon";
import MicOffIcon from "../atoms/Icons/MicOffIcon";
import SettingsIcon from "../atoms/Icons/SettingsIcon";
import UserInfoButton from "../molecules/Button/UserInfoButton";
import UserOnOffButton from "../molecules/Button/UserOnOffButton";

interface UserInfoBarProps {
  username: string;
}

const UserInfoBar = ({ username }: UserInfoBarProps) => {
  return (
    <UserInfoBarContainer>
      <InfoContainer>
        <UserInfoButton username={username} />
      </InfoContainer>
      <ButtonContainer>
        <UserOnOffButton OnIcon={<MicIcon />} OffIcon={<MicOffIcon />} onClick={() => {}} />
        <UserOnOffButton OnIcon={<HeadsetIcon />} OffIcon={<HeadsetOffIcon />} onClick={() => {}} />
        <UserOnOffButton OnIcon={<SettingsIcon />} OffIcon={<SettingsIcon />} onClick={() => {}} />
      </ButtonContainer>
    </UserInfoBarContainer>
  );
};

const UserInfoBarContainer = styled.div`
  height: 52px;
  margin-bottom: 1px;
  padding: 0 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InfoContainer = styled.div`
  margin-right: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default UserInfoBar;
