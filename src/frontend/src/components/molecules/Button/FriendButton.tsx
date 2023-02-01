import styled from "styled-components";
import ButtonWrapper from "../../atoms/Button/ButtonWrapper";
import PersonIcon from "../../atoms/Icons/PersonIcon";
import Text from "../../atoms/Text/Text";

interface FriendButtonProps {
  active?: boolean;
}

const FriendButton = ({ active = false }: FriendButtonProps) => {
  return (
    <ButtonWrapper active={active} onClick={() => {}}>
      <FriendButtonContainer>
        <PersonIcon />
        <Text text="친구" />
      </FriendButtonContainer>
    </ButtonWrapper>
  );
};

const FriendButtonContainer = styled.div`
  height: 2.625rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export default FriendButton;
