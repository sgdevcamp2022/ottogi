import { ChangeEvent } from "react";
import SpanText from "../../atoms/Text/SpanText";
import AuthForm from "./AuthForm";

interface LoginFormProps {
  text: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
}

const LoginForm = ({
  text,
  value,
  onChange,
  type = "text",
}: LoginFormProps) => {
  return (
    <>
      <AuthForm
        text={
          <>
            {text}
            <SpanText text=" *" color="red" />
          </>
        }
        type={type}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default LoginForm;
