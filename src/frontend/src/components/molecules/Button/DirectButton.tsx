import styled from "styled-components";
import ButtonWrapper from "../../atoms/Button/ButtonWrapper";
import Text from "../../atoms/Text/Text";
import UserState, { StateType } from "../Div/UserState32";

interface DirectButtonProps {
  username: string;
  active?: boolean;
  status?: StateType;
}

const DirectButton = ({ username, active = false, status = "on" }: DirectButtonProps) => {
  return (
    <ButtonWrapper active={active} onClick={() => {}} height={42}>
      <DirectButtonContainer>
        <UserState status={status} />
        <Text text={username} />
      </DirectButtonContainer>
    </ButtonWrapper>
  );
};

const DirectButtonContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 0.75rem;
`;

export default DirectButton;
