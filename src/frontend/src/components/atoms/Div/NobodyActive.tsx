import styled from "styled-components";
import Text from "../Text/Text";

const NobodyActive = () => {
  return (
    <NobodyActiveContainer>
      <Text
        text="지금은 조용하네요..."
        color="white"
        fontSize="base"
        center
        mb={8}
        fontWeight="bold"
      />
      <Text
        text="친구가 음성 채팅과 같은 활동을 시작하면 여기에 표시돼요!"
        color="auth-desc"
        fontSize="sm"
        center
      />
    </NobodyActiveContainer>
  );
};

const NobodyActiveContainer = styled.div`
  padding: 16px;
`;

export default NobodyActive;
