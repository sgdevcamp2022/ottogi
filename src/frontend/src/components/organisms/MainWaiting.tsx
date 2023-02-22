import BigSearchInputBox from "../molecules/Div/BigSearchInputBox";
import EmptyContainer from "../molecules/Div/EmptyContainer";
import LabelText from "../molecules/Text/LabelText";
import FriendWaitingBox from "../molecules/Div/FriendWaitingBox";
import ScrollableBox from "../molecules/Div/scrollableBox";
import { useUserStore } from "@store/useUserStore";
import useGetFriendList from "@hooks/query/useGetFriendList";
import useInput from "@hooks/common/useInput";

interface FriendState {
  receiver: string;
  friendState: FriendStateType;
}

const MainWaiting = () => {
  const {
    userInfo: { email },
  } = useUserStore();
  const { data, isSuccess } = useGetFriendList(email);
  const [value, onChangeValue] = useInput();

  if (!isSuccess) return <></>;

  const friendList: FriendType[] = data.filter(
    (friend: FriendState) =>
      friend.friendState === "REQUEST" || friend.friendState === "WAIT"
  );
  const num = friendList.length;

  return (
    <>
      {num > 0 ? (
        <>
          <BigSearchInputBox value={value} onChange={onChangeValue} />
          <LabelText label={"대기 중"} num={num} />
          <ScrollableBox>
            {friendList.map(
              ({ email, name, friendState, profileImagePath }: FriendType) => (
                <FriendWaitingBox
                  src={profileImagePath}
                  key={email}
                  email={email}
                  name={name}
                  status={friendState}
                />
              )
            )}
          </ScrollableBox>
        </>
      ) : (
        <EmptyContainer
          image="waiting"
          text="대기 중인 친구 요청이 없네요. 그래도 옆에 Ottogi는 있네요."
        />
      )}
    </>
  );
};

export default MainWaiting;
