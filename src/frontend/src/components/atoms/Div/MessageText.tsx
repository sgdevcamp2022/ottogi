import styled from "styled-components";
import Text from "../Text/Text";

interface MessageTextProps {
  text: string;
  hasDate: boolean;
}

const MessageText = ({ text, hasDate }: MessageTextProps) => {
  return (
    <MessageTextContainer>
      {hasDate && (
        <MessageDate className="msg-date">
          <Text text="오후 9:52" color="auth-label" fontSize="xs" />
        </MessageDate>
      )}
      <TextContainer>
        <Text text={text} color="msg" />
      </TextContainer>
    </MessageTextContainer>
  );
};

const MessageTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MessageDate = styled.span`
  margin-left: 12px;
  visibility: hidden;
`;
const TextContainer = styled.div`
  position: absolute;
  left: 0;
  padding: 2px 48px 2px 72px;
`;

export default MessageText;
