import Text from "@components/atoms/Text/Text";

interface AuthHeaderProps {
  text: string;
}

const AuthHeader = ({ text }: AuthHeaderProps) => {
  return (
    <Text
      text={text}
      color="white"
      fontSize="xxl"
      fontWeight="bold"
      mb={20}
      center
    />
  );
};

export default AuthHeader;
