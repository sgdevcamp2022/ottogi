import styled from "styled-components";
import EmptyContainer from "../molecules/Div/EmptyContainer";
import FriendBox from "../molecules/Div/FriendBox";
import LabelText from "../molecules/Text/LabelText";

const MainWaiting = () => {
  const num = 0;
  return (
    <MainWaitingContainer>
      {num > 0 ? (
        <>
          <LabelText label={"대기 중"} num={num} />
          <div>
            <FriendBox username="nno3onn" status="보낸 친구 요청" />
            <FriendBox username="nno3onn" status="보낸 친구 요청" />
            <FriendBox username="nno3onn" status="보낸 친구 요청" />
            <FriendBox username="nno3onn" status="보낸 친구 요청" />
            <FriendBox username="nno3onn" status="보낸 친구 요청" />
            <FriendBox username="nno3onn" status="보낸 친구 요청" />
          </div>
        </>
      ) : (
        <EmptyContainer image="waiting" text="대기 중인 친구 요청이 없네요. 그래도 옆에 Ottogi는 있네요." />
      )}
    </MainWaitingContainer>
  );
};

const MainWaitingContainer = styled.div``;

export default MainWaiting;
