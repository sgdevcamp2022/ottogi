import InviteFriendModalHeader from "../molecules/Div/InviteFriendModalHeader";
import InviteFriendModalBody from "../molecules/Div/InviteFriendModalBody";
import InviteFriendModalFooter from "../molecules/Div/InviteFriendModalFooter";
import BackgroundModal from "./BackgroundModal";

const InviteFriendModal = () => {
  return (
    <BackgroundModal width={440} p={0}>
      <>
        <InviteFriendModalHeader />
        <InviteFriendModalBody />
        <InviteFriendModalFooter />
      </>
    </BackgroundModal>
  );
};

export default InviteFriendModal;
