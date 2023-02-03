import styled from "styled-components";
import useMainStore, { MainStatusType } from "../../store/useMainStore";
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
  const { mainTab, mainStatus } = useMainStore(({ mainTab, mainStatus }) => ({ mainTab, mainStatus }));

  if (mainTab === "친구") {
    return <MainBodyContainer>{getBodyByStatus(mainStatus)}</MainBodyContainer>;
  }
  return <>dd</>;
};

const MainBodyContainer = styled.div`
  flex: 1;
  padding: 0 1.25rem;
`;

export default MainBody;
