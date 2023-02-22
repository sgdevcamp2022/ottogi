import FieldButton from "@components/atoms/Button/fieldButton";
import Text from "@components/atoms/Text/Text";
import Modal from "@components/organisms/Modal";
import { useCallback, useState } from "react";
import styled from "styled-components";
import DefaultButton from "../../atoms/Button/DefaultButton";
import DefaultInput from "../../atoms/Input/DefaultInput";
import useInput from "@hooks/common/useInput";
import useModifyPassword from "@hooks/query/useModifyPassword";
import { useUserStore } from "@store/useUserStore";
import useModifyName from "@hooks/query/useModifyName";
import useModifyIntro from "@hooks/query/useModifyIntro";

const IntroChange = ({ setOpenModal3 }: any) => {
  const { userInfo, setUserInfo } = useUserStore();
  const [introduction, changeIntroduction] = useInput();
  const { mutate: modifyIntro } = useModifyIntro();
  const updataIntro = () => {
    modifyIntro({
      introduction,
    });
    setUserInfo({ ...userInfo, introduction });
    setOpenModal3(false);
  };
  return (
    <>
      <TopWrapper>
        <TextWrapper>
          <Text
            text="자기소개 작성하기"
            fontSize="xxl"
            fontWeight="bold"
            mb={12}
            color="white"
          />
          <Text
            text="한줄로 자기소개를 작성해주세요!"
            fontSize="base"
            color="setting-tab"
            mb={20}
          />
        </TextWrapper>
        <Wrapper>
          {/* <Text
            text="Self-Introduction"
            color="setting-tab"
            fontSize="xs"
            mb={10}
            fontWeight="bold"
          /> */}
          <DefaultInput
            value={introduction}
            onChange={changeIntroduction}
            backgroundColor="voice-modal"
            fontSize="base"
            color="white"
            type="text"
          />
        </Wrapper>
      </TopWrapper>
      <Bottom>
        <DefaultButton text="완료" onClick={() => updataIntro()} />
      </Bottom>
    </>
  );
};

const NameChange = ({ setOpenModal }: any) => {
  const { userInfo, setUserInfo } = useUserStore();
  const [name, changeName] = useInput();
  const [password, changePassword] = useInput();
  const { mutate: modifyName } = useModifyName();
  const updataUserName = () => {
    modifyName({
      name,
      password,
    });
    setUserInfo({ ...userInfo, name });
    setOpenModal(false);
  };
  return (
    <>
      <TopWrapper>
        <TextWrapper>
          <Text
            text="사용자명 변경하기"
            fontSize="xxl"
            fontWeight="bold"
            mb={12}
            color="white"
          />
          <Text
            text="새 사용자명과 기존 비밀번호를 입력하세요."
            fontSize="base"
            color="setting-tab"
            mb={20}
          />
        </TextWrapper>
        <Wrapper>
          <Text
            text="사용자 명"
            color="setting-tab"
            fontSize="xs"
            mb={10}
            fontWeight="bold"
          />
          <DefaultInput
            value={name}
            onChange={changeName}
            backgroundColor="voice-modal"
            fontSize="base"
            color="white"
            type="text"
          />
        </Wrapper>

        <Wrapper>
          <Text
            text="현재 비밀번호"
            color="setting-tab"
            fontSize="xs"
            mb={10}
            fontWeight="bold"
          />
          <DefaultInput
            value={password}
            onChange={changePassword}
            backgroundColor="voice-modal"
            fontSize="base"
            color="white"
            type="text"
          />
        </Wrapper>
      </TopWrapper>
      <Bottom>
        <DefaultButton text="완료" onClick={() => updataUserName()} />
      </Bottom>
    </>
  );
};

