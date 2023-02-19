import Text from "@components/atoms/Text/Text";

interface AuthDescProps {
  text: string;
}

const AuthDesc = ({ text }: AuthDescProps) => {
  return <Text text={text} color="auth-desc" mb={20} center />;
};

export default AuthDesc;
