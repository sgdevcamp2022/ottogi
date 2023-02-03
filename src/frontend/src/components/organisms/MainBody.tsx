import styled from "styled-components";
import useTabStore, { MainStatusType } from "../../store/useTabStore";
import MainAddFriend from "./MainAddFriend";
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
  const { mainStatus } = useTabStore(({ mainStatus }) => ({ mainStatus }));
  return <MainBodyContainer>{getBodyByStatus(mainStatus)}</MainBodyContainer>;
};

const MainBodyContainer = styled.div`
  height: 100%;
  padding: 0 1.25rem;
`;

export default MainBody;
