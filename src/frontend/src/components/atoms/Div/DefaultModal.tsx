import styled from "styled-components";

interface DefaultModalProps {
  width: number;
  p?: number;
}

const DefaultModal = styled.div<DefaultModalProps>`
  background-color: ${({ theme }) => theme.backgroundColor.tab3};
  width: ${({ width }) => width}px;
  border-radius: 0.375rem;
  padding: ${({ p }) => p}px;
  display: flex;
  flex-direction: column;
`;

DefaultModal.defaultProps = {
  p: 32,
};

export default DefaultModal;
