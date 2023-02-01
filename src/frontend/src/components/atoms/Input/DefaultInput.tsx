import { ChangeEventHandler } from "react";
import styled from "styled-components";
import {
  BackgroundColorType,
  ColorType,
  FontSizeType,
} from "../../../styles/theme";

interface DefaultInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  color?: ColorType;
  fontSize?: FontSizeType;
  backgroundColor?: BackgroundColorType;
}

const DefaultInput = ({
  value,
  onChange,
  placeholder = "",
  fontSize = "base",
  color = "white",
  backgroundColor = "black-1",
}: DefaultInputProps) => {
  return (
    <DefaultInputContainer
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      color={color}
      fontSize={fontSize}
      backgroundColor={backgroundColor}
    />
  );
};

const DefaultInputContainer = styled.input<{
  color: ColorType;
  fontSize: FontSizeType;
  backgroundColor: BackgroundColorType;
}>`
  width: 100%;
  height: 100%;
  padding: 0.625rem;
  border: none;
  border-radius: 4px;
  color: ${({ theme, color }) => theme.color[color]};
  font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize]};
  background-color: ${({ theme, backgroundColor }) =>
    theme.backgroundColor[backgroundColor]};
  &:focus {
    outline: none;
  }
`;

export default DefaultInput;
