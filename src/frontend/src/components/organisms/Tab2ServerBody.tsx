import ServerLabel from "../molecules/Div/ServerLabel";
import ServerRoomButton from "../molecules/Div/ServerRoomButton";

const Tab2ServerBody = () => {
  return (
    <div>
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
    </div>
  );
};

export default Tab2ServerBody;
