import styled from "styled-components";
import AddIcon from "../../atoms/Icons/AddIcon";
import Text from "../../atoms/Text/Text";

const DirectMessage = () => {
  return (
    <DirectMessageContainer>
      <Text text="다이렉트 메시지" fontSize="sm" />
      <PlusButtonContainer>
        <AddIcon />
      </PlusButtonContainer>
    </DirectMessageContainer>
  );
};

const DirectMessageContainer = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1.125rem 0.5rem 0.25rem 1.125rem;
  color: ${({ theme }) => theme.color.inactive};
  &:hover {
    color: ${({ theme }) => theme.color.white};
  }
`;

const PlusButtonContainer = styled.div`
  color: ${({ theme }) => theme.color.icon};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.white};
  }
`;

export default DirectMessage;
