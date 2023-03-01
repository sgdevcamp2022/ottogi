import DarkModal from "@components/atoms/Div/DarkModal";
import useRejectFriend from "@hooks/query/useRejectFriend";
import useMainStore from "@store/useMainStore";
import { MouseEvent } from "react";
import DarkModalButton from "../Button/DarkModalButton";

const EtcModal = () => {
  const { deleteFriendEmail } = useMainStore();
  console.log(deleteFriendEmail);
  const { mutate: deleteFriend } = useRejectFriend();

  const clickDeleteFriend = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    deleteFriend({ email: deleteFriendEmail });
  };

  return (
    <DarkModal width={188} left={0}>
      <DarkModalButton text="영상 통화 시작하기" onClick={() => null} />
      <DarkModalButton text="음성 통화 시작하기" onClick={() => null} />
      <DarkModalButton
        text="친구 삭제하기"
        color="red"
        hoverBackgroundColor="voice-hangup"
        onClick={clickDeleteFriend}
      />
    </DarkModal>
  );
};

export default EtcModal;
