import Publish from "src/video-broadcast/publish";
import styled from "styled-components";

const MainVoiceRoomBody = () => {
  return (
    <>
      <MainDirectBodyContainer>
        <Publish />
      </MainDirectBodyContainer>
    </>
  );
};

const MainDirectBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: black;
  width: 100%;
  height: 100%;
`;

export default MainVoiceRoomBody;
