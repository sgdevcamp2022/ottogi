import styled from "styled-components";
import BigTitle from "../../atoms/Text/BigTitle";

const LoginText = () => {
  return (
    <LoginTextContainer>
      <BigTitle text="돌아오신 것을 환영해요!" />
      <p>다시 만나다니 너무 반가워요!</p>
    </LoginTextContainer>
  );
};

const LoginTextContainer = styled.div`
  text-align: center;

  p {
    color: ${({ theme }) => theme.color["grey-3"]};
    font-size: ${({ theme }) => theme.fontSize["base"]};
  }
`;

export default LoginText;
