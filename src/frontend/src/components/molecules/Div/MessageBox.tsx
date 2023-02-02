import { MouseEventHandler, useRef } from "react";
import styled from "styled-components";
import AddCircleIcon from "../../atoms/Icons/AddCircleIcon";
import MessageInput from "../../atoms/Input/MessageInput";

interface MessageInputProps {
  value: string;
  nickname: string;
  onChange: Function;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const MessageBox = ({ value, nickname, onChange, onClick }: MessageInputProps) => {
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextAreaHeight = () => {
    if (messageRef.current instanceof HTMLTextAreaElement) {
      messageRef.current.style.height = "auto";
      messageRef.current.style.height = messageRef.current.scrollHeight + "px";
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
      <MessageInput
        messageRef={messageRef}
        placeholder={`@${nickname}에 메시지 보내기`}
        rows={1}
        value={value}
        onChange={({ target: { value } }) => handleChange(value)}
      />
    </MessageInputContainer>
  );
};

const MessageInputContainer = styled.label`
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.backgroundColor["msg-input"]};
  padding: 0 16px;
`;

const AddButton = styled.button`
  height: 2.75rem;
  padding: 10px 16px;
  margin-left: -16px;
  color: ${({ theme }) => theme.color.icon};
  background-color: transparent;
  &:hover {
    color: ${({ theme }) => theme.color.white};
  }
`;

export default MessageBox;
