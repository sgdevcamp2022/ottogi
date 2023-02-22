import CallIcon from "@mui/icons-material/Call";
import styled from "styled-components";

const MissedCallIcon = styled(CallIcon)`
  transform: rotate(-180deg);
`;

export default () => <MissedCallIcon />;
