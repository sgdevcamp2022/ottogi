import DarkModeIcon from "@mui/icons-material/DarkMode";
import styled from "styled-components";

const StateEmptyIcon = styled(DarkModeIcon)`
  transform: scaleX(-1);
`;

interface StateIconProps {
  fontSize: string;
  padding?: number;
}

export default ({ fontSize, padding = 1 }: StateIconProps) => <StateEmptyIcon sx={{ fontSize, padding: `${padding}px`, borderRadius: 25 }} />;
