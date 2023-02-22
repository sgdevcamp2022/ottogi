import DarkModal from "@components/atoms/Div/DarkModal";
import EditIcon from "@components/atoms/Icons/EditIcon";
import LogoutIcon from "@components/atoms/Icons/LogoutIcon";
import PersonAddIcon from "@components/atoms/Icons/PersonAddIcon";
import useModalStore from "@store/useModalStore";
import useServerSettingModalStore from "@store/useServerSettingModalStore";
import styled from "styled-components";
import DarkModalButton from "../Button/DarkModalButton";

const ServerModal = ({ setShowModal }: any) => {
  const { setInviteFriendModal } = useModalStore();
  const { setServerSettingModal } = useServerSettingModalStore();
  const setModal = () => {
    setServerSettingModal(true);
    setShowModal(false);
  };
  return (
    <DarkModal width={220} top={55} left={80}>
      <DarkModalButton
        text="초대하기"
        color="invite"
        onClick={() => setInviteFriendModal(true)}
        Icon={<PersonAddIcon />}
      />
      <DarkModalButton
        text="서버 설정"
        onClick={() => setModal()}
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
