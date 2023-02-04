import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import styled from "styled-components";

const CancelIcon = styled(ClearRoundedIcon)`
  &:hover {
    color: ${({ theme }) => theme.backgroundColor["voice-hangup"]};
  }
`;

export default () => <CancelIcon />;
