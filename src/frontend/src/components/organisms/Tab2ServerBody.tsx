import styled from "styled-components";
import ServerLabel from "../molecules/Div/ServerLabel";
import ServerRoomButton from "../molecules/Div/ServerRoomButton";

const Tab2ServerBody = () => {
  return (
    <Tab2ServerBodyContainer>
      <ServerLabel text="정보" />
      <ServerRoomButton type="chat" text="환영" />
      <ServerLabel text="채팅 채널" />
      <ServerRoomButton type="chat" text="환영" />
      <ServerRoomButton type="chat" text="환영" />
      <ServerRoomButton type="chat" text="환영" />
      <ServerLabel text="음성 채널" />
      <ServerRoomButton type="voice" text="환영" />
      <ServerRoomButton type="voice" text="환영" />
      <ServerRoomButton type="voice" text="환영" />
    </Tab2ServerBodyContainer>
  );
};

const Tab2ServerBodyContainer = styled.div``;

export default Tab2ServerBody;
