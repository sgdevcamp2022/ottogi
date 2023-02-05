import styled from "styled-components";
import MessageLog from "../molecules/Div/MessageLog";
import ScrollableBox from "../molecules/Div/scrollableBox";
import MessageFooter from "./MessageFooter";

const MainDirectBody = () => {
  return (
    <MainDirectBodyContainer>
      <ScrollableBox>
        <>
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
        </>
      </ScrollableBox>
      <MessageFooter />
    </MainDirectBodyContainer>
  );
};

const MainDirectBodyContainer = styled.div`
  position: relative;
  height: calc(100% - 68px);
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default MainDirectBody;
