import styled from "styled-components";
import CallDirectMessage from "../molecules/Div/CallDirectMessage";
import MessageLog from "../molecules/Div/MessageLog";
import ScrollableBox from "../molecules/Div/scrollableBox";
import MessageFooter from "./MessageFooter";

const MainDirectBody = () => {
  return (
    <>
      <MainDirectBodyContainer>
        <ScrollableBox>
          <CallDirectMessage
            name="nno3onn"
            type="missed"
            minute={2}
            createdAt={new Date()}
          />
          <CallDirectMessage
            name="nno3onn"
            type="called"
            minute={2}
            createdAt={new Date()}
          />
          <MessageLog text="ㅇㅇ" hasImage createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" hasImage createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="dd" createdAt={new Date()} />
        </ScrollableBox>
      </MainDirectBodyContainer>
      <MessageFooter />
    </>
  );
};

const MainDirectBodyContainer = styled.div`
  margin-top: 4px;
  position: relative;
  height: calc(100vh - 120px);
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default MainDirectBody;
