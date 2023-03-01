import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import styled from "styled-components";

const WelcomeIcon = styled(ArrowForwardRoundedIcon)`
  color: ${({ theme }) => theme.color["invite-success"]};
  width: 1rem;
  height: 1rem;
`;

export default () => <WelcomeIcon />;
