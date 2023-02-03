import styled from "styled-components";
import { flexCenter } from "../../styles/flexCenter";
import AddFriend from "../molecules/Div/AddFriend";

const MainAddFriend = () => {
  return (
    <MainAddFriendContainer>
      <AddFriendContainer>
        <AddFriend />
      </AddFriendContainer>
      <MainAddFriendBody>친구를 기다리고 있어요.</MainAddFriendBody>
    </MainAddFriendContainer>
  );
};

const MainAddFriendContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.backgroundColor.tab3}; // test
  display: flex;
  flex-direction: column;
`;

const AddFriendContainer = styled.div`
  padding: 1.25rem 1.875rem;
  border-bottom: 1px solid ${({ theme }) => theme.backgroundColor.divider};
`;

const MainAddFriendBody = styled.div`
  flex: 1;
  ${flexCenter}

  color:${({ theme }) => theme.color["auth-desc"]}
`;

export default MainAddFriend;
