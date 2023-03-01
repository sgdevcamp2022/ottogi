import styled from "styled-components";
import AddFriend from "../molecules/Div/AddFriend";
import EmptyContainer from "../molecules/Div/EmptyContainer";

const MainAddFriend = () => {
  return (
    <>
      <MainAddFriendContainer>
        <AddFriendContainer>
          <AddFriend />
        </AddFriendContainer>
        <EmptyContainer
          image="addFriend"
          text="Ottogi는 친구를 기다리고 있어요."
        />
      </MainAddFriendContainer>
    </>
  );
};

const MainAddFriendContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddFriendContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.borderColor.divider};
  padding: 1.25rem 1.875rem;
`;

export default MainAddFriend;
