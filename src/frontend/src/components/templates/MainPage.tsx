import styled from "styled-components";
import TabDivider from "../atoms/Div/TabDivider";
import MainBody from "../organisms/MainBody";
import Tab2Body from "../organisms/Tab2Body";
import Tab2Footer from "../organisms/Tab2Footer";
import Tab2Header from "../organisms/Tab2Header";
import Tab3Header from "../organisms/Tab3Header";

const MainPage = () => {
  return (
    <>
      <Tab2Container>
        <Tab2Header />
        <TabDivider />
        <Tab2Body />
        <Tab2Footer username="nno3onn" />
      </Tab2Container>
      <Tab3Container>
        <Tab3Header />
        <TabDivider />
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
