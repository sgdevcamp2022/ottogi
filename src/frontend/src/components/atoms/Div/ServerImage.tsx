import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import styled from "styled-components";
import { MouseEventHandler } from "react";

interface ServerImageProps {
  onMouseover: MouseEventHandler<HTMLButtonElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ServerImage = ({ onMouseover, onClick }: ServerImageProps) => {
  return (
    <ServerIconBox>
      <ClickedWrapper />
      <StyledIconButton onMouseOver={onMouseover} onClick={onClick}>
        {/* borderRadius로 이미지 동그란 정도 조절하기 */}
        <Avatar className="avatar"></Avatar>
      </StyledIconButton>
    </ServerIconBox>
  );
};

export default ServerImage;

const ServerIconBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0;
  &:hover {
    .avatar {
      border-radius: 0.8rem;
      transition: all 0.4s ease-in-out;
    }
    .ClickedWrapper {
      height: 30px;
      transition: all 0.4s ease-in-out;
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  /* &:hover {
    .avatar {
      border-radius: 0.8rem;
      transition: all 0.4s ease-in-out;
    }
  } */
  .avatar {
    width: 3rem;
    height: 3rem;
  }
  margin: 0px;
  padding: 0rem !important;
  border-radius: 5rem;
  width: 3rem;
  height: 3rem;
`;

const ClickedWrapper = styled.div`
  height: 10px;
  left: 0px;
  list-style-type: none;
  line-height: 16px;
  width: 8px;
  background-color: #000;
  border-radius: 0 1rem 1rem 0;
  justify-content: flex-start;
  vertical-align: baseline;
  user-select: none;
  margin-left: -0.25rem;
  margin-top: 0.125rem;
  opacity: 1;
  position: absolute;
`;
