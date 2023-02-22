import ButtonWrapper from "@components/atoms/Button/ButtonWrapper";
import LogoImage from "@components/atoms/Div/LogoImage";
import Text from "@components/atoms/Text/Text";
import { useUserStore } from "@store/useUserStore";
import React from "react";
import styled from "styled-components";

const UserChannelOnBox = ({ friend }: any) => {
  const {
    userInfo: { profileImagePath, name },
  } = useUserStore();

  return (
    <Container>
      <ButtonWrapper onClick={() => null} height={30}>
        <UserChannelOnBoxContainer>
          <LogoImage
            src={profileImagePath}
            width={1.5}
            height={1.5}
            onClick={() => null}
          />
          <Text text={name} color="white" />
        </UserChannelOnBoxContainer>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  padding-bottom: 0.5rem;
  padding-left: 2.25rem;
  padding-right: 0.5rem;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const UserChannelOnBoxContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin: 4px 0;
`;

export default UserChannelOnBox;
