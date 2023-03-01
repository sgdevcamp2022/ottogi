import SpanText from "@components/atoms/Text/SpanText";
import styled from "styled-components";

interface MessageUserDateProps {
  name: string;
  createdAt: string;
}

const MessageUserDate = ({ name, createdAt }: MessageUserDateProps) => {
  return (
    <TextHeader>
      <SpanText text={name} color="white" mr={8} fontWeight="bold" />
      <SpanText text={createdAt} color="msg-timestamp" fontSize="xs" />
    </TextHeader>
  );
};

const TextHeader = styled.div`
  margin-left: 4.5rem;
  margin-bottom: 0.5rem;
`;

export default MessageUserDate;
