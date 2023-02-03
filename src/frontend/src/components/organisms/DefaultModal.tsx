import styled from "styled-components";
import { flexCenter } from "../../styles/flexCenter";

interface AuthModalProps {
  children: React.ReactElement;
  width: number;
}

const AuthModal = ({ children, width }: AuthModalProps) => {
  return (
    <Background>
      <AuthModalContainer width={width}>{children}</AuthModalContainer>
    </Background>
  );
};

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  ${flexCenter}
`;

const AuthModalContainer = styled.div<AuthModalProps>`
  background-color: ${({ theme }) => theme.backgroundColor.modal};
  width: ${({ width }) => width}px;
  border-radius: 0.375rem;
  padding: 2rem;
`;

export default AuthModal;
