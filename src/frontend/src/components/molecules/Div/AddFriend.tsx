import Text from "@components/atoms/Text/Text";
import InviteInput from "../Input/InviteInput";

const AddFriend = () => {
  return (
    <>
      <Text text="친구 추가하기" fontWeight="bold" color="white" mb={8} />
      <Text
        text="이메일을 작성하여 친구를 추가할 수 있어요."
        color="auth-desc"
        fontSize="sm"
        mb={16}
      />
      <InviteInput />
    </>
  );
};

export default AddFriend;
