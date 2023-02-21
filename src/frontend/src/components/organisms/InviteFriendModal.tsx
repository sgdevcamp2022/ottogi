import InviteFriendModalHeader from "../molecules/Div/InviteFriendModalHeader";
import InviteFriendModalBody from "../molecules/Div/InviteFriendModalBody";
import InviteFriendModalFooter from "../molecules/Div/InviteFriendModalFooter";
import BackgroundModal from "./BackgroundModal";
import useModalStore from "@store/useModalStore";

const InviteFriendModal = () => {
  const { setInviteFriendModal } = useModalStore();
  return (
    <BackgroundModal
      width={440}
      p={0}
      onClick={() => setInviteFriendModal(false)}
    >
      <>
        <InviteFriendModalHeader />
        <InviteFriendModalBody />
        <InviteFriendModalFooter />
      </>
    </BackgroundModal>
  );
};

export default InviteFriendModal;
