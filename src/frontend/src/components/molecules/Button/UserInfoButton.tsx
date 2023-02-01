import styled from "styled-components";
import ButtonWrapper from "../../atoms/Button/ButtonWrapper";
import Text from "../../atoms/Text/Text";
import UserState32, { StateType } from "../Div/UserState32";

interface UserInfoButtonProps {
  username: string;
  state?: StateType;
}

const UserInfoButton = ({ username, state = "on" }: UserInfoButtonProps) => {
  return (
    <ButtonWrapper onClick={() => {}} height={39}>
      <InfoContainer>
        <UserState32 state={state} />
        <Text text={username} fontWeight="bold" fontSize="sm" color="white" />
      </InfoContainer>
    </ButtonWrapper>
  );
};

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export default UserInfoButton;
