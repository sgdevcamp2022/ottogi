import ServerSetting from "@pages/ServerSetting";
import UserSetting from "@pages/UserSetting";
import useModalStore from "@store/useModalStore";
import useServerSettingModalStore from "@store/useServerSettingModalStore";
import useUserSettingModalStore from "@store/useUserSettingModalStore";
import { useEffect } from "react";
import styled from "styled-components";
import InviteFriendModal from "../organisms/InviteFriendModal";
import ServerList from "../organisms/ServerList";
import Tab2Footer from "../organisms/Tab2Footer";
import Tab2ServerBody from "../organisms/Tab2ServerBody";
import Tab2ServerHeader from "../organisms/Tab2ServerHeader";
import Tab3ServerBody from "../organisms/Tab3ServerBody";
import Tab3ServerHeader from "../organisms/Tab3ServerHeader";

const ServerPage = () => {
  const { inviteFriendModal, setInviteFriendModal } = useModalStore();
  const { userSettingModal, setUserSettingModal } = useUserSettingModalStore();
  const { serverSettingModal, setServerSettingModal } =
    useServerSettingModalStore();
  useEffect(() => {
    setInviteFriendModal(false);
    setUserSettingModal(false);
    setServerSettingModal(false);
  }, []);
  return (
    <>
      <ServerList />
      <Tab2Container>
        <Tab2ServerHeader />
        <Tab2ServerBody />
        <Tab2Footer />
      </Tab2Container>
      <Tab3Container>
        <Tab3ServerHeader />
        <Tab3ServerBody />
      </Tab3Container>
      {inviteFriendModal && <InviteFriendModal />}
      {userSettingModal && <UserSetting />}
      {serverSettingModal && <ServerSetting />}
    </>
  );
};

const Tab2Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.tab2};
  width: 15rem;
  display: flex;
  flex-direction: column;
`;

const Tab3Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.tab3};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default ServerPage;
