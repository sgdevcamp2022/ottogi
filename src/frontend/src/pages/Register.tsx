import styled from "styled-components";
import AuthModal from "../components/organisms/AuthModal";
import HeaderHelmet from "../components/atoms/Helmet";
import { useRegisterStore } from "../store/useRegisterStore";
import ReigsterStep1 from "../components/organisms/RegisterStep1";
import ReigsterStep2 from "../components/organisms/RegisterStep2";
import ReigsterStep3 from "../components/organisms/RegisterStep3";
import { useEffect } from "react";

const Register = () => {
  const { step, resetStep } = useRegisterStore(({ step, resetStep }) => ({
    step,
    resetStep,
  }));

  useEffect(() => {
    resetStep();
  }, []);

  return (
    <LoginContainer>
      <HeaderHelmet title="회원가입 | Discord" />
      <AuthModal width={480}>
        <>
          {step === 1 && <ReigsterStep1 />}
          {step === 2 && <ReigsterStep2 />}
          {step === 3 && <ReigsterStep3 />}
        </>
      </AuthModal>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.primary};
`;

export default Register;
