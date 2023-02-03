import { ChangeEvent } from "react";
import styled from "styled-components";
import DefaultInput from "../../atoms/Input/DefaultInput";
import Text from "../../atoms/Text/Text";

interface AuthFormProps {
  text: string | React.ReactElement;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const AuthForm = ({ text, value, onChange }: AuthFormProps) => {
  return (
    <AuthFormContainer>
      <Text text={text} color="auth-label" fontWeight="bold" fontSize="xs" mb={8} />
      <DefaultInput value={value} onChange={onChange} />
    </AuthFormContainer>
  );
};

const AuthFormContainer = styled.div`
  margin-bottom: 1.25rem;
`;

export default AuthForm;
