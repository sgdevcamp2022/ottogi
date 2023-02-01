// import { Children } from "react";
import { Tooltip } from "@mui/material";
import { ReactElement } from "react";
import styled from "styled-components";

interface TipProps {
  children: ReactElement;
  title: String;
  place?:
    | "bottom"
    | "left"
    | "right"
    | "top"
    | "bottom-end"
    | "bottom-start"
    | "left-end"
    | "left-start"
    | "right-end"
    | "right-start"
    | "top-end"
    | "top-start"
    | undefined;
}

// 화살표 추가, 위치 추가

const Tip = ({ children, title, place }: TipProps) => {
  return (
    <StyledTip
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: "#000",
          },
        },
        arrow: {
          sx: {
            color: "#000",
          },
        },
      }}
      arrow
      title={title}
      placement={place}
    >
      {children}
    </StyledTip>
  );
};

// 이거 왜 안되지;;
export const StyledTip = styled(Tooltip)``;

export default Tip;
