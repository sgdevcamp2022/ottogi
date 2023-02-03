import styled from "styled-components";
import DirectButton from "../Button/DirectButton";
import DirectMessage from "./DirectMessage";

const FriendList = () => {
  return (
    <FriendListContainer>
      <DirectMessage />
      <ListContainer>
        {new Array(10).fill(null).map((v, idx) => (
          <DirectButton username="허다은" id={idx} />
        ))}
      </ListContainer>
    </FriendListContainer>
  );
};

const FriendListContainer = styled.div`
  padding: 0 0.5rem;
  background-color: ${({ theme }) => theme.backgroundColor.trans};
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export default FriendList;
