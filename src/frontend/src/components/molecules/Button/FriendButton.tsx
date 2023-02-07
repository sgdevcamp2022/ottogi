import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonWrapper from "../../atoms/Button/ButtonWrapper";
import PersonIcon from "../../atoms/Icons/PersonIcon";
import Text from "../../atoms/Text/Text";

const FriendButton = () => {
  const info = useMatch("/@me");
  const navigate = useNavigate();

  return (
    <ButtonWrapper active={!!info} onClick={() => navigate("/@me")} height={42}>
      <FriendButtonContainer>
        <PersonIcon />
        <Text text="친구" color={info ? "white" : "inactive"} />
      </FriendButtonContainer>
    </ButtonWrapper>
  );
};

const FriendButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export default FriendButton;
