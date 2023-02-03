import styled from "styled-components";
import FriendButton from "../molecules/Button/FriendButton";
import FriendList from "../molecules/Div/FriendList";

const Tab2Body = () => {
  return (
    <Tab2BodyContainer>
      <FriendButton />
      <FriendList />
    </Tab2BodyContainer>
  );
};

const Tab2BodyContainer = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  flex: 1;
`;

export default Tab2Body;
