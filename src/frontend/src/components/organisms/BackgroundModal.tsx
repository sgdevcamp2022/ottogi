import { flexCenter } from "@styles/flexCenter";
import { ReactElement } from "react";
import styled from "styled-components";
import DefaultModal from "../atoms/Div/DefaultModal";

interface BackgroundModalProps {
  children: ReactElement;
  width: number;
  p: number;
}

const BackgroundModal = ({ children, width, p }: BackgroundModalProps) => {
  return (
    <BackgroundWrapper>
      <DefaultModal width={width} p={p}>
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
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
`;

export default BackgroundModal;
