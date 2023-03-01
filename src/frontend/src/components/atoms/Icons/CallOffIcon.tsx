import styled from "styled-components";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";

const CallOffIcon = styled(PhoneDisabledIcon)`
  transform: scaleX(-1);
`;

export default () => <CallOffIcon />;
