import styled from "styled-components";
import FieldButton from "../atoms/Button/fieldButton";
import Text from "../atoms/Text/Text";
import LinkText from "../atoms/Text/LinkText";
import AccountCard from "./AccountCard";
import { SketchPicker } from "react-color";
import { useState } from "react";

const UserProfilePage = () => {
  const [backgroundColor, setBackgroundColor] = useState("#fff");

  const handleChangeComplete = (color: any) => {
    setBackgroundColor(color.hex);
  };
  return (
    <MainWrapper>
      <BlockWrapper>
        <Text
          text="아바타"
          fontSize="xs"
          color="setting-tab"
          mb={8}
          fontWeight="bold"
        />
        <CustomButtons>
          <AvatarWrapper>
            <FieldButton
              text="아바타 변경하기"
              onClick={() => console.log(1)}
            />
          </AvatarWrapper>
          <LinkWrapper>
            <LinkText text="아바타 제거하기" onClick={() => console.log(1)} />
          </LinkWrapper>
        </CustomButtons>
        <Text
          text="배너색상"
          fontSize="xs"
          color="setting-tab"
          mb={8}
          fontWeight="bold"
        />
        <SketchPicker
          color={backgroundColor}
          onChangeComplete={handleChangeComplete}
        />
        <Text
          text="내 소개"
          fontSize="xs"
          color="setting-tab"
          mb={8}
          fontWeight="bold"
        />
        <Text
          text="간단한 소개 작성"
          fontSize="sm"
          color="setting-tab"
          mb={16}
        />
      </BlockWrapper>
      <BlockWrapper>{/* <AccountCard /> */}</BlockWrapper>
    </MainWrapper>
  );
};

export default UserProfilePage;

const MainWrapper = styled.div`
  width: 100%;
  gap: 35px;
  display: flex;
  position: relative;
  background-color: ${({ theme }) => theme.backgroundColor["tab3"]};
`;

const AvatarWrapper = styled.div`
  height: 32px;
  width: 130px;
`;

const CustomButtons = styled.div`
  margin-bottom: 24px;
  padding-bottom: 24px;
  display: flex;
  border-bottom: 0.25px solid ${({ theme }) => theme.color["setting-tab"]};
  width: auto;
`;

const LinkWrapper = styled.div`
  padding: 7px 16px;
  margin-left: 4px;
`;

const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 50%; */
  text-align: left;
`;