const PwChange = ({ setOpenModal2 }: any) => {
  const [passwordConfirm, changePasswordConfirm] = useInput();
  const [password, changePassword] = useInput();
  const [originalPassword, changeOriginalPassword] = useInput();

  const { mutate: modifyPassword } = useModifyPassword();
  const OnChangePw = () => {
    modifyPassword({
      password,
      originalPassword,
    });
    setOpenModal2(false);
  };
  return (
    <>
      <TopWrapper>
        <TextWrapper>
          <Text
            text="비밀번호를 바꿔주세요"
            fontSize="xxl"
            fontWeight="bold"
            mb={12}
            color="white"
          />
          <Text
            text="현재 비밀번호와 새 비밀번호를 입력하세요."
            fontSize="base"
            color="setting-tab"
            mb={20}
          />
        </TextWrapper>

        <Wrapper>
          <Text
            text="현재비밀번호"
            color="setting-tab"
            fontSize="xs"
            mb={10}
            fontWeight="bold"
          />
          <DefaultInput
            value={originalPassword}
            onChange={changeOriginalPassword}
            backgroundColor="voice-modal"
            fontSize="base"
            color="white"
            type="text"
          />
        </Wrapper>
        <Wrapper>
          <Text
            text="새 비밀번호"
            color="setting-tab"
            fontSize="xs"
            mb={10}
            fontWeight="bold"
          />
          <DefaultInput
            value={password}
            onChange={changePassword}
            backgroundColor="voice-modal"
            fontSize="base"
            color="white"
            type="text"
          />
        </Wrapper>
        <Wrapper>
          <Text
            text="새 비밀번호 확인"
            color="setting-tab"
            fontSize="xs"
            mb={10}
            fontWeight="bold"
          />
          <DefaultInput
            value={passwordConfirm}
            onChange={changePasswordConfirm}
            backgroundColor="voice-modal"
            fontSize="base"
            color="white"
            type="text"
          />
        </Wrapper>
      </TopWrapper>
      <Bottom>
        <DefaultButton text="완료" onClick={() => OnChangePw()} />
      </Bottom>
    </>
  );
};

const FieldList = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [password, changePassword] = useInput();
  const [isOpenModal2, setOpenModal2] = useState<boolean>(false);
  const [isOpenModal3, setOpenModal3] = useState<boolean>(false);
  const { userInfo } = useUserStore();
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  const onClickToggleModal2 = useCallback(() => {
    setOpenModal2(!isOpenModal2);
  }, [isOpenModal2]);
  const onClickToggleModal3 = useCallback(() => {
    setOpenModal3(!isOpenModal3);
  }, [isOpenModal3]);
  return (
    <ListWrapper>
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <NameChange setOpenModal={setOpenModal} />
        </Modal>
      )}
      {isOpenModal2 && (
        <Modal onClickToggleModal={onClickToggleModal2}>
          <PwChange setOpenModal2={setOpenModal2} />
        </Modal>
      )}
      {isOpenModal3 && (
        <Modal onClickToggleModal={onClickToggleModal3}>
          <IntroChange setOpenModal3={setOpenModal3} />
        </Modal>
      )}
      <FieldContinaer>
        <LeftRow>
          <Text text="사용자명" fontSize="xs" color="setting-tab" mb={8} />
          <Text text={userInfo.name} fontSize="base" color="white" />
        </LeftRow>
        <ButtonWrappper>
          <FieldButton
            text="수정"
            backgroundColor="setting"
            onClick={onClickToggleModal}
          />
        </ButtonWrappper>
      </FieldContinaer>
      <FieldContinaer>
        <LeftRow>
          <Text text="이메일" fontSize="xs" color="setting-tab" mb={8} />
          <Text text={userInfo.email} fontSize="base" color="white" />
        </LeftRow>
        {/* <ButtonWrappper>
          <FieldButton
            text="확인"
            backgroundColor="setting"
            onClick={onClickToggleModal}
          />
        </ButtonWrappper> */}
      </FieldContinaer>
      <FieldContinaer>
        <LeftRow>
          <Text text="비밀번호" fontSize="xs" color="setting-tab" mb={8} />
          <Text text="********" fontSize="base" color="white" />
        </LeftRow>
        <ButtonWrappper>
          <FieldButton text="변경하기" onClick={onClickToggleModal2} />
        </ButtonWrappper>
      </FieldContinaer>
      <FieldContinaer>
        <LeftRow>
          <Text text="자기소개" fontSize="base" color="setting-tab" mb={8} />
          {/* <Text text="****" fontSize="base" color="white" /> */}
        </LeftRow>
        <ButtonWrappper>
          <FieldButton text="변경하기" onClick={onClickToggleModal3} />
        </ButtonWrappper>
      </FieldContinaer>
    </ListWrapper>
  );
};

export default FieldList;

const FieldContinaer = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const LeftRow = styled.div`
  align-items: center;
`;

const ButtonWrappper = styled.div`
  width: auto;
  height: 2rem;
`;

const ListWrapper = styled.div``;

const Wrapper = styled.div`
  width: 100%;
  padding: 0.8rem 1rem 0 1rem;
`;

const TextWrapper = styled.div`
  text-align: center;
  p {
    text-align: center;
  }
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
