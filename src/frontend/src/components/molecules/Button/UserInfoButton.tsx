import ButtonWrapper from "@components/atoms/Button/ButtonWrapper";
import Text from "@components/atoms/Text/Text";
import { useUserStore } from "@store/useUserStore";
import styled from "styled-components";
import UserState32, { StateType } from "../Div/UserState32";

interface UserInfoButtonProps {
  status?: StateType;
}

const UserInfoButton = ({ status = "on" }: UserInfoButtonProps) => {
  const {
    userInfo: { email },
  } = useUserStore();

  return (
    <ButtonWrapper
      onClick={() => null}
      height={39}
      hoverBackgroundColor="active"
      ph={0}
    >
      <InfoContainer>
        <UserState32 status={status} />
        <Text text={email} fontWeight="bold" fontSize="sm" color="white" />
      </InfoContainer>
    </ButtonWrapper>
  );
};

const InfoContainer = styled.div`
  width: 7.625rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  p {
    display: inline-block;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default UserInfoButton;
