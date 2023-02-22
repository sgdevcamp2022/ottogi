import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import styled from "styled-components";
import { MouseEventHandler, ReactElement } from "react";

interface LogoImageProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  width: Number;
  height: Number;
  src?: string;
  child?: ReactElement;
}

const LogoImage = ({
  onClick,
  height,
  width,
  src = "",
  child,
}: LogoImageProps) => {
  return (
    <StyledIconButton width={width} height={height} onClick={onClick}>
      <Avatar src={src} className="avatar">
        {child}
      </Avatar>
    </StyledIconButton>
  );
};

interface ButtonProps {
  width: Number;
  height: Number;
}

const StyledIconButton = styled(IconButton)<ButtonProps>`
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
