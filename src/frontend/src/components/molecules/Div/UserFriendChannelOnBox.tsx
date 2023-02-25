import useGetChatFriends from "@hooks/query/useGetChatFriends";
import UserChannelOnBox from "./UserChannelOnBox";

interface UserFriendChannelOnBoxProps {
  friend: FriendType;
  channelId: number;
}

const UserFriendChannelOnBox = ({
  friend,
  channelId,
}: UserFriendChannelOnBoxProps) => {
  const { data: friendChannelId } = useGetChatFriends(friend.userId);

  if (Number(friendChannelId) === channelId) {
    return (
      <UserChannelOnBox src={friend.profileImagePath} name={friend.name} />
    );
  }
  return <></>;
};

export default UserFriendChannelOnBox;
