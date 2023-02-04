import styled from "styled-components";
import HeadsetIcon from "../atoms/Icons/HeadsetIcon";
import HeadsetOffIcon from "../atoms/Icons/HeadsetOffIcon";
import MicIcon from "../atoms/Icons/MicIcon";
import MicOffIcon from "../atoms/Icons/MicOffIcon";
import SettingsIcon from "../atoms/Icons/SettingsIcon";
import UserInfoButton from "../molecules/Button/UserInfoButton";
import UserOnOffButton from "../molecules/Button/UserOnOffButton";

interface UserInfoBarProps {
  name: string;
}

const Tab2Footer = ({ name }: UserInfoBarProps) => {
  return (
    <Tab2FooterContainer>
      <InfoContainer>
        <UserInfoButton name={name} />
      </InfoContainer>
      <ButtonContainer>
        <UserOnOffButton OnIcon={<MicIcon />} OffIcon={<MicOffIcon />} onClick={() => {}} />
        <UserOnOffButton OnIcon={<HeadsetIcon />} OffIcon={<HeadsetOffIcon />} onClick={() => {}} />
        <UserOnOffButton OnIcon={<SettingsIcon />} OffIcon={<SettingsIcon />} onClick={() => {}} />
      </ButtonContainer>
    </Tab2FooterContainer>
  );
};

const Tab2FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  background-color: ${({ theme }) => theme.backgroundColor["user-tab"]};
  height: 52px;
  width: 240px;
  padding: 0 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InfoContainer = styled.div`
  flex: 1;
  margin-right: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  color: ${({ theme }) => theme.color.icon};
`;

export default Tab2Footer;
