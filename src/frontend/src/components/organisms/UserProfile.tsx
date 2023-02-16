import Text from "../atoms/Text/Text";
import { ProfileTab } from "./ProfileTab.stories";
import Modal from "@components/organisms/Modal";
import SettingWrapper from "./SettingWrapper";
import { useCallback, useState } from "react";
import styled from "styled-components";
import DefaultButton from "@components/atoms/Button/DefaultButton";
import ServerLogoUpload from "@components/molecules/Button/ServerLogoUpload";

const NameChange = () => {
  return (
    <>
      <TopWrapper>
        <ServerLogoUpload />
      </TopWrapper>
      <Bottom>
        <DefaultButton text="완료" onClick={() => console.log(1)} />
      </Bottom>
    </>
  );
};

const UserProfile = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
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
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <NameChange />
        </Modal>
      )}
    </SettingWrapper>
  );
};

export default UserProfile;
const ProfileWrapper = styled.div`
  width: 100%;
`;
const Wrapper = styled.div`
  width: 100%;
  padding: 1rem 1rem 0 1rem;
`;

const TextWrapper = styled.div`
  text-align: center;
`;

const TopWrapper = styled.div`
  padding: 1rem;
  width: 100%;
  text-align: center;
`;

const Bottom = styled.div`
  width: 100%;
  height: 4rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor["voice-nobody"]};
`;
