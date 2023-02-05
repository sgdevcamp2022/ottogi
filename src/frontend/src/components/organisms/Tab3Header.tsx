import { useParams } from "react-router-dom";
import styled from "styled-components";
import TabDivider from "../atoms/Div/TabDivider";
import DirectMessageHeader from "./DirectMessageHeader";
import FriendHeader from "./FriendHeader";

const Tab3Header = () => {
  const { userId } = useParams();
  console.log(userId);

  return (
    <Tab3HeaderContainer>
      <HeaderWrapper>{userId ? <DirectMessageHeader name="허다은" status="on" /> : <FriendHeader />}</HeaderWrapper>
      <TabDivider />
    </Tab3HeaderContainer>
  );
};

const Tab3HeaderContainer = styled.div`
  position: sticky;
  top: 0;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  z-index: 99;
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.5rem;
`;

export default Tab3Header;
