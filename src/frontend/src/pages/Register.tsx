import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultButton from "../components/atoms/Button/DefaultButton";
import LinkText from "../components/atoms/Text/LinkText";
import Text from "../components/atoms/Text/Text";
import DefaultModal from "../components/organisms/DefaultModal";
import LoginForm from "../components/organisms/LoginForm";
import useInput from "../hooks/common/useInput";

const Register = () => {
  const navigate = useNavigate();
  const [email, changeEmail] = useInput();
  const [username, changeUserName] = useInput();
  const [password, changePassword] = useInput();

  const onLoadLogin = () => navigate("/login");

  const onRegister = () => {
    if (!email || !username || !password) {
      return;
    }
  };

  return (
    <LoginContainer>
      <Helmet>
        <title>회원가입 | Discord</title>
      </Helmet>
      <DefaultModal width={480}>
        <>
          <TextContainer>
            <Text text="계정 만들기" color="white" fontSize="2xl" fontWeight="bold" mb={12} />
          </TextContainer>
          <LoginFormContainer>
            <LoginForm text="이메일" value={email} onChange={changeEmail} />
          </LoginFormContainer>
          <LoginFormContainer>
            <LoginForm text="사용자명" value={username} onChange={changeUserName} />
          </LoginFormContainer>
          <LoginFormContainer>
            <LoginForm text="비밀번호" value={password} onChange={changePassword} />
          </LoginFormContainer>
          <ButtonContainer>
            <DefaultButton text="계속하기" onClick={onRegister} />
          </ButtonContainer>
          <LinkText text="이미 계정이 있으신가요?" onClick={onLoadLogin} />
        </>
      </DefaultModal>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.primary};
`;
const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 1.25rem;
`;
const LoginFormContainer = styled.div`
  margin-bottom: 1.25rem;
`;
const ButtonContainer = styled.div`
  height: 44px;
  margin: 0 0 12px;
`;

export default Register;
