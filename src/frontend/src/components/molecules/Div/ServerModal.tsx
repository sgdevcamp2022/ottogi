import DarkModal from "@components/atoms/Div/DarkModal";
import EditIcon from "@components/atoms/Icons/EditIcon";
import LogoutIcon from "@components/atoms/Icons/LogoutIcon";
import PersonAddIcon from "@components/atoms/Icons/PersonAddIcon";
import styled from "styled-components";
import DarkModalButton from "../Button/DarkModalButton";

const ServerModal = () => {
  return (
    <DarkModal width={220} top={55} left={80}>
      <DarkModalButton
        text="초대하기"
        color="invite"
        onClick={() => null}
        Icon={<PersonAddIcon />}
      />
      <DarkModalButton
        text="서버 프로필 편집"
        onClick={() => null}
        Icon={<EditIcon />}
      />
      <Divider />
      <DarkModalButton
        text="서버 나가기"
        color="red"
        hoverBackgroundColor="voice-hangup"
        onClick={() => null}
        Icon={<LogoutIcon />}
      />
    </DarkModal>
  );
};

const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.backgroundColor.divider};
`;

export default ServerModal;
