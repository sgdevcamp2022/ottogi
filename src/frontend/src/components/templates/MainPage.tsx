import styled from "styled-components";
import MainBody from "../organisms/MainBody";
import ServerList from "../organisms/ServerList";
import Tab2MainBody from "../organisms/Tab2MainBody";
import Tab2Footer from "../organisms/Tab2Footer";
import Tab2MainHeader from "../organisms/Tab2MainHeader";
import Tab3MainHeader from "../organisms/Tab3MainHeader";

const MainPage = () => {
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