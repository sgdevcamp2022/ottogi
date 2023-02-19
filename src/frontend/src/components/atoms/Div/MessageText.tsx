import getFormatTime from "@utils/getFormatTime";
import { forwardRef } from "react";
import styled from "styled-components";
import { ColorType, FontSizeType } from "@styles/theme";

interface MessageTextProps {
  text: string;
  hasDate: boolean;
  createdAt: Date;
}

const MessageText = forwardRef<HTMLParagraphElement, MessageTextProps>(
  ({ text, hasDate, createdAt }, ref) => {
    return (
      <MessageTextContainer>
        {hasDate && (
          <MessageDate className="msg-date">
            <Text ref={ref} color="auth-label" fontSize="xs">
              {getFormatTime(createdAt)}
            </Text>
          </MessageDate>
        )}
        <TextContainer>
          <Text ref={ref} color="msg">
            {text}
          </Text>
        </TextContainer>
      </MessageTextContainer>
    );
  }
);

const MessageTextContainer = styled.div`
  p {
    word-break: break-all;
  }
  display: flex;
  align-items: center;
`;

const MessageDate = styled.span`
  position: absolute;
  margin-left: 12px;
  visibility: hidden;
`;
const TextContainer = styled.div`
  left: 0;
  padding: 2px 48px 2px 72px;
`;

interface TextProps {
  text: string | React.ReactElement;
  fontSize?: FontSizeType;
  color?: ColorType;
  mb?: number;
  mr?: number;
  center?: boolean;
}

const Text = styled.p<Omit<TextProps, "text">>`
  line-height: 1.5rem;
  color: ${({ theme, color }) => theme.color[color]};
  font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize]};
  margin-top: 0px;
  margin-left: 0px;
`;

export default MessageText;
