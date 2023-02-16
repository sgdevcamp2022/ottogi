// import SockJs from "sockjs-client";
// import StompJs from "@stomp/stompjs";
// stomp와 sockjs 패키지로 깔고 임포트!!
// https://okky.kr/articles/1152048

import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import DefaultButton from "../components/atoms/Button/DefaultButton";
// 버전 별로 불러와줘야 되는 부분이 다른 것 같음.

var client: Client | null = null;

const Chat = () => {
  const [content, setContent] = useState("");

  const subscribe = () => {
    if (client != null) {
      // subscribe에 url파라미터로 제공해줘야 함.
      client.subscribe("/topic/ottogi_channel3", (data: any) => {
        console.log("data:" + data);
        console.log(data);
        const newMessage: string = JSON.parse(data.body).message as string;
        addContent(newMessage);
      });
    }
  };

  useEffect(() => {
    connect();

    return () => disConnect();
  }, []);

  const addContent = (message: string) => {
    setContent(content.concat(message));
  };

  const connect = () => {
    client = new Client({
      // 해당 부분도 파라미터로 넣어두기
      brokerURL: "ws://172.20.6.236:64419/ws",
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        subscribe();
      },
    });

    client.activate();
  };

  // message send, channelId, Id, name, message 양식으로 전송하기
  // destination - /pub/add_topic 그대로 사용하면 됨.(일단은))
  const handler = (
    channelId: string,
    Id: string,
    name: string,
    message: string
  ) => {
    if (client != null) {
      if (!client.connected) return;

      client.publish({
        destination: "/pub/add_topic",
        body: JSON.stringify({
          channelId: channelId,
          Id: Id,
          name: name,
          message: message,
        }),
      });
    }
  };

  const disConnect = () => {
    if (client != null) {
      if (client.connected) client.deactivate();
    }
  };

  return (
    <>
      <DefaultButton
        text="test"
        onClick={() => handler("ottogi_channel", "12121", "asdadad", "test1")}
      />
    </>
  );
};

export default Chat;
