import styled from "styled-components";
import LogoImage from "../../atoms/Div/LogoImage";
import MessageText from "../../atoms/Div/MessageText";
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
    <MessageLogContainer>
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

const MessageLogContainer = styled.div`
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
  position: relative;
  margin-left: 16px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export default MessageLog;
