type FriendStateType = "REQUEST" | "WAIT" | "ACCEPTED";

interface FriendListType {
  receiver: string;
  friendState: FriendStateType;
}
