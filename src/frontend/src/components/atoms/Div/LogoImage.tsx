import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import styled from "styled-components";
import { MouseEventHandler } from "react";

interface LogoImageProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const LogoImage = ({ onClick }: LogoImageProps) => {
  return (
    // <IconButton sx={{ serverImageSx, m: 0, p: 0 }}>
    //   {/* borderRadius로 이미지 동그란 정도 조절하기 */}
    //   <Avatar sx={{}}>H</Avatar>
    // </IconButton>
    <StyledIconButton onClick={onClick}>
      {/* borderRadius로 이미지 동그란 정도 조절하기 */}
      <Avatar></Avatar>
    </StyledIconButton>
  );
};

const StyledIconButton = styled(IconButton)`
  &:hover {
    .Avatar {
      box-shadow: 1rem 1rem 1rem black;
    }
  }
  margin: 0rem;
  padding: 0rem !important;
`;

export default LogoImage;
