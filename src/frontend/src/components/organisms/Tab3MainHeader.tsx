import useGetFriendStatus from "@hooks/query/useGetFriendStatus";
import useMainStore from "@store/useMainStore";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TabDivider from "../atoms/Div/TabDivider";
import DirectMessageHeader from "./DirectMessageHeader";
import FriendHeader from "./FriendHeader";

const Tab3MainHeader = () => {
  const { channelId } = useParams();
  const { userId, userName } = useMainStore();

  const { data: status } = useGetFriendStatus({
    userId: Number(userId),
  });

  return (
    <Tab3MainHeaderContainer>
      <HeaderWrapper>
        {channelId ? (
          <DirectMessageHeader name={userName} status={status?.data.data} />
        ) : (
          <FriendHeader />
        )}
      </HeaderWrapper>
      <TabDivider />
    </Tab3MainHeaderContainer>
  );
};

const Tab3MainHeaderContainer = styled.div`
  position: sticky;
  top: 0;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  z-index: 99;
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.5rem;
`;

export default Tab3MainHeader;
