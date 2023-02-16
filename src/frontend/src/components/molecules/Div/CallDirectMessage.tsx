import CallIcon from "@components/atoms/Icons/CallIcon";
import MissedCallIcon from "@components/atoms/Icons/MissedCallIcon";
import LinkText from "@components/atoms/Text/LinkText";
import Text from "@components/atoms/Text/Text";
import styled from "styled-components";

type CallDirectMessageType = "missed" | "called";
interface CallDirectMessageProps {
  name: string;
  minute: number;
  type: CallDirectMessageType;
  createdAt: Date;
}

const CallDirectMessage = ({
  name,
  minute,
  type,
  createdAt,
}: CallDirectMessageProps) => {
  let text: string;
  if (type === "missed") {
    text = `님으로부터 ${minute}분 길이의 부재중 전화가 와 있어요.`;
  } else {
    text = `님이 ${
      minute < 1 ? "몇 초" : `${minute}분`
    } 길이의 통화를 시작했어요.`;
  }
  return (
    <CallDirectMessageContainer>
      <CallImageContainer type={type}>
        {type === "missed" ? <MissedCallIcon /> : <CallIcon />}
      </CallImageContainer>
      <TextContainer>
        <LinkText text={name} color="white" onClick={() => null} />
        <Text text={text} color="auth-desc" fontSize="sm" />
        <Text text="2023.02.05.오후 4:20" color="auth-desc" fontSize="xs" />
      </TextContainer>
    </CallDirectMessageContainer>
  );
};

const CallDirectMessageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  svg {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const CallImageContainer = styled.div<{ type: CallDirectMessageType }>`
  margin-left: 28px;
  color: ${({ theme, type }) =>
    theme.statusColor[type === "missed" ? "off" : "on"]};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  position: absolute;
  left: 0;
  padding: 2px 48px 2px 72px;
`;

export default CallDirectMessage;
