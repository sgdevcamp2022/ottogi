import { ChangeEventHandler } from "react";
import styled from "styled-components";
import SearchInput from "../Input/SearchInput";

interface SearchInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const BigSearchInputBox = ({ value, onChange }: SearchInputProps) => {
  return (
    <InputContainer>
      <SearchInput size="m" value={value} onChange={onChange} />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 8px;
`;

export default BigSearchInputBox;
