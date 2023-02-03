import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonWrapper from "../../atoms/Button/ButtonWrapper";
import CancelIcon from "../../atoms/Icons/CancelIcon";
import ChatIcon from "../../atoms/Icons/ChatIcon";
import MoreIcon from "../../atoms/Icons/MoreIcon";
import Text from "../../atoms/Text/Text";
import RoundButton from "../Button/RoundButton";
import UserState32 from "./UserState32";

interface FriendBoxProps {
  id: number;
  username: string;
  status?: "온라인" | "오프라인" | "자리 비움" | "다른 용무 중" | "보낸 친구 요청";
}

const FriendBox = ({ id, username, status = "온라인" }: FriendBoxProps) => {
  const navigate = useNavigate();

  const goChatRoom = () => {
    navigate(`/${id}`);
  };

  return (
    <ButtonWrapper onClick={goChatRoom}>
      <FriendBoxContainer>
        <UserContainer>
          <UserState32 />
          <UserText>
            <Text text={username} color="white" fontWeight="bold" />
            <Text text={status} fontSize="sm" color="auth-desc" />
          </UserText>
        </UserContainer>
        <Buttons>
          {status === "보낸 친구 요청" ? (
            <RoundButton Icon={<CancelIcon />} />
          ) : (
            <>
              <RoundButton Icon={<ChatIcon />} />
              <RoundButton Icon={<MoreIcon />} />
            </>
          )}
        </Buttons>
      </FriendBoxContainer>
    </ButtonWrapper>
  );
};

const FriendBoxContainer = styled.div`
  width: 100%;
  height: 61px;
  border-top: 1px solid ${({ theme }) => theme.backgroundColor.divider};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.75rem;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

export default FriendBox;
