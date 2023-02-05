import Text from "../atoms/Text/Text";
import { ProfileTab } from "./ProfileTab.stories";
import SettingWrapper from "./SettingWrapper";
import styled from "styled-components";

const UserProfile = () => {
  return (
    <SettingWrapper>
      <ProfileWrapper>
        <Text
          text="프로필"
          fontSize="xl"
          fontWeight="bold"
          color="white"
          mb={24}
        />
        <ProfileTab />
      </ProfileWrapper>
    </SettingWrapper>
  );
};

export default UserProfile;
const ProfileWrapper = styled.div`
  width: 100%;
`;
