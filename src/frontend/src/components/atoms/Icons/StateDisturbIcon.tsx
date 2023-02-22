import DoDisturbOnRoundedIcon from "@mui/icons-material/DoDisturbOnRounded";
import styled from "styled-components";

const StateDisturbIcon = styled(DoDisturbOnRoundedIcon)``;

interface StateIconProps {
  fontSize: string;
  padding?: number;
}

export default ({ fontSize, padding = 1 }: StateIconProps) => <StateDisturbIcon sx={{ fontSize, padding: `${padding}px`, borderRadius: 25 }} />;
