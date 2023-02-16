import useInput from "@hooks/common/useInput";
import useGetFriendList from "@hooks/query/useGetFriendList";
import { useUserStore } from "@store/useUserStore";
import BigSearchInputBox from "../molecules/Div/BigSearchInputBox";
import EmptyContainer from "../molecules/Div/EmptyContainer";
import FriendDefaultBox from "../molecules/Div/FriendDefaultBox";
import ScrollableBox from "../molecules/Div/scrollableBox";
import LabelText from "../molecules/Text/LabelText";

const MainOnline = () => {
  const { userInfo } = useUserStore();
  const { data, isSuccess } = useGetFriendList(userInfo);
  const [value, onChangeValue] = useInput();

  if (!isSuccess) return <></>;

  const friendList: FriendType[] = data.data.data.filter(
    (friend: FriendType) => friend.friendState === "ACCEPTED"
  );
  const num = friendList.length;

  return (
    <>
      {num > 0 ? (
        <>
          <BigSearchInputBox value={value} onChange={onChangeValue} />
          <LabelText label={"온라인"} num={num} />
          <ScrollableBox>
            {friendList.map((v, idx) => (
              <FriendDefaultBox id={idx} name="nno3onn" />
            ))}
          </ScrollableBox>
        </>
      ) : (
        <EmptyContainer
          image="sleep"
          text="아무도 Ottogi와 놀고 싶지 않은가 봐요."
        />
      )}
    </>
  );
};

export default MainOnline;
