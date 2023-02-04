import styled from "styled-components";
import DefaultModal from "../components/organisms/DefaultModal";
import HeaderHelmet from "../components/atoms/Helmet";
import { useRegisterStore } from "../store/useRegisterStore";
import ReigsterStep1 from "../components/organisms/RegisterStep1";
import ReigsterStep2 from "../components/organisms/RegisterStep2";
import ReigsterStep3 from "../components/organisms/RegisterStep3";

const Register = () => {
  const { step } = useRegisterStore(({ step }) => ({ step }));
  return (
    <LoginContainer>
      <HeaderHelmet title="회원가입 | Discord" />
      <DefaultModal width={480}>
        <>
          {step === 1 && <ReigsterStep1 />}
          {step === 2 && <ReigsterStep2 />}
          {step === 3 && <ReigsterStep3 />}
        </>
      </DefaultModal>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.primary};
`;

export default Register;
