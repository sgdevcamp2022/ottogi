import { ChangeEventHandler } from "react";
import styled from "styled-components";
import { BackgroundColorType, ColorType, FontSizeType } from "../../../styles/theme";

interface DefaultInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  maxLength?: number;
  width?: number | null;
  height?: number | null;
  placeholder?: string;
  color?: ColorType;
  placeholderColor?: ColorType;
  fontSize?: FontSizeType;
  backgroundColor?: BackgroundColorType;
}

const DefaultInput = ({
  value,
  onChange,
  maxLength = 524288,
  width = null,
  height = null,
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

interface DefaultInputContainerProps {
  width: number | null;
  height: number | null;
  placeholderColor: ColorType;
  fontSize: FontSizeType;
  color: ColorType;
  backgroundColor: BackgroundColorType;
}

const DefaultInputContainer = styled.input<DefaultInputContainerProps>`
  width: ${({ width }) => (width === null ? "100%" : `${width}px`)};
  height: ${({ height }) => (height === null ? "100%" : `${height}px`)};
  padding: 0.625rem;
  border: none;
  border-radius: 4px;
  color: ${({ theme, color }) => theme.color[color]};
  font-weight: 500;
  font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize]};
  background-color: ${({ theme, backgroundColor }) => theme.backgroundColor[backgroundColor]};
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: ${({ theme, placeholderColor }) => theme.color[placeholderColor]};
  }
`;

export default DefaultInput;
