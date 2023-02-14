import DefaultInput from "@components/atoms/Input/DefaultInput";
import Text from "@components/atoms/Text/Text";
import { ChangeEventHandler } from "react";
import styled from "styled-components";

interface CreateDirectMesssageHeaderProps {
  addFriendNum: number;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const CreateDirectMesssageHeader = ({
  addFriendNum,
  value,
  onChange,
}: CreateDirectMesssageHeaderProps) => {
  return (
    <CreateDirectMesssageHeaderContainer>
      <Text text="친구 선택하기" color="white" fontSize="lg" mb={4} />
      <Text
        text={`친구를 ${9 - addFriendNum}명 더 추가할 수 있어요.`}
        color="auth-desc"
        fontSize="xs"
        mb={16}
      />
      <DefaultInput
        placeholder="친구의 사용자명 입력하기"
        value={value}
        onChange={onChange}
        type="text"
      />
    </CreateDirectMesssageHeaderContainer>
  );
};

const CreateDirectMesssageHeaderContainer = styled.div`
  margin-bottom: 12px;
`;

export default CreateDirectMesssageHeader;
