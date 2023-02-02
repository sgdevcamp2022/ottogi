import styled from "styled-components";
import { ColorType } from "../../../styles/theme";

interface SpanProps {
  text: string;
  color?: ColorType;
}

const SpanText = ({ text, color = "inherit" }: SpanProps) => {
  return <SpanTextContainer color={color}>{text}</SpanTextContainer>;
};

interface SpanTextContainerProps {
  color: ColorType;
}

const SpanTextContainer = styled.span<SpanTextContainerProps>`
  color: ${({ theme, color }) => theme.color[color]};
`;

export default SpanText;
