import { useCallback, useState } from "react";
import styled from "styled-components";
import FieldButton from "../../atoms/Button/fieldButton";
import Text from "../../atoms/Text/Text";
import Modal from "../../organisms/Modal";
import DefaultButton from "../../atoms/Button/DefaultButton";
import DefaultInput from "../../atoms/Input/DefaultInput";
const FieldList = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const [text, setText] = useState("");

  const NameChange = () => {
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
              value={text}
              onChange={({ target: { value } }) => setText(value)}
              backgroundColor="voice-modal"
              fontSize="base"
              color="white"
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
              value={text}
              onChange={({ target: { value } }) => setText(value)}
              backgroundColor="voice-modal"
              fontSize="base"
              color="white"
            />
          </Wrapper>
        </TopWrapper>
        <Bottom>
          <DefaultButton text="완료" onClick={() => console.log(1)} />
        </Bottom>
      </>
    );
  };

  return (
    <ListWrapper>
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <NameChange />
        </Modal>
      )}
      <FieldContinaer>
        <LeftRow>
          <Text text="사용자명" fontSize="xs" color="setting-tab" />
          <Text text="내용" fontSize="base" color="white" />
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
          <Text text="이메일" fontSize="xs" color="setting-tab" />
          <Text text="내용" fontSize="base" color="white" />
        </LeftRow>
        <ButtonWrappper>
          <FieldButton
            text="확인"
            backgroundColor="setting"
            onClick={onClickToggleModal}
          />
        </ButtonWrappper>
      </FieldContinaer>
      <FieldContinaer>
        <LeftRow>
          <Text text="전화번호" fontSize="xs" color="setting-tab" />
          <Text text="010-xxxx-xxxx" fontSize="base" color="white" />
        </LeftRow>
        <ButtonWrappper>
          <FieldButton text="추가하기" onClick={onClickToggleModal} />
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

const LeftRow = styled.div``;

const ButtonWrappper = styled.div`
  width: auto;
  height: 2rem;
`;

const ListWrapper = styled.div``;

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
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
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor["voice-nobody"]};
`;
