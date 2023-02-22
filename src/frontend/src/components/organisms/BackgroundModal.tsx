import { flexCenter } from "@styles/flexCenter";
import { ReactElement } from "react";
import styled from "styled-components";
import DefaultModal from "../atoms/Div/DefaultModal";

interface BackgroundModalProps {
  children: ReactElement;
  width: number;
  p: number;
  onClick: () => void;
}

const BackgroundModal = ({
  onClick,
  children,
  width,
  p,
}: BackgroundModalProps) => {
  return (
    <BackgroundWrapper onClick={onClick}>
      <DefaultModal width={width} p={p} onClick={(e) => e.stopPropagation()}>
        {children}
      </DefaultModal>
    </BackgroundWrapper>
  );
};

const BackgroundWrapper = styled.div`
  ${flexCenter}
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.8);
`;

export default BackgroundModal;
