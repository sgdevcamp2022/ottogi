import styled from "styled-components";
import FieldButton from "../atoms/Button/fieldButton";
import Text from "../atoms/Text/Text";
import LinkText from "../atoms/Text/LinkText";
import Modal from "@components/organisms/Modal";
import { useCallback, useState } from "react";
import ServerLogoUpload from "@components/molecules/Button/ServerLogoUpload";
import useModifyUserImage from "@hooks/query/useModifyUserImage";
import { useUserStore } from "@store/useUserStore";

const ImageChange = ({ setOpenModal }: any) => {
  const formData = new FormData();
  const { mutate: modifyImage } = useModifyUserImage({
    onSuccess: (data: any) => {
      console.log("data", data);
      setUserInfo({ ...userInfo, profileImagePath: data.data.data });
    },
  });
  console.log(1);
  const [img, setImg] = useState<Blob | undefined>();
  console.log("img", img);
  console.log(typeof img);
  let imgString = JSON.stringify(img);
  console.log(imgString);
  const { userInfo, setUserInfo } = useUserStore();
  const updateImage = () => {
    if (!img) return;
    formData.append("file", img);
    modifyImage({ formData });
    setOpenModal(false);
  };
  return (
    <Wrapper>
      <ServerLogoUpload setImg={setImg} />
      <AvatarWrapper>
        <FieldButton text="변경하기" onClick={() => updateImage()} />
      </AvatarWrapper>
    </Wrapper>
  );
};

const UserProfilePage = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  // const [backgroundColor, setBackgroundColor] = useState("#fff");

  // const handleChangeComplete = (color: any) => {
  //   setBackgroundColor(color.hex);
  // };
  return (
    <MainWrapper>
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <ImageChange setOpenModal={setOpenModal} />
        </Modal>
      )}
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
            <FieldButton text="아바타 변경하기" onClick={onClickToggleModal} />
          </AvatarWrapper>
          <LinkWrapper>
            <LinkText text="아바타 제거하기" onClick={() => console.log(1)} />
          </LinkWrapper>
        </CustomButtons>
        {/* <Text
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
        /> */}
      </BlockWrapper>
      {/* <BlockWrapper><AccountCard /></BlockWrapper> */}
    </MainWrapper>
  );
};

export default UserProfilePage;

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  background-color: ${({ theme }) => theme.backgroundColor["tab3"]};
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor["tab3"]};
`;

const AvatarWrapper = styled.div`
  height: 32px;
  width: 8.5;
  width: 10rem;
`;

const CustomButtons = styled.div`
  margin-bottom: 24px;
  padding-bottom: 24px;
  display: flex;
  border-bottom: 0.25px solid ${({ theme }) => theme.color["setting-tab"]};
`;

const LinkWrapper = styled.div`
  padding: 7px 16px;
  margin-left: 4px;
`;

const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
`;
