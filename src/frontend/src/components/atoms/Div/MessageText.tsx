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
      <Text text={text} color="msg" />
    </MessageTextContainer>
  );
};

const MessageTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MessageDate = styled.span`
  margin-left: -1rem;
  margin-right: 1rem;
  visibility: hidden;
`;

export default MessageText;
