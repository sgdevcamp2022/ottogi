import styled from "styled-components";
import ServerSettingBar from "../components/organisms/MyAccountSettingBar";
import UserProfile from "../components/organisms/UserProfile";
import MyAccount from "../components/organisms/MyAccount";
import useUserSetStore, { UserSettingType } from "../store/useUserSetStore";
import BackgroundModal from "@components/organisms/BackgroundModal";
import useUserSettingModalStore from "@store/useUserSettingModalStore";
import CancelIcon from "@components/atoms/Icons/CancelIcon";
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
  const { setUserSettingModal } = useUserSettingModalStore();
  const { userStatus } = useUserSetStore(({ userStatus }) => ({
    userStatus,
  }));
  return (
    <BackgroundModal
      width={800}
      p={0}
      onClick={() => setUserSettingModal(false)}
    >
      <SettingBox>
        <Side>
          <ServerSettingBar />
        </Side>
        <Container>
          <CancelIconWrapper onClick={() => setUserSettingModal(false)}>
            <CancelIcon />
          </CancelIconWrapper>
          {/* <UserProfile /> */}
          {getStatus(userStatus)}
        </Container>
      </SettingBox>
    </BackgroundModal>
  );
};

export default UserSetting;

const CancelIconWrapper = styled.div`
  font-size: 5rem;
  color: ${({ theme }) => theme.color["auth-desc"]};
  cursor: pointer;
  position: absolute;
  right: 500px;
  top: 25px;
`;

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
