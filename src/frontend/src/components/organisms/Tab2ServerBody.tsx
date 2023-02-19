import ServerLabel from "../molecules/Div/ServerLabel";
import ServerRoomButton from "../molecules/Div/ServerRoomButton";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const { serverId, channelId } = useParams();
  const { accessToken } = useUserStore();
  const { data: res, isLoading } = useGetCategoryList({
    communityId: serverId,
    accessToken,
  });

  const data = res?.data?.data;
  if (!data || !serverId || isLoading) return <></>;

  const List = JSON.parse(JSON.stringify(data[0])).split("},");
  const List2 = JSON.parse(JSON.stringify(data[1])).split("},");
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

  if (!channelId) {
    let id;
    for (let i = 0; i < roomList.length; i++) {
      if (roomList[i]["type"] === 2) {
        id = roomList[i]["channel_id"];
        break;
      }
    }
    navigate(`/${serverId}/${id}`);
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
                  (room) => room["category_id"] === category["categoy_id"]
                )
                .map((room) => (
                  <ServerRoomButton
                    type={room["type"] === 1 ? "voice" : "chat"}
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
