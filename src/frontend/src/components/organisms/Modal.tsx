import React, { PropsWithChildren } from "react";
import styled from "styled-components";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  return (
    <ModalContainer>
      <DialogBox>{children}</DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: 440px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const DialogBox = styled.dialog`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: none;
  border-radius: 3px;
  /* box-shadow: 0 0 30px rgba(30, 30, 30, 0.185); */
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.backgroundColor["tab3"]};
  z-index: 10000;
  top: 0;
  left: 0;
  padding: 0.2rem 0 0 0;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
`;

export default Modal;
