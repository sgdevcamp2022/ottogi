import LogoImage from "@components/atoms/Div/LogoImage";
import Status from "@components/atoms/Div/Status";
import styled from "styled-components";

export type StateType = "on" | "off" | "disturb" | "mobile" | "empty";

interface UserStateProps {
  status?: StateType;
  fontSize?: string;
}

const UserState32 = ({ status = "on", fontSize = "16px" }: UserStateProps) => {
  return (
    <UserStateContainer>
      <Mask>
        <LogoImage onClick={() => null} />
      </Mask>
      <IconWrapper>
        <Status status={status} fontSize={fontSize} />
      </IconWrapper>
    </UserStateContainer>
  );
};

const UserStateContainer = styled.div`
  position: relative;
`;

const Mask = styled.div`
  width: 32px;
  height: 32px;
  mask-image: url("avatar-mask-32.png");
  mask-size: contain;
  mask-repeat: no-repeat;
`;

const IconWrapper = styled.div`
  position: absolute;
  transform: translate(120%, -70%);
  border-radius: 25px;
`;

export default UserState32;
