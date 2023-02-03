import styled from "styled-components";
import Tab3Header from "../atoms/Div/Tab3Header";
import TabDivider from "../atoms/Div/TabDivider";
import ChatAddIcon from "../atoms/Icons/ChatAddIcon";
import FriendButton from "../molecules/Button/FriendButton";
import SearchButton from "../molecules/Button/SearchButton";
import FriendHeader from "../organisms/FriendHeader";
import FriendList from "../organisms/Tab2FriendList";
import UserInfoBar from "../organisms/UserInfoBar";

const MainPage = () => {
  return (
    <MainPageContainer>
      <Tab2Container>
        <Tab2Header>
          <SearchButton />
        </Tab2Header>
        <TabDivider />
        <Tab2Body>
          <FriendButton />
          <FriendList />
        </Tab2Body>
        <Tab2Footer>
          <UserInfoBar username="nno3onn" />
        </Tab2Footer>
      </Tab2Container>
      <Tab3Container>
        <Tab3Header>
          <>
            <FriendHeader />
            <ChatAddIcon />
          </>
        </Tab3Header>
        <TabDivider />
        <Tab3Body>d</Tab3Body>
      </Tab3Container>
    </MainPageContainer>
  );
};

const MainPageContainer = styled.div`
  width: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const Tab2Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.tab2};
  width: 15rem;
  display: flex;
  flex-direction: column;
`;

const Tab2Header = styled.div`
  padding: 0 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
`;
const Tab2Body = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  flex: 1;
`;
const Tab2Footer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor["user-tab"]};
`;

const Tab3Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.tab3};
  flex: 1;
`;
const Tab3Body = styled.div``;

export default MainPage;
