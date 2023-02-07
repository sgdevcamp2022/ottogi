import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ButtonWrapper from "../../atoms/Button/ButtonWrapper";
import Text from "../../atoms/Text/Text";
import UserState, { StateType } from "../Div/UserState32";

interface DirectButtonProps {
  id: number;
  name: string;
  active?: boolean;
  status?: StateType;
}

const DirectButton = ({ id, name, status = "on" }: DirectButtonProps) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const goChatRoom = () => {
    navigate(`/@me/${id}`);
  };

  return (
    <ButtonWrapper
      active={userId === id.toString()}
      onClick={goChatRoom}
      height={42}
      ph={8}
    >
      <DirectButtonContainer>
        <UserState status={status} />
        <Text text={name} />
      </DirectButtonContainer>
    </ButtonWrapper>
  );
};

const DirectButtonContainer = styled.div`
  height: 42px;
  align-items: center;
  display: flex;
  gap: 0.75rem;
`;

export default DirectButton;
