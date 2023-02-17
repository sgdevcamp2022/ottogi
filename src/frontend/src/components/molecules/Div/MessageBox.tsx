import AddCircleIcon from "@components/atoms/Icons/AddCircleIcon";
import MessageInput from "@components/atoms/Input/MessageInput";
import { ChangeEvent, KeyboardEvent, MouseEventHandler, useRef } from "react";
import styled from "styled-components";

interface MessageInputProps {
  value: string;
  nickname: string;
  onChange: Function;
  onClick: MouseEventHandler<HTMLButtonElement>;
  addChatMessage: () => void;
}

const MessageBox = ({
  value,
  nickname,
  onChange,
  onClick,
  addChatMessage,
}: MessageInputProps) => {
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextAreaHeight = () => {
    if (messageRef.current instanceof HTMLTextAreaElement) {
      messageRef.current.style.height = "auto";
      messageRef.current.style.height = messageRef.current.scrollHeight + "px";
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === "Enter") {
      addChatMessage();
    }
    onChange(e.target.value);
    resizeTextAreaHeight();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    console.log(1, e.key);

    if (e.key === "Enter") {
      addChatMessage();
    }
    if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  return (
    <MessageInputContainer>
      <AddButton onClick={onClick}>
        <AddCircleIcon />
      </AddButton>
      <MessageInput
        ref={messageRef}
        placeholder={`@${nickname}에 메시지 보내기`}
        rows={1}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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
