import styled from "styled-components";

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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthModalContainer = styled.div<AuthModalProps>`
  background-color: ${({ theme }) => theme.backgroundColor["grey-2"]};
  width: ${({ width }) => width}px;
  border-radius: 0.375rem;
  padding: 2rem;
`;

export default AuthModal;
