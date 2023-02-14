import useInput from "@hooks/common/useInput";
import useRegister from "@hooks/query/useRegister";
import useSendUserCode from "@hooks/query/useSendUserCode";
import { useRegisterStore } from "@store/useRegisterStore";
import styled from "styled-components";
import DefaultButton from "../atoms/Button/DefaultButton";
import LinkText from "../atoms/Text/LinkText";
import AuthForm from "../molecules/Form/AuthForm";
import AuthDesc from "../molecules/Text/AuthDesc";
import AuthHeader from "../molecules/Text/AuthHeader";

const RegisterStep2 = () => {
  const { email, name, password } = useRegisterStore();
  const [userCode, onChangeUserCode] = useInput();
  const { mutate: sendEmail } = useRegister();
  const { mutate: sendUserCode } = useSendUserCode();

  const resendEmail = () => {
    sendEmail({ email, name, password });
  };

  const verifyEmail = () => {
    sendUserCode(userCode.toString());
  };

  return (
    <>
      <AuthHeader text="코드 입력" />
      <AuthDesc text="이메일 확인: 방금 인증 코드를 보냈어요. 해당 코드를 입력하여 본인임을 인증하세요." />
      <AuthForm value={userCode} onChange={onChangeUserCode} text="인증 코드" />
      <LinkText
        text="코드를 받지 못했거나 코드가 만료되었나요? 다시 보내세요."
        onClick={resendEmail}
      />
      <Footer>
        <DefaultButton
          text="다음"
          onClick={verifyEmail}
          height={44}
          width={100}
        />
      </Footer>
    </>
  );
};

const Footer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: end;
`;

export default RegisterStep2;
