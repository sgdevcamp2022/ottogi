import LogoImage from "@components/atoms/Div/LogoImage";
import Status from "@components/atoms/Div/Status";
import styled from "styled-components";
import mask from "../../../assets/mask/avatar-mask-80.png";

export type StateType = "on" | "off" | "disturb" | "mobile" | "empty";

interface UserStateProps {
  status?: StateType;
  fontSize?: string;
  src?: string;
}

const UserState80 = ({
  src,
  status = "on",
  fontSize = "24px",
}: UserStateProps) => {
  return (
    <UserStateContainer>
      <Mask>
        <div style={{ backgroundColor: "black", width: 80, height: 80 }}>
          <LogoImage width={5} height={5} onClick={() => null} />
        </div>
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
  mask-image: url(${mask});
  mask-size: contain;
  mask-repeat: no-repeat;
`;

const IconWrapper = styled.div`
  position: absolute;
  transform: translate(230%, -90%);
  border-radius: 25px;
`;

export default UserState80;
