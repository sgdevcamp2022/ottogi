import { MouseEventHandler, useRef } from "react";
import styled from "styled-components";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface MessageInputProps {
  value: string;
  nickname: string;
  onChange: Function;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const MessageInput = ({ value, nickname, onChange, onClick }: MessageInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextAreaHeight = () => {
    if (textareaRef.current instanceof HTMLTextAreaElement) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  const handleChange = (value: string) => {
    resizeTextAreaHeight();
    onChange(value);
  };
  return (
    <MessageInputContainer>
      <AddButton onClick={onClick}>
        <AddCircleIcon />
      </AddButton>
      <TextArea
        placeholder={`@${nickname}에 메시지 보내기`}
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={({ target: { value } }) => handleChange(value)}
      />
    </MessageInputContainer>
  );
};

const MessageInputContainer = styled.label`
  border-radius: 0.25rem;
  display: flex;
  background-color: ${({ theme }) => theme.backgroundColor["grey-2"]};
`;

const AddButton = styled.button`
  height: 1.5rem;
  padding: 0.625rem 1rem;
  font-size: ${({ theme }) => theme.fontSize.xl};
  background-color: ${({ theme }) => theme.backgroundColor["transparent"]};
  color: ${({ theme }) => theme.color["grey-3"]};
  border: none;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color["grey-4"]};
  }
`;

const TextArea = styled.textarea`
  vertical-align: middle;
  flex: 1;
  border: none;
  resize: none;
  color: ${({ theme }) => theme.color["white"]};
  overflow-y: hidden;
  background-color: ${({ theme }) => theme.backgroundColor["transparent"]};
  padding: 0.6875rem 14px 11px 0;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: ${({ theme }) => theme.color.placeholder};
  }
`;

export default MessageInput;
