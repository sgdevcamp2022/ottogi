import useMainStore, { MainStatusType } from "@store/useMainStore";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import SideBar from "../atoms/Div/SideBarWrapper";
import MainAddFriend from "./MainAddFriend";
import MainDirectBody from "./MainDirectBody";
import MainOnline from "./MainOnline";
import MainTotal from "./MainTotal";
import MainWaiting from "./MainWaiting";

const statusComponent = {
  온라인: MainOnline,
  모두: MainTotal,
  "대기 중": MainWaiting,
  "친구 추가하기": MainAddFriend,
};

const getBodyByStatus = (status: MainStatusType) => {
  const Component = statusComponent[status];
  return <Component />;
};

const MainBody = () => {
  const isMain = useMatch("/@me");
  const { mainStatus } = useMainStore(({ mainStatus }) => ({ mainStatus }));

  return (
    <MainBodyContainer>
      {isMain ? (
        <MainFriendBody>{getBodyByStatus(mainStatus)}</MainFriendBody>
      ) : (
        <MainDirectBody />
      )}
      <SideBar>
        <>friend list</>
      </SideBar>
    </MainBodyContainer>
  );
};

const MainBodyContainer = styled.div`
  margin-top: 4px;
  display: flex;
  flex-direction: row;
`;

const MainFriendBody = styled.div`
  padding: 0 20px;
  height: calc(100vh - 55px);
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default MainBody;
