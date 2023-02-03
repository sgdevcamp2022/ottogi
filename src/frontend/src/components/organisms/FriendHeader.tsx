import styled from "styled-components";
import DividerVertical from "../atoms/Div/DividerVertical";
import FriendHeaderLeft from "../atoms/Div/FriendHeaderLeft";
import MainTabButton from "../atoms/Div/MainTabButton";

const FriendHeader = () => {
  return (
    <FriendHeaderContainer>
      <FriendHeaderLeft />
      <DividerVertical mv={8} />
      <RightContainer>
        <MainTabButton status={"온라인"} />
        <MainTabButton status={"모두"} />
        <MainTabButton status={"대기 중"} />
        <MainTabButton status={"친구 추가하기"} />
        {/* <MainTabButton status={"차단"} /> */}
      </RightContainer>
    </FriendHeaderContainer>
  );
};

const FriendHeaderContainer = styled.div`
  background-color: #36393f;
  height: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RightContainer = styled.div``;

export default FriendHeader;
