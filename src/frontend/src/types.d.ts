declare type FriendStateType = "REQUEST" | "WAIT" | "ACCEPTED";

declare interface FriendListType {
  receiver: string;
  friendState: FriendStateType;
}
