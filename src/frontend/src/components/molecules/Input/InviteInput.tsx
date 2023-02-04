import { ChangeEventHandler, MouseEventHandler } from "react";
import styled from "styled-components";
import { BorderColorType } from "../../../styles/theme";
import DefaultButton from "../../atoms/Button/DefaultButton";
import DefaultInput from "../../atoms/Input/DefaultInput";

export type InviteStatusType = "default" | "success" | "danger";

interface InviteInputType {
  status?: InviteStatusType;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
  borderColor?: BorderColorType;
}

const InviteInput = ({ status = "default", value, onChange, onClick }: InviteInputType) => {
  return (
    <InviteInputContainer status={status}>
      <DefaultInput maxLength={37} placeholder="사용자 이메일 입력" value={value} onChange={onChange} fontSize="base" />
      <DefaultButton disabled={value === "" ? true : false} text="친구 요청 보내기" onClick={onClick} height={32} width={130} fontSize="sm" />
    </InviteInputContainer>
  );
};

interface InviteInputContainerProps {
  status: BorderColorType;
}
const InviteInputContainer = styled.label<InviteInputContainerProps>`
  width: 100%;
  height: 3.125rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor.tab1};
  border-radius: 8px;
  border: 2px solid ${({ theme, status }) => theme.borderColor[status]};
  padding: 0 12px 0 2px;
  &:has(input:focus) {
    border-color: ${({ theme }) => theme.borderColor.focus};
  }
`;

export default InviteInput;
