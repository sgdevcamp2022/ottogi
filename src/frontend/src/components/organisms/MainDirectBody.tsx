import clientApi from "@api/axios";
import { Client } from "@stomp/stompjs";
import { useUserStore } from "@store/useUserStore";
import getFormatDate from "@utils/getFormatDate";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CallDirectMessage from "../molecules/Div/CallDirectMessage";
import MessageLog from "../molecules/Div/MessageLog";
import ScrollableBox from "../molecules/Div/scrollableBox";
import MessageFooter from "./MessageFooter";

let client: Client | null = null;

interface addChatLogProps {
  message: string;
  name: string;
  createdAt: string;
  imagePath: string;
}

const MainDirectBody = () => {
  const { accessToken } = useUserStore();
  const { channelId = "" } = useParams();
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const { userInfo } = useUserStore();
  const [chatLog, setChatLog] = useState<addChatLogProps[]>([]);
  const [message, setMessage] = useState("");

  const connectChatRoom = () => {
    client = new Client({
      brokerURL: process.env.REACT_APP_BROKER_URL,
      // debug: (err) => console.error(err),
      onConnect: () => subscribeChatRoom(),
    });
    client.activate();
  };

  const addChatMessage = () => {
    setMessage("");

    if (client?.connected) {
      client.publish({
        destination: `/pub/add_topic`,
        body: JSON.stringify({
          channelId, // friend.channelId
          userId: userInfo.id, // userInfo.userId
          name: userInfo.name, // userInfo.name
          message,
          type: 1, // enter(0)-> 누가 들어왔다, talk(1), invite(2)
          imagePath: userInfo.profileImagePath,
        }),
      });
    }
  };

  const addChatLog = ({
    message,
    name,
    createdAt,
    imagePath,
  }: addChatLogProps) => {
    setChatLog((prev) => [...prev, { message, name, createdAt, imagePath }]);
  };

  const subscribeChatRoom = () => {
    if (client) {
      client.subscribe(`/topic/${channelId}`, (data) => {
        const { message, name, createdAt, imagePath } = JSON.parse(data.body);

        addChatLog({ message, name, createdAt, imagePath });
      });
    }
  };

  const disconnectChatRoom = () => {
    if (client?.connected) {
      client.deactivate();
    }
  };

  useEffect(() => {
    const getChatLogs = async () => {
      const data = await clientApi.get("/chat/getchats", {
        params: { channelId },
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      setChatLog(data.data.data || []);
    };

    getChatLogs();
    connectChatRoom();
    return () => disconnectChatRoom();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: "end", behavior: "auto" });
  }, [chatLog]);

  return (
    <>
      <MainDirectBodyContainer>
        <ScrollableBox>
          <div ref={scrollRef}>
            {/* 부재중 */}
            {/* <CallDirectMessage
            name="nno3onn"
            type="missed"
            minute={2}
            createdAt={new Date()}
          /> */}
            {/* 통화 내역 */}
            {/* <CallDirectMessage
            name="nno3onn"
            type="called"
            minute={2}
            createdAt={new Date()}
          /> */}
            {chatLog.map(({ message, name, createdAt, imagePath }, idx) => {
              return (
                <>
                  {idx === 0 || chatLog[idx - 1].name !== chatLog[idx].name ? (
                    <MessageLog
                      text={message}
                      name={name}
                      createdAt={getFormatDate(createdAt)}
                      hasImage
                      imageUrl={imagePath}
                    />
                  ) : (
                    <MessageLog text={message} createdAt={createdAt} />
                  )}
                </>
              );
            })}
          </div>
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
  margin-bottom: 60px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding-bottom: 12px;
`;

export default MainDirectBody;
