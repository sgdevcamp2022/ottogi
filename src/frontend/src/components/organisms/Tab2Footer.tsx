import useUserSettingModalStore from "@store/useUserSettingModalStore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeadsetIcon from "../atoms/Icons/HeadsetIcon";
import HeadsetOffIcon from "../atoms/Icons/HeadsetOffIcon";
import MicIcon from "../atoms/Icons/MicIcon";
import MicOffIcon from "../atoms/Icons/MicOffIcon";
import SettingsIcon from "../atoms/Icons/SettingsIcon";
import UserInfoButton from "../molecules/Button/UserInfoButton";
import UserOnOffButton from "../molecules/Button/UserOnOffButton";

const Tab2Footer = () => {
  const { setUserSettingModal } = useUserSettingModalStore();

  return (
    <>
      <Tab2FooterContainer>
        <InfoContainer>
          <UserInfoButton status="1" />
        </InfoContainer>
        <ButtonContainer>
          <UserOnOffButton
            text="음소거"
            OnIcon={<MicIcon />}
            OffIcon={<MicOffIcon />}
            onClick={() => null}
          />
          <UserOnOffButton
            text="헤드셋 음소거"
            OnIcon={<HeadsetIcon />}
            OffIcon={<HeadsetOffIcon />}
            onClick={() => null}
          />
          <UserOnOffButton
            text="사용자 설정"
            OnIcon={<SettingsIcon />}
            OffIcon={<SettingsIcon />}
            // onClick={() => userSetting()}
            onClick={() => setUserSettingModal(true)}
          />
        </ButtonContainer>
      </Tab2FooterContainer>
    </>
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
