import FriendDefaultBox from "@components/molecules/Div/FriendDefaultBox";
import useInput from "@hooks/common/useInput";
import useGetFriendList from "@hooks/query/useGetFriendList";
import useMainStore from "@store/useMainStore";
import { useUserStore } from "@store/useUserStore";
import { useState } from "react";
import styled from "styled-components";
import DefaultButton from "../atoms/Button/DefaultButton";
import BigSearchInputBox from "../molecules/Div/BigSearchInputBox";
import EmptyContainer from "../molecules/Div/EmptyContainer";
import ScrollableBox from "../molecules/Div/scrollableBox";
import LabelText from "../molecules/Text/LabelText";

const MainTotal = () => {
  const [num, setNum] = useState(0);
  const { setMainStatus } = useMainStore(({ setMainStatus }) => ({
    setMainStatus,
  }));
  const {
    userInfo: { email },
  } = useUserStore();
  const { data, isSuccess } = useGetFriendList(email);
  const [value, onChangeValue] = useInput();

  if (!isSuccess) return <></>;
  const friendList: FriendType[] = data.filter(
    (friend: FriendType) => friend.friendState === "ACCEPTED"
  );

  return (
    <>
      {friendList.length > 0 ? (
        <>
          <BigSearchInputBox value={value} onChange={onChangeValue} />
          <LabelText label={"모든 친구"} num={friendList.length} />
          <ScrollableBox>
            {friendList.map(
              ({
                email,
                name,
                channelId,
                userId,
                friendState,
                profileImagePath,
              }) => (
                <FriendDefaultBox
                  setNum={setNum}
                  src={profileImagePath}
                  key={email}
                  email={email}
                  id={channelId}
                  name={name}
                  userId={userId}
                  status={friendState}
                />
              )
            )}
          </ScrollableBox>
        </>
      ) : (
        <Container>
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
        </Container>
      )}
    </>
  );
};

const ButtonWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MainTotal;
