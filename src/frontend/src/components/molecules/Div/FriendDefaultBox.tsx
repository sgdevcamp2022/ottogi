import { ReactElement } from "react";
import useMainStore from "../../../store/useMainStore";
import CancelIcon from "../../atoms/Icons/CancelIcon";
import ChatIcon from "../../atoms/Icons/ChatIcon";
import MoreIcon from "../../atoms/Icons/MoreIcon";
import RoundButton from "../Button/RoundButton";
import FriendBox from "./FriendBox";

interface FriendDefaultBoxProps {
  id: number;
  name: string;
  status?: "온라인" | "오프라인" | "자리 비움" | "다른 용무 중" | "보낸 친구 요청";
}

const FriendDefaultBox = ({ id, name, status = "온라인" }: FriendDefaultBoxProps) => {
  const { setMainTab } = useMainStore(({ setMainTab }) => ({ setMainTab }));

  const onClick = () => setMainTab(id.toString());

  let Buttons: ReactElement;
  if (status === "보낸 친구 요청") {
    Buttons = <RoundButton Icon={<CancelIcon />} onClick={() => null} />;
  } else {
    Buttons = (
      <>
        <RoundButton Icon={<ChatIcon />} onClick={() => null} />
        <RoundButton Icon={<MoreIcon />} onClick={() => null} />
      </>
    );
  }

  return <FriendBox name={name} status={status} onClick={onClick} Buttons={Buttons} />;
};

export default FriendDefaultBox;
