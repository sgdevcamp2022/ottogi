import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import styled from "styled-components";

const Crop = styled.div`
  width: 28.5px;
  height: 18px;
  overflow: hidden;
`;
const PersonIcon = styled(EmojiPeopleIcon)`
  font-size: 40px;
`;

export default () => (
  <Crop>
    <PersonIcon />
  </Crop>
);
