import getFormatTime from "@utils/getFormatTime";
import { forwardRef, useMemo } from "react";
import styled from "styled-components";
import { ColorType, FontSizeType } from "@styles/theme";
import LinkText from "../Text/LinkText";
import useEnterInvitation from "@hooks/query/useEnterInvitation";

interface MessageTextProps {
  text: string;
  hasDate: boolean;
  createdAt: Date;
}

const MessageText = forwardRef<HTMLParagraphElement, MessageTextProps>(
  ({ text, hasDate, createdAt }, ref) => {
    const { mutate: enterInvitation } = useEnterInvitation();
    const hasLink = useMemo(() => {
      return /(https?:\/\/[^\s]+)/g.test(text);
    }, [text]);
    const words = text.split(" ");
    const link = words[0];
    words.splice(0, 1);
    const chat2 = words.join(" ");

    const clickInvitation = () => {
      enterInvitation();
      window.location.replace(link);
    };

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
          {hasLink ? (
            <>
              <LinkText text={link} onClick={clickInvitation} />

              <Text ref={ref} color="msg">
                {chat2}
              </Text>
            </>
          ) : (
            <Text ref={ref} color="msg">
              {text}
            </Text>
          )}
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
