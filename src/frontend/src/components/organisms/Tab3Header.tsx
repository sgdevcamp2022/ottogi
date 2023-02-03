import styled from "styled-components";
import ChatAddIcon from "../atoms/Icons/ChatAddIcon";
import FriendHeader from "./FriendHeader";

const Tab3Header = () => {
  return (
    <Tab3HeaderContainer>
      <FriendHeader />
      <ChatAddIcon />
    </Tab3HeaderContainer>
  );
};

const Tab3HeaderContainer = styled.div`
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
`;

export default Tab3Header;
