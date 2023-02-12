import styled from "styled-components";
import ButtonWrapper from "../../atoms/Button/ButtonWrapper";
import DefaultButton from "../../atoms/Button/DefaultButton";
import Text from "../../atoms/Text/Text";

const InviteFriendBox = () => {
  const name = "nno3onn";
  return (
    <ButtonWrapper onClick={() => null}>
      <InviteFriendBoxContainer>
        <UserInfoContainer>
          <UserProfile />
          <Text text={name} color="white" />
        </UserInfoContainer>
        <DefaultButton
          text="초대..."
          onClick={() => null}
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
