import styled from "styled-components";
import SpanText from "../../atoms/Text/SpanText";

interface MessageUserDateProps {
  username: string;
  createdAt: Date;
}

const MessageUserDate = ({ username, createdAt }: MessageUserDateProps) => {
  return (
    <TextHeader>
      <SpanText text={username} color="white" mr={8} />
      <SpanText text="2023.01.26. 오후 9:52" color="msg-timestamp" fontSize="xs" />
    </TextHeader>
  );
};

const TextHeader = styled.div`
  margin-bottom: 0.5rem;
`;

export default MessageUserDate;
