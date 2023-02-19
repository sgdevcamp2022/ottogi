import { MouseEventHandler } from "react";
import styled from "styled-components";
import { ColorType } from "@styles/theme";

interface LinkTextProps {
  text: string;
  onClick: MouseEventHandler<HTMLSpanElement>;
  color?: ColorType;
}

const LinkText = ({ text, onClick, color = "blue" }: LinkTextProps) => {
  return (
    <LinkTextContainer onClick={onClick} color={color}>
      {text}
    </LinkTextContainer>
  );
};

const LinkTextContainer = styled.span<{ color: ColorType }>`
  color: ${({ theme, color }) => theme.color[color]};
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default LinkText;
