import { ReactElement } from "react";
import styled from "styled-components";

interface DarkModalProps {
  children: ReactElement;
  width: number;
  top?: number | null;
  right?: number | null;
  left?: number | null;
  bottom?: number | null;
}

const DarkModal = ({
  children,
  width,
  top = null,
  right = null,
  left = null,
  bottom = null,
}: DarkModalProps) => {
  return (
    <DarkModalConainer
      width={width}
      top={top}
      right={right}
      left={left}
      bottom={bottom}
    >
      {children}
    </DarkModalConainer>
  );
};

const DarkModalConainer = styled.div<{
  width: number;
  top: number | null;
  right: number | null;
  left: number | null;
  bottom: number | null;
}>`
  position: absolute;
  border-radius: 4px;
  z-index: 9;
  padding: 8px;
  width: ${({ width }) => width}px;
  background-color: ${({ theme }) => theme.backgroundColor["voice-modal"]};
  ${({ top }) => top && `top: ${top}px`};
  ${({ right }) => right && `right: ${right}px`};
  ${({ left }) => left && `left: ${left}px`};
  ${({ bottom }) => bottom && `bottom: ${bottom}px`};
`;

export default DarkModal;
