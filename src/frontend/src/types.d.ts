interface UserInfoType {
  id: number;
  email: string;
  name: string;
  introduction: string;
  profileImagePath: string;
  createdAt: string;
}

type FriendStateType = "REQUEST" | "WAIT" | "ACCEPTED";

interface FriendType {
  userId: number;
  name: string;
  email: string;
  friendState: FriendStateType;
  channelId: string;
  createdAt: Date;
  profileImagePath: string;
}
