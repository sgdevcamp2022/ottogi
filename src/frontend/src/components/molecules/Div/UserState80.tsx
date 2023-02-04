import styled from "styled-components";
import { StatusColorType } from "../../../styles/theme";
import StateDisturbIcon from "../../atoms/Icons/StateDisturbIcon";
import StateEmptyIcon from "../../atoms/Icons/StateEmptyIcon";
import StateMobileIcon from "../../atoms/Icons/StateMobileIcon";
import StateOffIcon from "../../atoms/Icons/StateOffIcon";
import StateOnIcon from "../../atoms/Icons/StateOnIcon";

export type StateType = "on" | "off" | "disturb" | "mobile" | "empty";

interface UserStateProps {
  status?: StateType;
  fontSize?: number;
}

const UserState80 = ({ status = "on", fontSize = 16 }: UserStateProps) => {
  return (
    <UserStateContainer>
      {/* <Mask>
        <LogoImage onClick={() => null} />
      </Mask>
      <IconWrapper status={status}>
        {status === "on" && <StateOnIcon fontSize={fontSize} />}
        {status === "off" && <StateOffIcon fontSize={fontSize} />}
        {status === "disturb" && <StateDisturbIcon fontSize={fontSize} />}
        {status === "mobile" && <StateMobileIcon fontSize={fontSize} />}
        {status === "empty" && <StateEmptyIcon fontSize={fontSize} />}
      </IconWrapper> */}
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

const IconWrapper = styled.div<{ status: StatusColorType }>`
  position: absolute;
  transform: translate(120%, -70%);
  border-radius: 25px;
  color: ${({ theme, status }) => theme.statusColor[status]};
`;

export default UserState80;
