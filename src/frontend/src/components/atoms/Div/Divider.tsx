import { Divider } from "@mui/material";
import styled from "styled-components";

// divider 시간 용 만들어 두기

const DefaultDivider = () => {
  return <StyledDivider variant="inset" />;
};

const StyledDivider = styled(Divider)``;

export default DefaultDivider;
