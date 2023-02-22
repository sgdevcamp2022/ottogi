import { ChangeEventHandler } from "react";
import styled from "styled-components";
import { BackgroundColorType, ColorType, FontSizeType } from "@styles/theme";

interface DefaultInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: string;
  maxLength?: number;
  width?: number | string;
  height?: number | string;
  placeholder?: string;
  color?: ColorType;
  placeholderColor?: ColorType;
  fontSize?: FontSizeType;
  backgroundColor?: BackgroundColorType;
}

const DefaultInput = ({
  value,
  onChange,
  type = "text",
  maxLength = 524288,
  width = "100%",
  height = "100%",
  placeholder = "",
  placeholderColor = "tab2-placeholder",
  fontSize = "sm",
  color = "white",
  backgroundColor = "tab1",
}: DefaultInputProps) => {
  return (
    <DefaultInputContainer
      value={value}
      onChange={onChange}
      type={type}
      maxLength={maxLength}
      width={width}
      height={height}
      placeholder={placeholder}
      placeholderColor={placeholderColor}
      fontSize={fontSize}
      color={color}
      backgroundColor={backgroundColor}
    />
  );
};

const DefaultInputContainer = styled.input<
  Pick<
    DefaultInputProps,
    | "width"
    | "height"
    | "placeholderColor"
    | "fontSize"
    | "color"
    | "backgroundColor"
  >
>`
  width: ${({ width }) => (width === "100%" ? "100%" : `${width}px`)};
  height: ${({ height }) => (height === "100%" ? "100%" : `${height}px`)};
  padding: 0.625rem;
  border: none;
  border-radius: 4px;
  color: ${({ theme, color }) => theme.color[color]};
  font-weight: 500;
  font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize]};
  background-color: ${({ theme, backgroundColor }) =>
    theme.backgroundColor[backgroundColor]};
  ::placeholder {
    color: ${({ theme, placeholderColor }) => theme.color[placeholderColor]};
  }
  &:focus {
    outline: none;
  }
`;

export default DefaultInput;
