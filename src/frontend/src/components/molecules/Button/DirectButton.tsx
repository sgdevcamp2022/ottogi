import styled from "styled-components";
import ButtonWrapper from "@components/atoms/Button/ButtonWrapper";
import Text from "@components/atoms/Text/Text";
import { useNavigate, useParams } from "react-router-dom";
import UserState32, { StateType } from "../Div/UserState32";
import useSendToStore from "@store/useSendToStore";

interface DirectButtonProps {
  id: string;
  name: string;
  status?: StateType;
}

const DirectButton = ({ id, name, status = "on" }: DirectButtonProps) => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const { setSendTo } = useSendToStore();

  const goChatRoom = () => {
    navigate(`/@me/${id}`);
    setSendTo(name);
  };

  return (
    <ButtonWrapper
      active={channelId === id}
      onClick={goChatRoom}
      height={42}
      ph={8}
      color="inactive"
    >
      <DirectButtonContainer>
        <UserState32 status={status} />
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
