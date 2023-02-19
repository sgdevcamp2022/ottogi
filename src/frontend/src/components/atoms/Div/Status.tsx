import styled from "styled-components";
import StateDisturbIcon from "../Icons/StateDisturbIcon";
import StateEmptyIcon from "../Icons/StateEmptyIcon";
import StateMobileIcon from "../Icons/StateMobileIcon";
import StateOffIcon from "../Icons/StateOffIcon";
import StateOnIcon from "../Icons/StateOnIcon";

interface StatusProps {
  status: "0" | "1" | "2" | "3";
  fontSize: string;
}

const statusTable = {
  "0": "on",
  "1": "off",
  "2": "",
  "3": "",
};

const Status = ({ status, fontSize }: StatusProps) => {
  return (
    <StatusContainer status={statusTable[status]}>
      {status === "0" && <StateOffIcon fontSize={fontSize} />}
      {status === "1" && <StateOnIcon fontSize={fontSize} />}
      {/* {status === "disturb" && <StateDisturbIcon fontSize={fontSize} />}
      {status === "mobile" && <StateMobileIcon fontSize={fontSize} />}
      {status === "empty" && <StateEmptyIcon fontSize={fontSize} />} */}
    </StatusContainer>
  );
};

const StatusContainer = styled.div<{ status: string }>`
  color: ${({ theme, status }) => theme.statusColor[status]};
`;

export default Status;
