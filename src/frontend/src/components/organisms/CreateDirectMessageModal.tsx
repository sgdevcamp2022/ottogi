import useInput from "@hooks/common/useInput";
import useGetFriendList from "@hooks/query/useGetFriendList";
import { useUserStore } from "@store/useUserStore";
import styled from "styled-components";
import DefaultModal from "../atoms/Div/DefaultModal";
import Text from "../atoms/Text/Text";
import CreateDirectMesssageHeader from "../molecules/Div/CreateDirectMessageHeader";
import CreateDirectMesssageFooter from "../molecules/Div/CreateDirectMesssageFooter";
import ScrollableBox from "../molecules/Div/scrollableBox";
import SelectFriend from "../molecules/Div/SelectFriend";

interface CreateDirectMessageModalProps {
  top?: number;
  left?: number;
  right?: number;
}

const CreateDirectMessageModal = ({
  top = 0,
  left = 0,
  right = 0,
}: CreateDirectMessageModalProps) => {
  const {
    userInfo: { email },
  } = useUserStore();
  const { data: friendList, isSuccess } = useGetFriendList(email);

  const [search, changeSearch] = useInput();

  if (!isSuccess) return <></>;

  const num = friendList.length;

  return (
    <CreateDirectMessageModalContainer
      left={left}
      right={right}
      top={top}
      width={440}
      p={16}
    >
      <CreateDirectMesssageHeader
        value={search}
        onChange={changeSearch}
        addFriendNum={1}
      />
      <>
        {num > 0 ? (
          <ScrollableBox>
            {/* <SelectFriend />   
            <SelectFriend check /> */}
            {friendList.map((friend: FriendType) => (
              <SelectFriend check={true} status="1" />
            ))}
          </ScrollableBox>
        ) : (
          <SearchContainer>
            <SearchImage src="/search.svg" alt="" width={85} height={85} />
            <Text
              text="개인 메시지에 모든 친구가 포함되어 있어요."
              color="auth-desc"
              center
            />
          </SearchContainer>
        )}
      </>
      <CreateDirectMesssageFooter />
    </CreateDirectMessageModalContainer>
  );
};

const CreateDirectMessageModalContainer = styled(
  DefaultModal
)<CreateDirectMessageModalProps>`
  border-radius: 0.25rem;
  position: absolute;
  z-index: 9;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  right: ${({ right }) => right}px;
  box-shadow: 0 0 0.3125rem ${({ theme }) => theme.backgroundColor.tab1};
`;

const SearchContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const SearchImage = styled.img`
  margin-bottom: 20px;
`;

export default CreateDirectMessageModal;
