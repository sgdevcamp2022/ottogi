import styled from "styled-components";
import { ColorType, FontSizeType } from "../../../styles/theme";

interface SpanProps {
  text: string;
  color?: ColorType;
  fontSize?: FontSizeType;
  mr?: number;
}

const SpanText = ({ text, color = "inherit", fontSize = "base", mr = 0 }: SpanProps) => {
  return (
    <SpanTextContainer color={color} fontSize={fontSize} mr={mr}>
      {text}
    </SpanTextContainer>
  );
};

interface SpanTextContainerProps {
  color: ColorType;
  fontSize: FontSizeType;
  mr: number;
}

const SpanTextContainer = styled.span<SpanTextContainerProps>`
  color: ${({ theme, color }) => theme.color[color]};
  font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize]};
  margin-right: ${({ mr }) => mr}px;
`;

export default SpanText;
