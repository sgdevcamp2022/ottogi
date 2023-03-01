import CheckIcon from "@mui/icons-material/Check";
import styled from "styled-components";

const IconWrapper = styled.div`
  &:hover {
    color: ${({ theme }) => theme.backgroundColor["add-friend"]};
  }
`;

export default () => (
  <IconWrapper>
    <CheckIcon />
  </IconWrapper>
);
