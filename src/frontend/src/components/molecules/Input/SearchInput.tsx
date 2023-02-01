import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../atoms/Icons/SearchIcon';

interface SearchInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <SearchInputContainer>
      <input value={value} onChange={onChange} placeholder="검색하기" />
      <SearchIcon />
    </SearchInputContainer>
  );
};

const SearchInputContainer = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor['black-1']};
  color: ${({ theme }) => theme.color['grey-2']};
  border-radius: 0.25rem;
  font-size: 20px;
  padding-right: 10px;

  input {
    flex: 1;
    line-height: 1.875rem;
    border: none;
    margin: 0.0625rem;
    padding: 0 0.5rem;
    color: ${({ theme }) => theme.color['white']};
    background-color: ${({ theme }) => theme.backgroundColor['transparent']};
    &:focus {
      outline: none;
    }
    ::placeholder {
      color: ${({ theme }) => theme.color['grey-2']};
    }
  }
`;

export default SearchInput;
