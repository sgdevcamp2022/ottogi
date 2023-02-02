import { ChangeEventHandler } from "react";
import styled from "styled-components";
import SearchIcon from "../../atoms/Icons/SearchIcon";
import DefaultInput from "../../atoms/Input/DefaultInput";

interface SearchInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <SearchInputContainer>
      <DefaultInput value={value} onChange={onChange} placeholder="검색하기" />
      <SearchIcon />
    </SearchInputContainer>
  );
};

const SearchInputContainer = styled.label`
  border-radius: 4px;
  min-width: 9rem;
  width: 100%;
  height: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2px;
  background-color: ${({ theme }) => theme.backgroundColor.tab1};
  svg {
    font-size: ${({ theme }) => theme.fontSize.lg};
    color: ${({ theme }) => theme.color.icon};
  }
`;

export default SearchInput;
