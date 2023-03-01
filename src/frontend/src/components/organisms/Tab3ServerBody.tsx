import styled from "styled-components";
import MainDirectBody from "./MainDirectBody";
import MainVoiceRoomBody from "./MainVoiceRoomBody";

const Tab3ServerBody = () => {
  return (
    <Tab3ServerBodyContainer>
      {/* <MainDirectBody /> */}
      <MainVoiceRoomBody/>
    </Tab3ServerBodyContainer>
  );
};

const Tab3ServerBodyContainer = styled.div`
  /* padding: 0 20px;
  margin-top: 4px; */
  position: relative;
  height: calc(100vh - 55px);
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default Tab3ServerBody;
