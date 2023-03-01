import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import styled from "styled-components";

const Crop = styled.div`
  position: relative;
  width: 28.5px;
  height: 18px;
  overflow: hidden;
`;

const PersonIcon = () => (
  <Crop>
    <EmojiPeopleIcon style={{ fontSize: 40 }} />
  </Crop>
);

export default () => <PersonIcon />;
