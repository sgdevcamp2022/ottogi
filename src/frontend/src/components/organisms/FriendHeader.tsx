import styled from "styled-components";
import TextButton from "../atoms/Button/TextButton";
import DividerVertical from "../atoms/Div/DividerVertical";
import FriendHeaderLeft from "../atoms/Div/FriendHeaderLeft";

type ActiveType = "온라인" | "모두" | "대기중" | "차단목록" | "친구추가";
interface FriendHeaderProps {
  active?: ActiveType;
}

const FriendHeader = ({ active = "온라인" }: FriendHeaderProps) => {
  return (
    <FriendHeaderContainer>
      <FriendHeaderLeft />
      <DividerVertical mv={8} />
      <RightContainer>
        <TextButton text="온라인" color="tab3-header" hoverColor="icon" hoverBackgroundColor="hover" onClick={() => null} />
        <TextButton text="모두" color="tab3-header" hoverColor="icon" hoverBackgroundColor="hover" onClick={() => null} />
        <TextButton text="대기 중" color="tab3-header" hoverColor="icon" hoverBackgroundColor="hover" onClick={() => null} />
        <TextButton text="차단 목록" color="tab3-header" hoverColor="icon" hoverBackgroundColor="hover" onClick={() => null} />
        <TextButton
          text="친구 추가하기"
          color="white"
          hoverColor="invite-success"
          backgroundColor="add-friend"
          hoverBackgroundColor="trans"
          onClick={() => null}
        />
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
