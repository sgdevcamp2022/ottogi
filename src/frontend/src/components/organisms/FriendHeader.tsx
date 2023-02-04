import styled from "styled-components";
import FriendHeaderLeft from "../atoms/Div/FriendHeaderLeft";
import MainTabButton from "../atoms/Div/MainTabButton";
import ChatAddIcon from "../atoms/Icons/ChatAddIcon";

const FriendHeader = () => {
  return (
    <FriendHeaderContainer>
      <LeftContainer>
        <FriendHeaderLeft />
        <MainTabButton status={"온라인"} />
        <MainTabButton status={"모두"} />
        <MainTabButton status={"대기 중"} />
        <MainTabButton status={"친구 추가하기"} />
      </LeftContainer>
      <RightContainer>
        <ChatAddIcon />
      </RightContainer>
    </FriendHeaderContainer>
  );
};

const FriendHeaderContainer = styled.div`
  width: 100%;
  height: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const RightContainer = styled.div``;

export default FriendHeader;
