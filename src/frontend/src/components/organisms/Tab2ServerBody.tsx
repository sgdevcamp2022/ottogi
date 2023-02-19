import ServerLabel from "../molecules/Div/ServerLabel";
import ServerRoomButton from "../molecules/Div/ServerRoomButton";
import { useParams } from "react-router-dom";
import { useUserStore } from "@store/useUserStore";
import useGetCategoryList from "@hooks/query/useGetCategoryList";

interface CategoryType {
  category_id: number;
  category_name: string;
}

interface RoomType {
  type: number;
  channel_id: number;
  category_id: number;
  channel_name: string;
}

const Tab2ServerBody = () => {
  const { serverId } = useParams();
  const { accessToken } = useUserStore();
  const { data: res, isLoading } = useGetCategoryList({
    communityId: serverId,
    accessToken,
  });
  if (!serverId || isLoading) return <></>;
  const data = [
    '{"category_id": 1, "category_name": "음성 채널"},{"category_id": 2, "category_name": "채팅 채널"}',
    '{"type": 1, "channel_id": 1, "category_id": 1, "channel_name": "일반"},{"type": 2, "channel_id": 3, "category_id": 1, "channel_name": "일반"},{"type": 1, "channel_id": 2, "category_id": 2, "channel_name": "일반"},{"type": 2, "channel_id": 4, "category_id": 2, "channel_name": "일반"}',
  ];
  // console.log(JSON.parse(JSON.stringify(data[0])));
  // console.log(JSON.stringify(data[0]));
  // console.log(JSON.stringify(data[1]));
  const List = JSON.parse(JSON.stringify(data[0])).split("},");
  const List2 = JSON.parse(JSON.stringify(data[1])).split("},");
  // for (let i = 0; i < List.length; i++) {
  //   console.log(List[i]);
  // }
  const categoryList: CategoryType[] = [];
  const roomList: RoomType[] = [];

  if (List.length > 1 && categoryList.length < List?.length) {
    for (let i = 0; i < List?.length; i++) {
      if (i !== List.length - 1) {
        categoryList.push(JSON.parse(List[i] + "}"));
      } else {
        categoryList.push(JSON.parse(List[i]));
      }
    }
  }
  if (List2.length > 1 && roomList.length < List2?.length) {
    for (let i = 0; i < List2?.length; i++) {
      if (i !== List2.length - 1) {
        roomList.push(JSON.parse(List2[i] + "}"));
      } else {
        roomList.push(JSON.parse(List2[i]));
      }
    }
  }

  return (
    <div>
      {!isLoading &&
        categoryList.map((category: any) => (
          <>
            <ServerLabel text={category["category_name"]} />
            <>
              {roomList
                .filter(
                  (room) => room["category_id"] === category["category_id"]
                )
                .map((room) => (
                  <ServerRoomButton
                    type={
                      room["channel_name"] === "음성 채널" ? "voice" : "chat"
                    }
                    text={room["channel_name"]}
                    serverId={serverId}
                    channelId={room["channel_id"]}
                  />
                ))}
            </>
          </>
        ))}
    </div>
  );
};

export default Tab2ServerBody;
