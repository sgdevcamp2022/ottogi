import styled from "styled-components";
import DirectButton from "../Button/DirectButton";
import DirectMessage from "./DirectMessage";
import ScrollableBox from "./scrollableBox";

const FriendList = () => {
  return (
    <FriendListContainer>
      <DirectMessage />
      <ScrollableBox>
        <ListContainer>
          {new Array(10).fill(null).map((v, idx) => (
            <DirectButton name="허다은" id={idx} />
          ))}
        </ListContainer>
      </ScrollableBox>
    </FriendListContainer>
  );
};

const FriendListContainer = styled.div`
  padding: 0 0.25rem;
  background-color: ${({ theme }) => theme.backgroundColor.trans};
`;

const ListContainer = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export default FriendList;
