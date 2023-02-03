import styled from "styled-components";
import { ColorType, FontSizeType } from "../../../styles/theme";

type fontWeightType = "normal" | "bold";

interface TextProps {
  text: string | React.ReactElement;
  fontSize?: FontSizeType;
  fontWeight?: fontWeightType;
  color?: ColorType;
  mb?: number;
  mr?: number;
}

const Text = ({ text, fontSize = "base", fontWeight = "normal", color = "inherit", mb = 0, mr = 0 }: TextProps) => (
  <TextContainer fontSize={fontSize} fontWeight={fontWeight} color={color} mb={mb} mr={mr}>
    {text}
  </TextContainer>
);

interface TextContainerProps {
  fontSize: FontSizeType;
  fontWeight: fontWeightType;
  color: ColorType;
  mb: number;
  mr: number;
}

const TextContainer = styled.p<TextContainerProps>`
  color: ${({ theme, color }) => theme.color[color]};
  font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize]};
  font-weight: ${({ fontWeight }) => (fontWeight === "bold" ? 500 : fontWeight)};
  margin-top: 0px;
  margin-left: 0px;
  margin-bottom: ${({ mb }) => mb}px;
  margin-right: ${({ mr }) => mr}px;
`;

export default Text;
