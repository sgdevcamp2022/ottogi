import CircleIcon from "@mui/icons-material/Circle";
import styled from "styled-components";

const StateOnIcon = styled(CircleIcon)``;

interface StateIconProps {
  fontSize: string;
  padding?: number;
}

export default ({ fontSize, padding = 1 }: StateIconProps) => <StateOnIcon sx={{ fontSize, padding: `${padding}px`, borderRadius: 25 }} />;
