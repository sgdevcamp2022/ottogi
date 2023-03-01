import CancelIcon from "@components/atoms/Icons/CancelIcon";
import CheckIcon from "@components/atoms/Icons/CheckIcon";
import useAcceptFriend from "@hooks/query/useAcceptFriend";
import useRejectFriend from "@hooks/query/useRejectFriend";
import { useUserStore } from "@store/useUserStore";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RoundButton from "../Button/RoundButton";
import FriendBox from "./FriendBox";

interface FriendWaitingBoxProps {
  name: string;
  email: string;
  status: FriendStateType;
  src: string;
}

const FriendWaitingBox = ({
  name,
  email,
  status,
  src,
}: FriendWaitingBoxProps) => {
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const { mutate: acceptFriend } = useAcceptFriend();
  const { mutate: rejectFriend } = useRejectFriend();

  if (!userInfo) navigate("/login");

  const params = { email };

  let Buttons: ReactElement;
  if (status === "WAIT") {
    Buttons = (
      <>
        <RoundButton
          Icon={<CheckIcon />}
          onClick={() => acceptFriend(params)}
        />
        <RoundButton
          Icon={
            <CancelIconWrapper>
              <CancelIcon />
            </CancelIconWrapper>
          }
          onClick={() => rejectFriend(params)}
        />
      </>
    );
  } else {
    Buttons = (
      <RoundButton Icon={<CancelIcon />} onClick={() => rejectFriend(params)} />
    );
  }

  return (
    <FriendBox
      src={src}
      name={name}
      status={status === "WAIT" ? "2" : "3"}
      onClick={() => null}
      Buttons={Buttons}
    />
  );
};

const CancelIconWrapper = styled.div`
  &:hover {
    color: ${({ theme }) => theme.backgroundColor["voice-hangup"]};
  }
`;

export default FriendWaitingBox;
