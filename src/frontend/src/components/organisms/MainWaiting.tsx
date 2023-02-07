import styled from "styled-components";
import useInput from "../../hooks/common/useInput";
import BigSearchInputBox from "../molecules/Div/BigSearchInputBox";
import EmptyContainer from "../molecules/Div/EmptyContainer";
import LabelText from "../molecules/Text/LabelText";
import FriendWaitingBox from "../molecules/Div/FriendWaitingBox";
import useGetFriendList from "../../hooks/query/useGetFriendList";
import { useUserStore } from "../../store/useUserStore";
import FriendDefaultBox from "../molecules/Div/FriendDefaultBox";
import ScrollableBox from "../molecules/Div/scrollableBox";

interface FriendState {
  receiver: string;
  friendState: FriendStateType;
}

const MainWaiting = () => {
  const { userInfo } = useUserStore();
  const { data, isSuccess } = useGetFriendList(userInfo);
  const [value, onChangeValue] = useInput();

  if (!isSuccess) return <></>;

  const friendList: FriendListType[] = data.data.data.filter(
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
            <>
              <FriendDefaultBox id={1} name="nno3onn" />
              <FriendDefaultBox id={1} name="nno3onn" />
              <FriendDefaultBox id={1} name="nno3onn" />
              <FriendDefaultBox id={1} name="nno3onn" />
              <FriendDefaultBox id={1} name="nno3onn" />
              <FriendDefaultBox id={1} name="nno3onn" />
              <FriendDefaultBox id={1} name="nno3onn" />
              <FriendDefaultBox id={1} name="nno3onn" />
              <FriendDefaultBox id={1} name="nno3onn" />
              <FriendDefaultBox id={1} name="nno3onn" />
            </>
          </ScrollableBox>
          {/* {friendList.map(({ receiver, friendState }: FriendListType) => (
            <FriendWaitingBox name={receiver} status={friendState} />
          ))} */}
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
