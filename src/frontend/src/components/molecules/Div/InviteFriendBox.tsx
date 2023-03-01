import ButtonWrapper from "@components/atoms/Button/ButtonWrapper";
import DefaultButton from "@components/atoms/Button/DefaultButton";
import Text from "@components/atoms/Text/Text";
import useSendInvite from "@hooks/query/useSendInvite";
import { useUserStore } from "@store/useUserStore";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useSendInviteToChat from "@hooks/query/useSentInviteToChat";

interface friend {
  name: string;
  userId: number;
  channelId: string;
}

const InviteFriendBox = ({ name, userId, channelId }: friend) => {
  // const dummyPost = (data) => ({
  //   id: shortId.generate(),
  //   content: data,
  // });
  const { mutate: sendInvite } = useSendInvite();
  const { userInfo } = useUserStore();
  const { serverId: communityId } = useParams();
  const { mutate: sendInviteToChat } = useSendInviteToChat();

  let backUrl = process.env.REACT_APP_BASE_URL;
  let uuid = crypto.randomUUID();
  // console.log(typeof uuid);
  let shortUrl = uuid;
  const onSendInvite = () => {
    sendInvite({
      communityId,
      userId,
      shortUrl,
    });
    sendInviteToChat({
      sender: userInfo.name,
      channelId: channelId,
      linkMessage: `${backUrl}/invite/${shortUrl}/${userId}`,
    });
    console.log(`${backUrl}/invite/${shortUrl}/${userId}`);
  };
  // const name = "nno3onn";
  return (
    <ButtonWrapper onClick={() => null}>
      <InviteFriendBoxContainer>
        <UserInfoContainer>
          <UserProfile />
          <Text text={name} color="white" />
        </UserInfoContainer>
        <DefaultButton
          text="초대..."
          onClick={() => onSendInvite()}
          // onClick={() => console.log(userId)}
          pv={2}
          width={90}
          height={32}
          fontSize="sm"
          color="white"
          backgroundColor="trans"
          hoverBackgroundColor="add-friend"
          borderColor="success"
        />
      </InviteFriendBoxContainer>
    </ButtonWrapper>
  );
};

const InviteFriendBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0px;
`;

const UserInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const UserProfile = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 25px;
  background-color: white;
`;

export default InviteFriendBox;
