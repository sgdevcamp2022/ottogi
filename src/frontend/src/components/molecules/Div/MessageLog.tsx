import styled from "styled-components";
import LogoImage from "../../atoms/Div/LogoImage";
import MessageText from "../../atoms/Div/MessageText";
import MessageHoverButtons from "../Button/MessageHoverButtons";
import MessageUserDate from "./MessageUserDate";

interface MessageLogProps {
  hasImage?: boolean;
  imageUrl?: string;
  username?: string;
  createdAt: Date;
  text: string;
}

const MessageLog = ({ text, hasImage = true, createdAt }: MessageLogProps) => {
  return (
    <MessageLogContainer>
      <MessageHoverButtons />
      {hasImage && (
        <LogoImageContainer>
          <LogoImage onClick={() => null} />
        </LogoImageContainer>
      )}
      <TextContainer>
        {hasImage && <MessageUserDate username="nno3onn" createdAt={new Date()} />}
        <MessageText text={text} hasDate={!hasImage} />
      </TextContainer>
    </MessageLogContainer>
  );
};

const MessageLogContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 2px 48px 2px 72px;
  display: flex;
  flex-direction: row;
  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor["msg-hover"]};
    .msg-hover,
    .msg-date {
      visibility: visible;
    }
  }
`;

const LogoImageContainer = styled.div`
  margin-left: -16px;
  margin-right: 16px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MessageLog;
