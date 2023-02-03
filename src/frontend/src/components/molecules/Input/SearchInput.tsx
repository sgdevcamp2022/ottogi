import { ChangeEventHandler } from "react";
import styled from "styled-components";
import SearchIcon from "../../atoms/Icons/SearchIcon";
import DefaultInput from "../../atoms/Input/DefaultInput";

type SizeType = "s" | "m";
interface SearchInputProps {
  size: SizeType;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchInput = ({ size, value, onChange }: SearchInputProps) => {
  return (
    <SearchInputContainer size={size}>
      <DefaultInput value={value} onChange={onChange} placeholder="검색하기" fontSize={size === "s" ? "sm" : "base"} />
      <SearchIcon />
    </SearchInputContainer>
  );
};

const SearchInputContainer = styled.label<{ size: SizeType }>`
  border-radius: 4px;
  min-width: 9rem;
  width: 100%;
  height: ${({ size }) => (size === "s" ? 1.5 : 1.875)}rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2px;
  background-color: ${({ theme }) => theme.backgroundColor.tab1};
  svg {
    font-size: ${({ theme, size }) => theme.fontSize[size === "s" ? "lg" : "xxl"]};
    color: ${({ theme }) => theme.color.icon};
  }
`;

export default SearchInput;
