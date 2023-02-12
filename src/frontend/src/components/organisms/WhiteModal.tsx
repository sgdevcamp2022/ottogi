import styled from "styled-components";

interface ModalProps {
  children: React.ReactElement;
  width: number;
}

const WhiteModal = ({ children, width }: ModalProps) => {
  return (
    <Background>
      <ModalContainer width={width}>{children}</ModalContainer>
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

const ModalContainer = styled.div<ModalProps>`
  background-color: white;
  width: ${({ width }) => width}px;
  border-radius: 0.375rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default WhiteModal;
