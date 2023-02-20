import ButtonWrapper from "@components/atoms/Button/ButtonWrapper";
import LogoImage from "@components/atoms/Div/LogoImage";
import Text from "@components/atoms/Text/Text";
import { useUserStore } from "@store/useUserStore";
import React from "react";
import styled from "styled-components";

const UserChannelOnBox = () => {
  const {
    userInfo: { profileImagePath, name },
  } = useUserStore();

  return (
    <UserChannelOnBoxContainer>
      <ButtonWrapper onClick={() => null}>
        <LogoImage
          src={profileImagePath}
          width={1.5}
          height={1.5}
          onClick={() => null}
        />
        <Text text={name} />
      </ButtonWrapper>
    </UserChannelOnBoxContainer>
  );
};

const UserChannelOnBoxContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 4px 0;
  padding-bottom: 0.5rem;
  padding-left: 2.25rem;
`;

export default UserChannelOnBox;
