type FriendStateType = "REQUEST" | "WAIT" | "ACCEPTED";

interface FriendType {
  receiver: string;
  friendState: FriendStateType;
}
