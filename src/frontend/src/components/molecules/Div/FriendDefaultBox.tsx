import Tip from "@components/atoms/Div/Tooltip";
import CancelIcon from "@components/atoms/Icons/CancelIcon";
import ChatIcon from "@components/atoms/Icons/ChatIcon";
import MoreIcon from "@components/atoms/Icons/MoreIcon";
import useGetFriendStatus from "@hooks/query/useGetFriendStatus";
import useMainStore from "@store/useMainStore";
import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RoundButton from "../Button/RoundButton";
import EtcModal from "./EtcModal";
import FriendBox from "./FriendBox";

interface FriendDefaultBoxProps {
  id: string;
  name: string;
  userId: number;
  status: FriendStateType;
}

const FriendDefaultBox = ({
  id,
  name,
  userId,
  status,
}: FriendDefaultBoxProps) => {
  const navigate = useNavigate();
  const { setUserName, setUserId } = useMainStore();
  const [showEtcModal, setShowEtcModal] = useState(false);
  const { data: isOnline, isLoading } = useGetFriendStatus({ userId });

  if (isLoading) return <></>;

  const enterDM = () => {
    navigate(`/@me/${id}`);
    setUserName(name);
    setUserId(userId);
  };

  let Buttons: ReactElement;
  if (status === "WAIT") {
    Buttons = (
      <Tip title="취소" place="top">
        <RoundButton Icon={<CancelIcon />} onClick={() => null} />
      </Tip>
    );
  } else {
    Buttons = (
      <>
        <Tip title="메시지 보내기" place="top">
          <RoundButton Icon={<ChatIcon />} onClick={enterDM} />
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
      status={isOnline?.data.data}
      onClick={() => null}
      Buttons={Buttons}
    />
  );
};

const EtcContainer = styled.div`
  position: relative;
`;

export default FriendDefaultBox;
