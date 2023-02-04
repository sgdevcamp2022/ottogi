import AddCommentIcon from "@mui/icons-material/AddComment";
import styled from "styled-components";

const ChatAddIcon = styled(AddCommentIcon)`
  transform: scaleX(-1);
  color: ${({ theme }) => theme.color.icon};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.white};
  }
`;

export default () => <ChatAddIcon />;
