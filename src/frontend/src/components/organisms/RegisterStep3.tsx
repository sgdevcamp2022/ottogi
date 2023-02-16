import { useRegisterStore } from "@store/useRegisterStore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultButton from "../atoms/Button/DefaultButton";
import AuthHeader from "../molecules/Text/AuthHeader";
import emailImage from "../../assets/images/email.png";

const RegisterStep3 = () => {
  const { resetStep, resetInputs } = useRegisterStore(
    ({ resetStep, resetInputs }) => ({ resetStep, resetInputs })
  );
  const navigate = useNavigate();

  const goLogin = () => {
    resetStep();
    navigate("/login");
    resetInputs();
  };
  return (
    <>
      <TextContainer>
        <EmailImage
          src={emailImage}
          alt="이메일 사진"
          width="120"
          height="120"
        />
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
