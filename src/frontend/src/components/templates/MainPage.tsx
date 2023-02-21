import styled from "styled-components";
import MainBody from "../organisms/MainBody";
import ServerList from "../organisms/ServerList";
import Tab2MainBody from "../organisms/Tab2MainBody";
import Tab2Footer from "../organisms/Tab2Footer";
import Tab2MainHeader from "../organisms/Tab2MainHeader";
import Tab3MainHeader from "../organisms/Tab3MainHeader";
import useUserSettingModalStore from "@store/useUserSettingModalStore";
import UserSetting from "@pages/UserSetting";
import { useEffect } from "react";

const MainPage = () => {
  const { userSettingModal, setUserSettingModal } = useUserSettingModalStore();
  useEffect(() => {
    setUserSettingModal(false);
  }, []);
  return (
    <>
      <ServerList />
      <Tab2Container>
        <Tab2MainHeader />
        <Tab2MainBody />
        <Tab2Footer />
      </Tab2Container>
      <Tab3Container>
        <Tab3MainHeader />
        <MainBody />
      </Tab3Container>
      {userSettingModal && <UserSetting />}
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

export default MainPage;
