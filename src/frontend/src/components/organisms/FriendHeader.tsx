import { useState } from "react";
import styled from "styled-components";
import FriendHeaderLeft from "../atoms/Div/FriendHeaderLeft";
import MainTabButton from "../atoms/Div/MainTabButton";
import Tip from "../atoms/Div/Tooltip";
import ChatAddIcon from "../atoms/Icons/ChatAddIcon";
import CreateDirectMessageModal from "./CreateDirectMessageModal";

const FriendHeader = () => {
  const [showDMModal, setShowDMModal] = useState(false);
  return (
    <>
      <FriendHeaderContainer>
        <LeftContainer>
          <FriendHeaderLeft />
          <MainTabButton status={"온라인"} />
          <MainTabButton status={"모두"} />
          <MainTabButton status={"대기 중"} />
          <MainTabButton status={"친구 추가하기"} />
        </LeftContainer>
        <Tip title="새로운 그룹 메시지" place="bottom">
          <RightContainer onClick={() => setShowDMModal(!showDMModal)}>
            <ChatAddIcon />
          </RightContainer>
        </Tip>
      </FriendHeaderContainer>
      {showDMModal && (
        <DMModalWrapper>
          <CreateDirectMessageModal top={20} left={-440} />
        </DMModalWrapper>
      )}
    </>
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

const DMModalWrapper = styled.div`
  position: relative;
`;

export default FriendHeader;
