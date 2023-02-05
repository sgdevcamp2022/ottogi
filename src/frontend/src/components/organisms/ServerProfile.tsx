import styled from "styled-components";
import DropDown from "../atoms/Div/DropDown";
import Text from "../atoms/Text/Text";
import ServerInput from "../molecules/Input/ServerInput";

const ServerProfile = () => {
  return (
    <ProfileWrapper>
      <BlockWrapper>
        <Text
          text="참가 중인 서버마다 다른 프로필을 사용하여 보세요."
          fontSize="sm"
          color="msg-placeholder"
          mb={16}
        />
        <Text
          text="서버 선택하기"
          fontSize="xs"
          color="setting-tab"
          mb={12}
          fontWeight="bold"
        />
        <DropDown />
      </BlockWrapper>
      <BlockWrapper>
        <ServerInput />
      </BlockWrapper>
    </ProfileWrapper>
  );
};

export default ServerProfile;

const ProfileWrapper = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const BlockWrapper = styled.div`
  margin-bottom: 24px;
  border-bottom: 0.25px solid ${({ theme }) => theme.color["setting-tab"]};
  padding-bottom: 16px;
`;
