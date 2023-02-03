import styled from "styled-components";
import Text from "../../atoms/Text/Text";

const LoginText = () => {
  return (
    <LoginTextContainer>
      <Text text="돌아오신 것을 환영해요!" color="white" fontSize="xxl" fontWeight="bold" mb={12} />
      <Text text="다시 만나다니 너무 반가워요!" color="auth-desc" />
    </LoginTextContainer>
  );
};

const LoginTextContainer = styled.div`
  text-align: center;
  margin-bottom: 1.25rem;
`;

export default LoginText;