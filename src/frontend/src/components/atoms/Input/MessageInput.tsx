import { keyboardOptions } from "@testing-library/user-event/dist/keyboard";
import {
  ChangeEventHandler,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
} from "react";
import styled from "styled-components";

interface MessageInputProps {
  // messageRef: ForwardedRef<HTMLTextAreaElement>;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

const MessageInput = forwardRef(
  (
    {
      value,
      onChange,
      placeholder = "",
      rows = 1,
      onKeyDown,
    }: MessageInputProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <TextArea
        ref={ref}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        rows={rows}
      />
    );
  }
);

const TextArea = styled.textarea`
  line-height: 22px;
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
