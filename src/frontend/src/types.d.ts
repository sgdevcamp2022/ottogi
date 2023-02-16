type FriendStateType = "REQUEST" | "WAIT" | "ACCEPTED";

interface FriendType {
  userId: number;
  name: string;
  email: string;
  friendState: FriendStateType;
  channelId: string;
  createdAt: Date;
}
