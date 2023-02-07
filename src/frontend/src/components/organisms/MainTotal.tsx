import styled from "styled-components";
import useInput from "../../hooks/common/useInput";
import useGetFriendList from "../../hooks/query/useGetFriendList";
import useMainStore from "../../store/useMainStore";
import { useUserStore } from "../../store/useUserStore";
import DefaultButton from "../atoms/Button/DefaultButton";
import BigSearchInputBox from "../molecules/Div/BigSearchInputBox";
import EmptyContainer from "../molecules/Div/EmptyContainer";
import FriendDefaultBox from "../molecules/Div/FriendDefaultBox";
import ScrollableBox from "../molecules/Div/scrollableBox";
import LabelText from "../molecules/Text/LabelText";

const MainTotal = () => {
  const { setMainStatus } = useMainStore(({ setMainStatus }) => ({
    setMainStatus,
  }));
  const { userInfo } = useUserStore();
  const { data, isSuccess } = useGetFriendList(userInfo);
  const [value, onChangeValue] = useInput();

  if (!isSuccess) return <></>;

  const friendList: FriendListType[] = data.data.data;
  const num = friendList.length;
  return (
    <>
      {num > 0 ? (
        <>
          <BigSearchInputBox value={value} onChange={onChangeValue} />
          <LabelText label={"모든 친구"} num={num} />
          <ScrollableBox>
            <>
              {friendList.map((friend, idx) => (
                <FriendDefaultBox id={idx} name={friend.receiver} />
              ))}
            </>
          </ScrollableBox>
        </>
      ) : (
        <>
          <EmptyContainer
            image="addFriend"
            text="Ottogi는 친구를 기다리고 있어요."
          />
          <ButtonWrapper>
            <DefaultButton
              text="친구 추가하기"
              onClick={() => setMainStatus("친구 추가하기")}
              height={38}
              width={110}
              fontSize="sm"
            />
          </ButtonWrapper>
        </>
      )}
    </>
  );
};

const ButtonWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
`;

export default MainTotal;