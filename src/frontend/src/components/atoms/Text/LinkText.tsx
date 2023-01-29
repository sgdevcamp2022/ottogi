import { MouseEventHandler } from "react";
import styled from "styled-components";

interface LinkTextProps {
  text: string;
  onClick: MouseEventHandler<HTMLSpanElement>;
}

const LinkText = ({ text, onClick }: LinkTextProps) => {
  return <LinkTextBlock onClick={onClick}>{text}</LinkTextBlock>;
};

const LinkTextBlock = styled.span`
  color: ${({ theme }) => theme.color.blue};
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default LinkText;
