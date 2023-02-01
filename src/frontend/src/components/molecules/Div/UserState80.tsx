import styled from "styled-components";
import StateDisturbIcon from "../../atoms/Icons/StateDisturbIcon";
import StateEmptyIcon from "../../atoms/Icons/StateEmptyIcon";
import StateMobileIcon from "../../atoms/Icons/StateMobileIcon";
import StateOffIcon from "../../atoms/Icons/StateOffIcon";
import StateOnIcon from "../../atoms/Icons/StateOnIcon";

export type StateType = "on" | "off" | "disturb" | "mobile" | "empty";

interface UserStateProps {
  state?: StateType;
  fontSize?: number;
}

const stateColor = {
  on: "green-2",
  off: "grey-5",
  disturb: "red",
  mobile: "green-2",
  empty: "orange",
};

const UserState80 = ({ state = "on", fontSize = 13 }: UserStateProps) => {
  return (
    <UserStateContainer>
      <Mask>
        <TemporaryImage src={"email.png"} width="32" height="32" />
      </Mask>
      {/* <IconWrapper color={stateColor[state]}>
        {state === "on" && <StateOnIcon fontSize={fontSize} />}
        {state === "off" && <StateOffIcon fontSize={fontSize} />}
        {state === "disturb" && <StateDisturbIcon fontSize={fontSize} />}
        {state === "mobile" && <StateMobileIcon fontSize={fontSize} />}
        {state === "empty" && <StateEmptyIcon fontSize={fontSize} />}
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
  mask-image: url("avatar-mask-80.png");
  mask-size: contain;
  mask-repeat: no-repeat;
`;
const TemporaryImage = styled.img`
  border-radius: 25px;
`;
// const IconWrapper = styled.div<{ color: string }>`
//   position: absolute;
//   transform: translate(125%, -65%);
//   border-radius: 25px;
//   color: ${({ theme, color }) => theme.backgroundColor[color]};
// `;

export default UserState80;
