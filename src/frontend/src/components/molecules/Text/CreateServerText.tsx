import styled from "styled-components";
import Text from "../../atoms/Text/Text";

const CreateServerText = () => {
  return (
    <CreateServerTextContainer>
      <Text
        text="서버커스터마이징 하기"
        fontSize="2xl"
        fontWeight="bold"
        mb={12}
        color="black-1"
      />
      <Text
        text="새로운 서버에 이름과 아이콘을 부여해 개성을 드러내 보세요. 나중에 언제든 바꿀 수 있어요."
        fontSize="base"
        color="grey-1"
      />
    </CreateServerTextContainer>
  );
};

const CreateServerTextContainer = styled.div`
  text-align: center;
  margin-bottom: 1.25rem;
`;

export default CreateServerText;
