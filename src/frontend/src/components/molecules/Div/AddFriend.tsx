import styled from "styled-components";
import useInput from "../../../hooks/common/useInput";
import Text from "../../atoms/Text/Text";
import InviteInput from "../Input/InviteInput";

const AddFriend = () => {
  const [value, onChangeValue] = useInput();

  return (
    <>
      <Text text="친구 추가하기" fontWeight="bold" color="white" mb={8} />
      <Text text="이메일을 작성하여 친구를 추가할 수 있어요." color="auth-desc" fontSize="sm" mb={16} />
      <InviteInput value={value} onChange={onChangeValue} onClick={() => null} />
    </>
  );
};

export default AddFriend;
