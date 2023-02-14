import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import styled from "styled-components";
import { MouseEventHandler } from "react";

interface ServerImageProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  id: Number;
}

const ServerImage = ({ onClick, id }: ServerImageProps) => {
  return (
    <ServerIconBox>
      <ClickedWrapper className="side" />
      <StyledIconButton onClick={onClick}>
        {/* borderRadius로 이미지 동그란 정도 조절하기 */}
        <Avatar className="avatar"></Avatar>
      </StyledIconButton>
    </ServerIconBox>
  );
};

export default ServerImage;

const ServerIconBox = styled.div`
  display: flex;
  /* width: 100%;
  height: 100%; */
  align-items: center;
  &:hover {
    .avatar {
      border-radius: 0.8rem;
      transition: all 0.4s ease-in-out;
    }
    .side {
      height: 25px;
      transition: height 0.4s ease-in-out;
    }
  }
`;

const StyledIconButton = styled(IconButton)`
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
  list-style-type: none;
  line-height: 16px;
  width: 6px;
  background-color: #fff;
  border-radius: 0 1rem 1rem 0;
  justify-content: flex-start;
  vertical-align: baseline;
  user-select: none;
  opacity: 1;
  margin-right: 0.5rem;
`;
