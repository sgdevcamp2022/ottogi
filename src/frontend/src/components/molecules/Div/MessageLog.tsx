import LogoImage from "@components/atoms/Div/LogoImage";
import MessageText from "@components/atoms/Div/MessageText";
import styled from "styled-components";
import MessageHoverButtons from "../Button/MessageHoverButtons";
import MessageUserDate from "./MessageUserDate";

interface MessageLogProps {
  hasImage?: boolean;
  imageUrl?: string;
  name?: string;
  createdAt: Date;
  text: string;
}

const MessageLog = ({ text, hasImage = false, createdAt }: MessageLogProps) => {
  return (
    <MessageLogContainer hasImage={hasImage}>
      <MessageHoverButtons />
      {hasImage && (
        <LogoImageContainer>
          <LogoImage onClick={() => null} />
        </LogoImageContainer>
      )}
      <TextContainer>
        {hasImage && <MessageUserDate name="nno3onn" createdAt={new Date()} />}
        <MessageText text={text} hasDate={!hasImage} />
      </TextContainer>
    </MessageLogContainer>
  );
};

const MessageLogContainer = styled.div<{ hasImage: boolean }>`
  margin-top: ${({ hasImage }) => (hasImage ? 12 : 0)}px;
  position: relative;
  min-height: 1.375rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor["msg-hover"]};
    .msg-hover,
    .msg-date {
      visibility: visible;
    }
  }
`;

const LogoImageContainer = styled.div`
  margin-left: 16px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export default MessageLog;
