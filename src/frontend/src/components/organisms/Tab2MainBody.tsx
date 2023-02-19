import styled from "styled-components";
import FriendButton from "../molecules/Button/FriendButton";
import FriendList from "../molecules/Div/FriendList";

const Tab2MainBody = () => {
  return (
    <Tab2MainBodyContainer>
      <FriendButton />
      <FriendList />
    </Tab2MainBodyContainer>
  );
};

const Tab2MainBodyContainer = styled.div`
  margin: 8px 8px 0 8px;
  flex: 1;
`;

export default Tab2MainBody;
