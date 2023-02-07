import styled from "styled-components";
import { flexCenter } from "../../styles/flexCenter";
import DefaultModal from "../atoms/Div/DefaultModal";

interface AuthModalProps {
  children: React.ReactElement;
  width: number;
}

const AuthModal = ({ children, width }: AuthModalProps) => {
  return (
    <Background>
      <DefaultModal width={width}>{children}</DefaultModal>
    </Background>
  );
};

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  ${flexCenter}
`;

export default AuthModal;
