import Text from "@components/atoms/Text/Text";
import styled from "styled-components";

interface LabelTextProps {
  label?: "온라인" | "모든 친구" | "대기 중" | "대기 중";
  num: number;
}

const LabelText = ({ label = "온라인", num }: LabelTextProps) => {
  return (
    <LabelTextContainer>
      <Text
        fontSize="xs"
        text={`${label} — ${num}명`}
        color="auth-desc"
        fontWeight="bold"
      />
    </LabelTextContainer>
  );
};

const LabelTextContainer = styled.div`
  padding: 1rem 1.25rem 0.5rem 0.75rem;
`;

export default LabelText;
