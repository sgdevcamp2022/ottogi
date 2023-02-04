declare interface FriendListType {
  receiver: string;
  friendState: "REQUEST" | "WAIT" | "ACCEPTED";
}
