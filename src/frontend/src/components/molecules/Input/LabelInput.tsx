import styled from "styled-components";
import Text from "../../atoms/Text/Text";

const LabelInput = () => {
  return (
    <LabelInputContainer>
      <Text text="이메일 또는 전화번호" />
    </LabelInputContainer>
  );
};

const LabelInputContainer = styled.div`
  margin-bottom: 20px;
`;

export default LabelInput;
