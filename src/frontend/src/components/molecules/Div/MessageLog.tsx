import styled from "styled-components";
import LogoImage from "../../atoms/Div/LogoImage";
import SpanText from "../../atoms/Text/SpanText";
import Text from "../../atoms/Text/Text";

const MessageLog = () => {
  return (
    <MessageLogContainer>
      <LogoImage onClick={() => null} />
      <TextContainer>
        <TextHeader>
          <SpanText text="junho" color="white" mr={8} />
          <SpanText text="2023.01.26. 오후 9:52" color="msg-timestamp" fontSize="xs" />
        </TextHeader>
        <Text text="안녕하세요" color="msg" />
      </TextContainer>
    </MessageLogContainer>
  );
};

const MessageLogContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.tab3}; // test
  display: flex;
  flex-direction: row;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.75rem;
`;

const TextHeader = styled.div`
  margin-bottom: 0.5rem;
`;

export default MessageLog;
