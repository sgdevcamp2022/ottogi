import ServerLabel from "../molecules/Div/ServerLabel";
import ServerRoomButton from "../molecules/Div/ServerRoomButton";
import { useNavigate, useParams } from "react-router-dom";
import useGetCategoryList from "@hooks/query/useGetCategoryList";
import UserChannelOnBox from "@components/molecules/Div/UserChannelOnBox";
import useGetChatFriends from "@hooks/query/useGetChatFriends";
import { useUserStore } from "@store/useUserStore";

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
  const { userInfo } = useUserStore();
  const { serverId, channelId } = useParams();
  const { data: res, isSuccess } = useGetCategoryList({
    communityId: serverId,
  });
  const { data: friendList, isSuccess: getChatFriendsSuccess } =
    useGetChatFriends(userInfo.id);
  console.log("friendList", friendList, ", success:", getChatFriendsSuccess);

  const data = res?.data?.data;
  if (!serverId || !isSuccess || !getChatFriendsSuccess) return <></>;

  const List = JSON.parse(JSON.stringify(data[0])).split("},");
  const List2 = JSON.parse(JSON.stringify(data[1])).split("},");
  const categoryList: CategoryType[] = [];
  const roomList: RoomType[] = [];

  if (List.length > 0 && categoryList.length < List?.length) {
    for (let i = 0; i < List?.length; i++) {
      if (i !== List.length - 1) {
        categoryList.push(JSON.parse(List[i] + "}"));
      } else {
        categoryList.push(JSON.parse(List[i]));
      }
    }
  }
  if (List2.length > 0 && roomList.length < List2?.length) {
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
      {categoryList.map((category: any) => (
        <>
          <ServerLabel text={category["category_name"]} />
          {roomList
            .filter((room) => room["category_id"] === category["category_id"])
            .map((room) => (
              <>
                <ServerRoomButton
                  type={room["type"] === 1 ? "voice" : "chat"}
                  text={room["channel_name"]}
                  serverId={serverId}
                  channelId={room["channel_id"]}
                />
                {room["channel_id"] === Number(channelId) && (
                  <UserChannelOnBox />
                )}
              </>
            ))}
        </>
      ))}
    </div>
  );
};

export default Tab2ServerBody;
