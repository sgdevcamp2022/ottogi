import DarkModeIcon from "@mui/icons-material/DarkMode";
import styled from "styled-components";

const StateEmptyIcon = styled(DarkModeIcon)`
  transform: scaleX(-1);
`;

export default () => <StateEmptyIcon />;
