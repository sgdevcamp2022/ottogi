import { Client } from "@stomp/stompjs";
import { useUserStore } from "@store/useUserStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CallDirectMessage from "../molecules/Div/CallDirectMessage";
import MessageLog from "../molecules/Div/MessageLog";
import ScrollableBox from "../molecules/Div/scrollableBox";
import MessageFooter from "./MessageFooter";

const MainDirectBody = () => {
  let client: Client | null = null;
  const { userInfo } = useUserStore();
  const { channelId } = useParams();
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const connectChatRoom = () => {
    client = new Client({
      brokerURL: process.env.REACT_APP_BROKER_URL,
      debug: (err) => console.error(err),
      onConnect: () => subscribeChatRoom(),
    });
    client.activate();
  };

  const addChatMessage = () => {
    console.log("addChatMessage");
    setMessage("");
    if (client?.connected) {
      client.publish({
        destination: "/pub/add_queue",
        body: JSON.stringify({
          channelId, // friend.channelId
          userId: "id", // userInfo.userId
          name: userInfo.email, // userInfo.name
          message,
          type: 1,
        }),
      });
    }
  };

  const addChatLog = (msg: string) => {
    setChatLog([...chatLog, msg]);
  };

  const subscribeChatRoom = () => {
    if (client) {
      client.subscribe(`/queue/${channelId}`, (data) => {
        console.log("data", data);
        const { message, name } = JSON.parse(data.body);
        console.log("newMessage", message, name);

        addChatLog(message);
      });
    }
  };

  const disconnectChatRoom = () => {
    if (client?.connected) {
      client.deactivate();
    }
  };

  useEffect(() => {
    connectChatRoom();
    return () => disconnectChatRoom();
  }, []);

  return (
    <>
      <MainDirectBodyContainer>
        <ScrollableBox>
          {/* 부재중 */}
          <CallDirectMessage
            name="nno3onn"
            type="missed"
            minute={2}
            createdAt={new Date()}
          />
          {/* 통화 내역 */}
          <CallDirectMessage
            name="nno3onn"
            type="called"
            minute={2}
            createdAt={new Date()}
          />
          {chatLog.map((chat) => (
            <MessageLog text={chat} createdAt={new Date()} />
            // 일단은 이렇게까지만 테스트로
          ))}
          {/* <MessageLog text="ㅇㅇ" hasImage createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" hasImage createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="ㅇㅇ" createdAt={new Date()} />
          <MessageLog text="dd" createdAt={new Date()} /> */}
        </ScrollableBox>
      </MainDirectBodyContainer>
      <MessageFooter
        message={message}
        setMessage={setMessage}
        addChatMessage={addChatMessage}
      />
    </>
  );
};

const MainDirectBodyContainer = styled.div`
  margin-top: 4px;
  position: relative;
  height: calc(100vh - 120px);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding-bottom: 12px;
`;

export default MainDirectBody;
