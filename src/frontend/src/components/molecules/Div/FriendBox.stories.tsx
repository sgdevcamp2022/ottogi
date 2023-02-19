import FriendBoxDiv from "./FriendDefaultBox";

export default {
  title: "molecules/Div",
  component: FriendBoxDiv,
};

export const FriendBox = () => (
  <FriendBoxDiv id={"1"} name="허다은" userId={1} status="REQUEST" />
);
