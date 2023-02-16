import SearchIcon from "@components/atoms/Icons/SearchIcon";
import DefaultInput from "@components/atoms/Input/DefaultInput";
import { ChangeEventHandler } from "react";
import styled from "styled-components";

type SizeType = "s" | "m";
interface SearchInputProps {
  size: SizeType;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const SearchInput = ({
  size,
  value,
  onChange,
  placeholder = "검색하기",
}: SearchInputProps) => {
  return (
    <SearchInputContainer size={size}>
      <DefaultInput
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        fontSize={size === "s" ? "sm" : "base"}
      />
      <SearchIcon />
    </SearchInputContainer>
  );
};

const SearchInputContainer = styled.label<{ size: SizeType }>`
  border-radius: 0.25rem;
  min-width: 144px;
  width: 100%;
  height: ${({ size }) => (size === "s" ? 1.5 : 2.125)}rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.125rem;
  background-color: ${({ theme }) => theme.backgroundColor.tab1};
  svg {
    font-size: ${({ theme, size }) =>
      theme.fontSize[size === "s" ? "lg" : "xxl"]};
    color: ${({ theme }) => theme.color.icon};
  }
`;

export default SearchInput;
