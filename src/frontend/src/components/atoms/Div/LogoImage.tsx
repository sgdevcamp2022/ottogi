import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import styled from "styled-components";
import { MouseEventHandler, ReactElement } from "react";

interface LogoImageProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  width: Number;
  height: Number;
  src?: String;
  child?: ReactElement;
}

const LogoImage = ({ onClick, height, width, src, child }: LogoImageProps) => {
  return (
    // <IconButton sx={{ serverImageSx, m: 0, p: 0 }}>
    //   {/* borderRadius로 이미지 동그란 정도 조절하기 */}
    //   <Avatar sx={{}}>H</Avatar>
    // </IconButton>
    <StyledIconButton width={width} height={height} onClick={onClick}>
      {/* borderRadius로 이미지 동그란 정도 조절하기 */}
      <Avatar className="avatar">{child}</Avatar>
    </StyledIconButton>
  );
};

interface ButtonProps {
  width: Number;
  height: Number;
}

const StyledIconButton = styled(IconButton)<ButtonProps>`
  &:hover {
    .avatar {
      box-shadow: 1rem 1rem 1rem black;
    }
  }
  .avatar {
    width: 100%;
    height: 100%;
  }
  margin: 0px;
  padding: 0rem !important;
  width: ${({ width }) => width + "rem"};
  height: ${({ height }) => height + "rem"}; ;
`;

export default LogoImage;
