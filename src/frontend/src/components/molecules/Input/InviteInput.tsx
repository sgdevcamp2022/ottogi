import { ChangeEventHandler, MouseEventHandler } from "react";
import styled from "styled-components";
import { BorderColorType } from "../../../styles/theme";
import { DefaultButtonContainer } from "../../atoms/Button/DefaultButton";

interface InviteInputType {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
  borderColor?: BorderColorType;
}

const InviteInput = ({ value, onChange, onClick, borderColor = "default" }: InviteInputType) => {
  return (
    <InviteInputContainer borderColor={borderColor}>
      <input maxLength={37} value={value} onChange={onChange} placeholder="사용자명#0000 입력" />
      <InviteButton disabled={value === ""} onClick={onClick} fontWeight="normal" color="white" backgroundColor="primary">
        친구 요청 보내기
      </InviteButton>
    </InviteInputContainer>
  );
};

const InviteInputContainer = styled.label<{ borderColor: BorderColorType }>`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  border-radius: 4px;
  margin: 16px 0;
  padding: 0 12px;
  border: 2px solid ${({ theme, borderColor }) => theme.borderColor[borderColor]};
  background-color: ${({ theme }) => theme.backgroundColor["black-1"]};
  transition: transform 1s ease-out;
  &:has(input:focus) {
    border-color: ${({ theme }) => theme.borderColor.focus};
  }

  input {
    line-height: 40px;
    flex: 1;
    border: none;
    background-color: ${({ theme }) => theme.backgroundColor["transparent"]};
    color: ${({ theme }) => theme.color.white};
    &:focus {
      outline: none;
    }
    ::placeholder {
      color: ${({ theme }) => theme.color.placeholder};
    }
  }
`;

const InviteButton = styled(DefaultButtonContainer)`
  font-size: 0.875rem;
  width: fit-content;
  height: 2rem;
  padding: 2px 16px;
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ theme, color }) => theme.color[color]};
  background-color: ${({ theme, backgroundColor }) => theme.backgroundColor[backgroundColor]};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "cursor")};
`;

export default InviteInput;
