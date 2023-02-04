import { ChangeEvent } from "react";
import SpanText from "../../atoms/Text/SpanText";
import AuthForm from "./AuthForm";

interface LoginFormProps {
  text: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const LoginForm = ({ text, value, onChange }: LoginFormProps) => {
  return (
    <>
      <AuthForm
        text={
          <>
            {text}
            {/* 이메일 또는 전화번호 */}
            <SpanText text=" *" color="red" />
          </>
        }
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default LoginForm;
