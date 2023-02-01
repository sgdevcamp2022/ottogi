import styled from "styled-components";

type fontWeightType = "normal" | "bold";

interface TextProps {
  text: string | React.ReactElement;
  fontSize?: string;
  fontWeight?: fontWeightType;
  color?: string;
  mb?: number;
  mr?: number;
}

const Text = ({ text, fontSize = "base", fontWeight = "normal", color = "inherit", mb = 0, mr = 0 }: TextProps) => (
  <TextBlock fontSize={fontSize} fontWeight={fontWeight} color={color} mb={mb} mr={mr}>
    {text}
  </TextBlock>
);

const TextBlock = styled.p<{
  fontSize: string;
  fontWeight: fontWeightType;
  color: string;
  mb: number;
  mr: number;
}>`
  color: ${({ theme, color }) => theme.color[color]};
  font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize]};
  font-weight: ${({ fontWeight }) => fontWeight};
  margin-top: 0px;
  margin-left: 0px;
  margin-bottom: ${({ mb }) => mb}px;
  margin-right: ${({ mr }) => mr}px;
`;

export default Text;
