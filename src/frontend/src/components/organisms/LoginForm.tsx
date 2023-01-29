import { ChangeEvent } from "react";
import DefaultInput from "../atoms/Input/DefaultInput";
import Text from "../atoms/Text/Text";

interface LoginFormProps {
  text: string | React.ReactElement;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const LoginForm = ({ text, value, onChange }: LoginFormProps) => {
  return (
    <>
      <Text text={text} color="grey-3" fontWeight="bold" fontSize="xs" mb={8} />
      <DefaultInput value={value} onChange={onChange} />
    </>
  );
};

export default LoginForm;
