import styled from "styled-components";
import ServerSettingBar from "../components/organisms/ServerSettingBar";
import UserProfile from "../components/organisms/UserProfile";

const UserSetting = () => {
  return (
    <SettingBox>
      <ServerSettingBar />
      <UserProfile />
    </SettingBox>
  );
};

export default UserSetting;

const SettingBox = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: row;
  background-color: ${({ theme }) => theme.backgroundColor["voice-icon"]};
`;
