import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import styled from "styled-components";
import { MouseEventHandler } from "react";

// const serverImageSx = {
//   "&:hover": {
//     margin: 10,
//   },
// };
interface ServerImageProps {
  onMouseover: MouseEventHandler<HTMLButtonElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ServerImage = ({ onMouseover, onClick }: ServerImageProps) => {
  return (
    <StyledIconButton
      onMouseOver={onMouseover}
      onClick={onClick}
      // sx={{ serverImageSx, m: 0, p: 0, borderRadius: 1, boxShadow: "none" }}
      // onMouseOver={(e)=>}
    >
      {/* borderRadius로 이미지 동그란 정도 조절하기 */}
      <Avatar className="avatar"></Avatar>
    </StyledIconButton>
  );
};

const StyledIconButton = styled(IconButton)`
  &:hover {
    .avatar {
      border-radius: 0.8rem;
      transition: all 0.4s ease-in-out;
    }
  }
  margin: 0px;
  padding: 0rem !important;
  border-radius: 5rem;
`;

const StyledAvatar = styled(Avatar)`
  &:hover {
    border-radius: 1.5rem;
  }
`;
export default ServerImage;
