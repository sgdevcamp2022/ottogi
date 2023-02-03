import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultButton from "../components/atoms/Button/DefaultButton";
import LinkText from "../components/atoms/Text/LinkText";
import Text from "../components/atoms/Text/Text";
import DefaultModal from "../components/organisms/DefaultModal";
import useInput from "../hooks/common/useInput";
import HeaderHelmet from "../components/atoms/Helmet";
import AuthDesc from "../components/molecules/Text/AuthDesc";
import LoginForm from "../components/molecules/Form/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const [email, changeEmail] = useInput();
  const [password, changePassword] = useInput();

  const onLoadRegister = () => navigate("/register");

  const onLogin = () => {
    if (!email || !password) {
      return;
    }
  };

  return (
    <LoginContainer>
      <HeaderHelmet title="로그인 | Discord" />
      <DefaultModal width={480}>
        <>
          <Text text="돌아오신 것을 환영해요!" color="white" fontSize="xxl" fontWeight="bold" center mb={8} />
          <AuthDesc text=" 만나다니 너무 반가워요!" />
          <LoginForm text="이메일 또는 전화번호" value={email} onChange={changeEmail} />
          <LoginForm text="비밀번호" value={password} onChange={changePassword} />
          <LinkTextContainer>
            <LinkText text="비밀번호를 잊으셨나요?" onClick={() => {}} />
          </LinkTextContainer>
          <DefaultButton text="로그인" onClick={onLogin} height={44} mb={12} />
          <Text
            text={
              <>
                <>계정이 필요한가요? </>
                <LinkText text="가입하기" onClick={onLoadRegister} />
              </>
            }
            color="auth-desc"
            fontSize="sm"
          />
        </>
      </DefaultModal>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.primary};
`;

const LinkTextContainer = styled.div`
  margin: -1rem 0 1.25rem;
`;

export default Login;
