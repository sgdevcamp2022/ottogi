import styled from "styled-components";

interface DefaultModalProps {
  children: React.ReactElement;
  width: number;
  p?: number;
}

const DefaultModal = ({ children, width, p = 32 }: DefaultModalProps) => {
  return (
    <DefaultModalContainer width={width} p={p}>
      {children}
    </DefaultModalContainer>
  );
};

const DefaultModalContainer = styled.div<{ width: number; p: number }>`
  background-color: ${({ theme }) => theme.backgroundColor.tab3};
  width: ${({ width }) => width}px;
  border-radius: 0.375rem;
  padding: ${({ p }) => p}px;
  display: flex;
  flex-direction: column;
`;

export default DefaultModal;
