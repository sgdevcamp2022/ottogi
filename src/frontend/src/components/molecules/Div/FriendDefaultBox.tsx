import Tip from "@components/atoms/Div/Tooltip";
import CancelIcon from "@components/atoms/Icons/CancelIcon";
import ChatIcon from "@components/atoms/Icons/ChatIcon";
import MoreIcon from "@components/atoms/Icons/MoreIcon";
import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RoundButton from "../Button/RoundButton";
import EtcModal from "./EtcModal";
import FriendBox from "./FriendBox";

interface FriendDefaultBoxProps {
  id: number;
  name: string;
  status?:
    | "온라인"
    | "오프라인"
    | "자리 비움"
    | "다른 용무 중"
    | "보낸 친구 요청";
}

const FriendDefaultBox = ({
  id,
  name,
  status = "온라인",
}: FriendDefaultBoxProps) => {
  const navigate = useNavigate();
  const [showEtcModal, setShowEtcModal] = useState(false);

  // const onClick = () => navigate(`/@me/${id}`);
  const onClick = () => null;

  let Buttons: ReactElement;
  if (status === "보낸 친구 요청") {
    Buttons = (
      <Tip title="취소" place="top">
        <RoundButton Icon={<CancelIcon />} onClick={() => null} />
      </Tip>
    );
  } else {
    Buttons = (
      <>
        <Tip title="메시지 보내기" place="top">
          <RoundButton
            Icon={<ChatIcon />}
            onClick={() => navigate(`/@me/${id}`)}
          />
        </Tip>
        <EtcContainer>
          <Tip title="기타" place="top">
            <RoundButton
              Icon={<MoreIcon />}
              onClick={() => setShowEtcModal(!showEtcModal)}
            />
          </Tip>
          {showEtcModal && <EtcModal />}
        </EtcContainer>
      </>
    );
  }
  return (
    <FriendBox
      name={name}
      status={status}
      onClick={onClick}
      Buttons={Buttons}
    />
  );
};

const EtcContainer = styled.div`
  position: relative;
`;

export default FriendDefaultBox;
