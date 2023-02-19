import Text from "@components/atoms/Text/Text";
import styled from "styled-components";
import InviteServerInput from "../Input/InviteServerInput";

const InviteFriendModalFooter = () => {
  return (
    <InviteFriendModalFooterContainer>
      <Text
        text="또는 친구에게 서버 초대 링크 전송하기"
        color="auth-desc"
        fontSize="xs"
        fontWeight="bold"
        mb={8}
      />
      <InviteServerInput url="https://discord.gg/e3AZaGPM" />
      <Text
        text="초대 링크가 7일 후 만료돼요."
        fontSize="xs"
        color="auth-desc"
      />
    </InviteFriendModalFooterContainer>
  );
};

const InviteFriendModalFooterContainer = styled.div`
  padding: 1rem;
`;

export default InviteFriendModalFooter;
