import styled from "styled-components";
import { ColorType, FontSizeType } from "@styles/theme";

interface SpanProps {
  text: string;
  color?: ColorType;
  fontSize?: FontSizeType;
  fontWeight?: string;
  mr?: number;
}

const SpanText = ({
  text,
  color = "inherit",
  fontSize = "base",
  fontWeight = "normal",
  mr = 0,
}: SpanProps) => {
  return (
    <SpanTextContainer
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      mr={mr}
    >
      {text}
    </SpanTextContainer>
  );
};

const SpanTextContainer = styled.span<Omit<SpanProps, "text">>`
  color: ${({ theme, color }) => theme.color[color]};
  font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize]};
  font-weight: ${({ fontWeight }) => fontWeight};
  margin-right: ${({ mr }) => mr}px;
`;

export default SpanText;
