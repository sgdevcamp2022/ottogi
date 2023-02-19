import styled from "styled-components";
import ServerSettingBar from "../components/organisms/MyAccountSettingBar";
import UserProfile from "../components/organisms/UserProfile";
import MyAccount from "../components/organisms/MyAccount";
import useUserSetStore, { UserSettingType } from "../store/useUserSetStore";
const userComponent = {
  "내 계정": MyAccount,
  프로필: UserProfile,
  알림: UserProfile,
};

const getStatus = (status: UserSettingType) => {
  const Component = userComponent[status];
  return <Component />;
};

const UserSetting = () => {
  const { userStatus } = useUserSetStore(({ userStatus }) => ({
    userStatus,
  }));
  return (
    <SettingBox>
      <Side>
        <ServerSettingBar />
      </Side>
      <Container>
        {/* <UserProfile /> */}
        {getStatus(userStatus)}
      </Container>
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
const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 800px;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.backgroundColor["tab3"]};
`;
const Side = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-end;
`;
