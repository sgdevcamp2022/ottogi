import styled from "styled-components";
import ButtonWrapper from "../../atoms/Button/ButtonWrapper";
import Text from "../../atoms/Text/Text";
import UserState, { StateType } from "../Div/UserState32";

interface DirectButtonProps {
  active?: boolean;
  username: string;
  state?: StateType;
}

const DirectButton = ({ active = false, username, state = "on" }: DirectButtonProps) => {
  return (
    <ButtonWrapper active={active} onClick={() => {}}>
      <DirectButtonContainer>
        <UserState state={state} />
        <Text text={username} />
      </DirectButtonContainer>
    </ButtonWrapper>
  );
};

const DirectButtonContainer = styled.div`
  height: 2.625rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 0.5rem;
`;

export default DirectButton;
