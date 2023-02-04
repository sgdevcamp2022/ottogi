import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/auth";
import useInput from "../../hooks/common/useInput";
import { useRegisterStore } from "../../store/useRegisterStore";
import validateEmail from "../../utils/validateEmail";
import DefaultButton from "../atoms/Button/DefaultButton";
import LinkText from "../atoms/Text/LinkText";
import AuthForm from "../molecules/Form/AuthForm";
import AuthHeader from "../molecules/Text/AuthHeader";

const RegisterStep1 = () => {
  const { setStep, setEmail, setName, setPassword } = useRegisterStore();
  const navigate = useNavigate();
  const [email, changeEmail] = useInput();
  const [name, changeName] = useInput();
  const [password, changePassword] = useInput();

  const { data, isLoading, isError, isSuccess, mutate: sendEmail } = useMutation(authApi.register);

  const onLoadLogin = () => navigate("/login");

  const onRegister = () => {
    if (!email || !name || !password) {
      return;
    }
    if (!validateEmail(email)) {
      console.log("이메일 형식 다시 입력하셈");
    }
    setEmail(email);
    setName(name);
    setPassword(password);
    sendEmail({ email, name, password });
    setStep(2);
  };
  return (
    <>
      <AuthHeader text="계정 만들기" />
      <AuthForm text="이메일" value={email} onChange={changeEmail} />
      <AuthForm text="사용자명" value={name} onChange={changeName} />
      <AuthForm text="비밀번호" value={password} onChange={changePassword} />
      <DefaultButton text="계속하기" onClick={onRegister} height={44} mb={12} />
      <LinkText text="이미 계정이 있으신가요?" onClick={onLoadLogin} />
    </>
  );
};

export default RegisterStep1;
