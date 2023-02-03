import styled from "styled-components";
import DefaultButton from "../components/atoms/Button/DefaultButton";
import HeaderHelmet from "../components/atoms/Helmet";
import Text from "../components/atoms/Text/Text";
import DefaultModal from "../components/organisms/DefaultModal";

const Verify = () => {
  return (
    <LoginContainer>
      <HeaderHelmet title="로그인 | Discord" />
      <DefaultModal width={480}>
        <>
          <TextContainer>
            <EmailImage src={"email.png"} alt="" width="120" height="120" />
            <Text text="Email Verified!" color="white" fontSize="xxl" fontWeight="bold" mb={12} />
          </TextContainer>
          <ButtonContainer>
            <DefaultButton text="Continue to Discord" onClick={() => {}} />
          </ButtonContainer>
        </>
      </DefaultModal>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.primary};
`;

const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 1.875rem;
`;

const EmailImage = styled.img`
  margin-bottom: 1.25rem;
`;

const ButtonContainer = styled.div`
  height: 44px;
  margin: 0 0 12px;
`;

export default Verify;
