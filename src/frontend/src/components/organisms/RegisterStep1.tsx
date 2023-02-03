import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useInput from "../../hooks/common/useInput";
import { useRegisterStore } from "../../store/useRegisterStore";
import validateEmail from "../../utils/validateEmail";
import DefaultButton from "../atoms/Button/DefaultButton";
import LinkText from "../atoms/Text/LinkText";
import Text from "../atoms/Text/Text";
import AuthForm from "../molecules/Form/AuthForm";
import AuthHeader from "../molecules/Text/AuthHeader";

const ReigsterStep1 = () => {
  const { setStep, setEmail, setUsername, setPassword } = useRegisterStore();
  const navigate = useNavigate();
  const [email, changeEmail] = useInput();
  const [username, changeUserName] = useInput();
  const [password, changePassword] = useInput();

  const onLoadLogin = () => navigate("/login");

  const onRegister = () => {
    if (!email || !username || !password) {
      return;
    }
    if (!validateEmail(email)) {
      console.log("이메일 형식 다시 입력하셈");
    }
    setStep(2);
    setEmail(email);
    setUsername(username);
    setPassword(password);
  };
  return (
    <>
      <AuthHeader text="계정 만들기" />
      <AuthForm text="이메일" value={email} onChange={changeEmail} />
      <AuthForm text="사용자명" value={username} onChange={changeUserName} />
      <AuthForm text="비밀번호" value={password} onChange={changePassword} />
      <DefaultButton text="계속하기" onClick={onRegister} height={44} mb={12} />
      <LinkText text="이미 계정이 있으신가요?" onClick={onLoadLogin} />
    </>
  );
};

export default ReigsterStep1;
