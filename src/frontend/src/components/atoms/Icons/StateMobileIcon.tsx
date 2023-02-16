import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import styled from "styled-components";

const StateMobileIcon = styled(PhoneIphoneIcon)``;
interface StateIconProps {
  fontSize: string;
  padding?: number;
}

export default ({ fontSize, padding = 1 }: StateIconProps) => <StateMobileIcon sx={{ fontSize, padding: `${padding}px`, borderRadius: 25 }} />;
