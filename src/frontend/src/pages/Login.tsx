import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import LoginText from "../components/molecules/Text/LoginText";
import AuthModal from "../components/organisms/Modal/AuthModal";

const Login = () => {
  return (
    <LoginContainer>
      <Helmet>
        <title>로그인 | Discord</title>
      </Helmet>
      <AuthModal>
        <LoginText />
      </AuthModal>
    </LoginContainer>
  );
};

const LoginContainer = styled.div``;

export default Login;
