import LogoImage from "@components/atoms/Div/LogoImage";
import Status from "@components/atoms/Div/Status";
import styled from "styled-components";
import mask from "../../../assets/mask/avatar-mask-32.png";

interface UserStateProps {
  status: "0" | "1" | "2" | "3";
  fontSize?: string;
  src?: string;
}

const UserState32 = ({
  status,
  fontSize = "16px",
  src = "",
}: UserStateProps) => {
  return (
    <UserStateContainer>
      <Mask>
        <LogoImage height={2} width={2} onClick={() => null} src={src} />
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
  mask-image: url(${mask});
  mask-size: contain;
  mask-repeat: no-repeat;
`;

const IconWrapper = styled.div`
  position: absolute;
  transform: translate(120%, -70%);
  border-radius: 25px;
`;

export default UserState32;
