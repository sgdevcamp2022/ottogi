import { useCallback, useState } from "react";
import styled from "styled-components";
import FieldButton from "../../atoms/Button/fieldButton";
import Text from "../../atoms/Text/Text";
import Modal from "../../organisms/Modal";

const FieldList = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <ListWrapper>
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          이곳에 children이 들어갑니다.
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
            onClick={() => console.log(1)}
          />
        </ButtonWrappper>
      </FieldContinaer>
      <FieldContinaer>
        <LeftRow>
          <Text text="전화번호" fontSize="xs" color="setting-tab" />
          <Text text="010-xxxx-xxxx" fontSize="base" color="white" />
        </LeftRow>
        <ButtonWrappper>
          <FieldButton
            text="추가하기"
            backgroundColor="setting"
            onClick={() => console.log(1)}
          />
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
