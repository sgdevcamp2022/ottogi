import styled from "styled-components";
import ButtonWrapper from "../../atoms/Button/ButtonWrapper";
import Text from "../../atoms/Text/Text";
import UserState32, { StateType } from "../Div/UserState32";

interface UserInfoButtonProps {
  name: string;
  status?: StateType;
}

const UserInfoButton = ({ name, status = "on" }: UserInfoButtonProps) => {
  return (
    <ButtonWrapper onClick={() => {}} height={39} hoverBackgroundColor="active">
      <InfoContainer>
        <UserState32 status={status} />
        <Text text={name} fontWeight="bold" fontSize="sm" color="white" />
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
