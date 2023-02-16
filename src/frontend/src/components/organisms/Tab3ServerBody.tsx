import styled from "styled-components";
import MainDirectBody from "./MainDirectBody";

const Tab3ServerBody = () => {
  return (
    <Tab3ServerBodyContainer>
      <MainDirectBody />
    </Tab3ServerBodyContainer>
  );
};

const Tab3ServerBodyContainer = styled.div`
  margin-top: 4px;
  position: relative;
  height: calc(100vh - 120px);
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default Tab3ServerBody;
