import { ReactElement } from "react";
import styled from "styled-components";
import useAcceptFriend from "../../../hooks/query/useAcceptFriend";
import useCancelFriend from "../../../hooks/query/useCancelFriend";
import useRejectFriend from "../../../hooks/query/useRejectFriend";
import { useUserStore } from "../../../store/useUserStore";
import CancelIcon from "../../atoms/Icons/CancelIcon";
import CheckIcon from "../../atoms/Icons/CheckIcon";
import RoundButton from "../Button/RoundButton";
import FriendBox from "./FriendBox";

interface FriendWaitingBoxProps {
  name: string;
  status: FriendStateType;
}

const FriendWaitingBox = ({ name, status }: FriendWaitingBoxProps) => {
  const { userInfo } = useUserStore();
  const { mutate: acceptFriend } = useAcceptFriend();
  const { mutate: rejectFriend } = useRejectFriend();
  const { mutate: cancelFriend } = useCancelFriend();

  if (!userInfo) return <></>;

  const params = { email: name, accessToken: userInfo.accessToken };

  let Buttons: ReactElement;
  if (status === "REQUEST") {
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
      <RoundButton Icon={<CancelIcon />} onClick={() => cancelFriend(params)} />
    );
  }

  return (
    <FriendBox
      name={name}
      status={`${status === "REQUEST" ? "받은" : "보낸"} 친구 요청`}
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
