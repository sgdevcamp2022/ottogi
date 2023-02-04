import styled from "styled-components";
import { StateType } from "../../molecules/Div/UserState32";
import StateDisturbIcon from "../Icons/StateDisturbIcon";
import StateEmptyIcon from "../Icons/StateEmptyIcon";
import StateMobileIcon from "../Icons/StateMobileIcon";
import StateOffIcon from "../Icons/StateOffIcon";
import StateOnIcon from "../Icons/StateOnIcon";

interface StatusProps {
  status: StateType;
  fontSize: string;
}

const Status = ({ status, fontSize }: StatusProps) => {
  return (
    <StatusContainer status={status}>
      {status === "on" && <StateOnIcon fontSize={fontSize} />}
      {status === "off" && <StateOffIcon fontSize={fontSize} />}
      {status === "disturb" && <StateDisturbIcon fontSize={fontSize} />}
      {status === "mobile" && <StateMobileIcon fontSize={fontSize} />}
      {status === "empty" && <StateEmptyIcon fontSize={fontSize} />}
    </StatusContainer>
  );
};

const StatusContainer = styled.div<{ status: StateType }>`
  color: ${({ theme, status }) => theme.statusColor[status]};
`;

export default Status;
