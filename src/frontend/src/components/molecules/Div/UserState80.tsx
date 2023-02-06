import styled from "styled-components";
import LogoImage from "../../atoms/Div/LogoImage";
import Status from "../../atoms/Div/Status";

export type StateType = "on" | "off" | "disturb" | "mobile" | "empty";

interface UserStateProps {
  status?: StateType;
  fontSize?: string;
}

const UserState80 = ({ status = "on", fontSize = "24px" }: UserStateProps) => {
  return (
    <UserStateContainer>
      <Mask>
        {/* <LogoImage onClick={() => null} /> */}
        <div style={{ backgroundColor: "black", width: 80, height: 80 }} />
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
  width: 80px;
  height: 80px;
  mask-image: url("avatar-mask-80.png");
  mask-size: contain;
  mask-repeat: no-repeat;
`;

const IconWrapper = styled.div`
  position: absolute;
  transform: translate(230%, -90%);
  border-radius: 25px;
`;

export default UserState80;
