import styled from "styled-components";
import FriendBox from "../molecules/Div/FriendBox";
import LabelText from "../molecules/Text/LabelText";

const MainWaiting = () => {
  return (
    <MainWaitingContainer>
      <LabelText label={"대기 중"} num={10} />
      <div>
        <FriendBox username="nno3onn" status="보낸 친구 요청" />
        <FriendBox username="nno3onn" status="보낸 친구 요청" />
        <FriendBox username="nno3onn" status="보낸 친구 요청" />
        <FriendBox username="nno3onn" status="보낸 친구 요청" />
        <FriendBox username="nno3onn" status="보낸 친구 요청" />
        <FriendBox username="nno3onn" status="보낸 친구 요청" />
      </div>
    </MainWaitingContainer>
  );
};

const MainWaitingContainer = styled.div``;

export default MainWaiting;
