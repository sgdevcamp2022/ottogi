import styled from "styled-components";
import FieldButton from "../../atoms/Button/fieldButton";
import Text from "../../atoms/Text/Text";

const FieldList = () => {
  return (
    <FieldContinaer>
      <LeftRow>
        <Text text="항목" fontSize="xs" color="setting-tab" />
        <Text text="내용" fontSize="base" color="white" />
      </LeftRow>
      <ButtonWrappper>
        <FieldButton
          text="버튼 내용"
          backgroundColor="setting"
          onClick={() => console.log(1)}
        />
      </ButtonWrappper>
    </FieldContinaer>
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
`;

const LeftRow = styled.div``;

const ButtonWrappper = styled.div`
  width: auto;
  height: 2rem;
`;
