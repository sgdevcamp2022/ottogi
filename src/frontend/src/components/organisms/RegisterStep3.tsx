import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRegisterStore } from "../../store/useRegisterStore";
import DefaultButton from "../atoms/Button/DefaultButton";
import AuthHeader from "../molecules/Text/AuthHeader";

const RegisterStep3 = () => {
  const { resetStep } = useRegisterStore(({ resetStep }) => ({ resetStep }));
  const navigate = useNavigate();

  const goLogin = () => {
    resetStep();
    navigate("/login");
  };
  return (
    <>
      <TextContainer>
        <EmailImage src={"email.png"} alt="" width="120" height="120" />
        <AuthHeader text="이메일 인증 완료!" />
      </TextContainer>
      <DefaultButton text="로그인하기" onClick={goLogin} mb={12} height={44} />
    </>
  );
};

const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 1.875rem;
`;

const EmailImage = styled.img`
  margin-bottom: 1.25rem;
`;

export default RegisterStep3;
