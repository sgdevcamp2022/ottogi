import { useMutation } from "@tanstack/react-query";
import { ReactElement } from "react";
import friendApi from "../../../api/friend";
import useAcceptFriend from "../../../hooks/query/useAcceptFriend";
import useCancelFriend from "../../../hooks/query/useCancelFriend";
import useRejectFriend from "../../../hooks/query/useRejectFriend";
import { useUserStore } from "../../../store/useUserStore";
import CancelIcon from "../../atoms/Icons/CancelIcon";
import CheckIcon from "../../atoms/Icons/CheckIcon";
import RoundButton from "../Button/RoundButton";
import FriendBox from "./FriendBox";

type WaitingStatusType = "REQUEST" | "WAIT";

interface FriendWaitingBoxProps {
  name: string;
  status: WaitingStatusType;
}

const FriendWaitingBox = ({ name, status }: FriendWaitingBoxProps) => {
  const { userInfo } = useUserStore();
  const { mutate: acceptFriend } = useAcceptFriend();
  const { mutate: rejectFriend } = useRejectFriend();
  const { mutate: cancelFriend } = useCancelFriend();

  if (!userInfo) return <></>;

  const params = { email: userInfo.email, accessToken: userInfo.accessToken };

  let Buttons: ReactElement;
  if (status === "REQUEST") {
    Buttons = (
      <>
        <RoundButton Icon={<CheckIcon />} onClick={() => acceptFriend(params)} />
        <RoundButton Icon={<CancelIcon />} onClick={() => rejectFriend(params)} />
      </>
    );
  } else {
    Buttons = <RoundButton Icon={<CancelIcon />} onClick={() => cancelFriend(params)} />;
  }

  return <FriendBox name={name} status={`${status === "REQUEST" ? "받은" : "보낸"} 친구 요청`} onClick={() => null} Buttons={Buttons} />;
};

export default FriendWaitingBox;
