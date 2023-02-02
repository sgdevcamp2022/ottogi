import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultButton from "../components/atoms/Button/DefaultButton";
import LinkText from "../components/atoms/Text/LinkText";
import Span from "../components/atoms/Text/SpanText";
import Text from "../components/atoms/Text/Text";
import LoginText from "../components/molecules/Text/LoginText";
import DefaultModal from "../components/organisms/DefaultModal";
import LoginForm from "../components/organisms/LoginForm";
import useInput from "../hooks/common/useInput";

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
      <Helmet>
        <title>로그인 | Discord</title>
      </Helmet>
      <DefaultModal width={480}>
        <>
          <LoginText />
          <LoginFormContainer>
            <LoginForm
              text={
                <>
                  이메일 또는 전화번호
                  <Span text=" *" />
                </>
              }
              value={email}
              onChange={changeEmail}
            />
          </LoginFormContainer>
          <LoginFormContainer>
            <LoginForm
              text={
                <>
                  비밀번호
                  <Span text=" *" />
                </>
              }
              value={password}
              onChange={changePassword}
            />
            <LinkTextContainer>
              <LinkText text="비밀번호를 잊으셨나요?" onClick={() => {}} />
            </LinkTextContainer>
          </LoginFormContainer>
          <ButtonContainer>
            <DefaultButton text="로그인" onClick={onLogin} />
          </ButtonContainer>
          <Text
            text={
              <>
                <>계정이 필요한가요? </>
                <LinkText text="가입하기" onClick={onLoadRegister} />
              </>
            }
            color="grey-3"
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
const LoginFormContainer = styled.div`
  margin-bottom: 1.25rem;
`;
const LinkTextContainer = styled.div`
  margin: 4px 0 20px;
  padding: 2px 0;
`;
const ButtonContainer = styled.div`
  height: 44px;
  margin: 0 0 12px;
`;

export default Login;
