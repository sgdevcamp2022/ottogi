import styled from "styled-components";
import FriendBox from "../molecules/Div/FriendBox";
import LabelText from "../molecules/Text/LabelText";

const MainBlocked = () => {
  return (
    <MainBlockedContainer>
      <LabelText label={"온라인"} num={10} />
      <div>
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
      </div>
    </MainBlockedContainer>
  );
};

const MainBlockedContainer = styled.div``;

export default MainBlocked;
