import TripOriginIcon from "@mui/icons-material/TripOrigin";
import styled from "styled-components";

const StateOffIcon = styled(TripOriginIcon)``;

interface StateIconProps {
  fontSize: string;
  padding?: number;
}

export default ({ fontSize, padding = 1 }: StateIconProps) => <StateOffIcon sx={{ fontSize, padding: `${padding}px`, borderRadius: 25 }} />;
