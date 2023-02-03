import styled from "styled-components";
import Text from "../../atoms/Text/Text";

interface LabelTextProps {
  label?: "온라인" | "모든 친구" | "대기 중" | "대기 중";
  num: number;
}

const LabelText = ({ label = "온라인", num }: LabelTextProps) => {
  return (
    <MainOnlineContainer>
      <Text fontSize="xs" text={`${label} — ${num}명`} color="auth-desc" fontWeight="bold" />
    </MainOnlineContainer>
  );
};

const MainOnlineContainer = styled.div`
  padding: 1rem 1.25rem 0.5rem 0.5rem;
`;

export default LabelText;
