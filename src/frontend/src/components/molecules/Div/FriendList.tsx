import useGetFriendList from "@hooks/query/useGetFriendList";
import { useUserStore } from "@store/useUserStore";
import styled from "styled-components";
import DirectButton from "../Button/DirectButton";
import DirectMessage from "./DirectMessage";
import ScrollableBox from "./scrollableBox";

const FriendList = () => {
  const {
    userInfo: { email },
    accessToken,
  } = useUserStore();
  const { data: friendList } = useGetFriendList({ email, accessToken });

  if (!friendList) return <></>;

  return (
    <FriendListContainer>
      <DirectMessage />
      <ScrollableBox>
        <ListContainer>
          {friendList.data.data.map(({ name, channelId }: FriendType) => (
            <DirectButton name={name} id={channelId} />
          ))}
        </ListContainer>
      </ScrollableBox>
    </FriendListContainer>
  );
};

const FriendListContainer = styled.div`
  padding: 0 0.25rem;
  background-color: ${({ theme }) => theme.backgroundColor.trans};
`;

const ListContainer = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export default FriendList;
