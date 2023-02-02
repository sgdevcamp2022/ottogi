import { ChangeEventHandler, ForwardedRef, forwardRef } from "react";
import styled from "styled-components";

interface MessageInputProps {
  messageRef: ForwardedRef<HTMLTextAreaElement>;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  rows?: number;
}

const MessageInput = forwardRef(({ messageRef, value, onChange, placeholder = "", rows = 1 }: MessageInputProps) => {
  return <TextArea ref={messageRef} value={value} onChange={onChange} placeholder={placeholder} rows={rows} />;
});

const TextArea = styled.textarea`
  vertical-align: middle;
  flex: 1;
  border: none;
  resize: none;
  outline: none;
  overflow-y: hidden;
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.base};
  background-color: ${({ theme }) => theme.backgroundColor.trans};
  padding: 0.6875rem 0.875rem 0.6875rem 0;
  ::placeholder {
    color: ${({ theme }) => theme.color["msg-placeholder"]};
  }
`;

export default MessageInput;
