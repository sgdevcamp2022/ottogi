import { Box } from "@mui/material";
import styled from "styled-components";

const DivBox = () => {
  return <StyledBox>hello</StyledBox>;
};

const StyledBox = styled(Box)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.backgroundColor["black"]};
  color: ${({ theme }) => theme.color["white"]};
  border: 1px ${({ theme }) => theme.backgroundColor["border"]} solid;
  border-radius: 0.5rem;
  padding: 1rem;
  align-items: center;
  margin: 1rem;
`;

export default DivBox;
