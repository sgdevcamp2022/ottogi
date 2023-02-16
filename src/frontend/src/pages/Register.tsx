import styled from "styled-components";
import AuthModal from "../components/organisms/AuthModal";
import HeaderHelmet from "../components/atoms/Helmet";
import { useRegisterStore } from "../store/useRegisterStore";
import RegisterStep1 from "../components/organisms/RegisterStep1";
import RegisterStep2 from "../components/organisms/RegisterStep2";
import RegisterStep3 from "../components/organisms/RegisterStep3";
import { useEffect } from "react";

const Register = () => {
  const { step, resetStep } = useRegisterStore(({ step, resetStep }) => ({
    step,
    resetStep,
  }));

  useEffect(() => {
    resetStep();
  }, []);

  const getRegisterComponent = [RegisterStep1, RegisterStep2, RegisterStep3];
  const Component = getRegisterComponent[step - 1];

  return (
    <LoginContainer>
      <HeaderHelmet title="회원가입 | Discord" />
      <AuthModal width={480}>
        <Component />
      </AuthModal>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.primary};
`;

export default Register;
