import { Box } from "@mui/material";
import styled from "styled-components";

const DivBox = () => {
  return <StyledBox>hello</StyledBox>;
};

const StyledBox = styled(Box)`
  width: 100%;
  height: 100%;
  background-color: #202522;
  color: #fff;
  border: 1px #202522 solid;
  border-radius: 0.5rem;
  padding: 1rem;
  align-items: center;
  margin: 1rem;
`;

export default DivBox;
