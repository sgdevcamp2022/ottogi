import PageContainer from "../atoms/Div/PageContainer";
import Tab2Body from "../atoms/Div/Tab2Body";
import Tab2Container from "../atoms/Div/Tab2Container";
import Tab2Header from "../atoms/Div/Tab2Header";
import Tab3Body from "../atoms/Div/Tab3Body";
import Tab3Container from "../atoms/Div/Tab3Container";
import Tab3Header from "../atoms/Div/Tab3Header";
import TabDivider from "../atoms/Div/TabDivider";
import ChatAddIcon from "../atoms/Icons/ChatAddIcon";
import FriendButton from "../molecules/Button/FriendButton";
import SearchButton from "../molecules/Button/SearchButton";
import FriendHeader from "../organisms/FriendHeader";
import FriendList from "../organisms/Tab2FriendList";
import Tab2Footer from "../organisms/Tab2Footer";

const MainPage = () => {
  return (
    <PageContainer>
      <>
        <Tab2Container>
          <>
            <Tab2Header>
              <SearchButton />
            </Tab2Header>
            <TabDivider />
            <Tab2Body>
              <>
                <FriendButton />
                <FriendList />
              </>
            </Tab2Body>
            <Tab2Footer username="nno3onn" />
          </>
        </Tab2Container>
        <Tab3Container>
          <>
            <Tab3Header>
              <>
                <FriendHeader />
                <ChatAddIcon />
              </>
            </Tab3Header>
            <TabDivider />
            <Tab3Body>
              <>d</>
            </Tab3Body>
          </>
        </Tab3Container>
      </>
    </PageContainer>
  );
};

export default MainPage;
