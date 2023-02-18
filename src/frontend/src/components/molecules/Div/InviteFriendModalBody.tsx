import Text from "@components/atoms/Text/Text";
import useInput from "@hooks/common/useInput";
import { useUserStore } from "@store/useUserStore";
import { flexCenter } from "@styles/flexCenter";
import styled from "styled-components";
import SearchInput from "../Input/SearchInput";
import InviteFriendBox from "./InviteFriendBox";
import ScrollableBox from "./scrollableBox";
import useGetFriendList from "@hooks/query/useGetFriendList";

const InviteFriendModalBody = () => {
  const [search, changeSearch] = useInput();
  const {
    userInfo: { email },
    accessToken,
  } = useUserStore();
  const { data: friendList } = useGetFriendList({ email, accessToken });

  if (!friendList) return <></>;
  const num = friendList.data.length;

  return (
    <InviteFriendModalBodyContainer>
      <SearchInputWrapper>
        <SearchInput
          size="m"
          value={search}
          onChange={changeSearch}
          placeholder="친구 찾기"
        />
      </SearchInputWrapper>
      <Divider color="tab1" />
      <FriendListContainer>
        <ScrollableBox>
          <FriendListContainer>
            {num > 0 ? (
              new Array(num).fill(null).map((v) => <InviteFriendBox />)
            ) : (
              <TextWrapper>
                <Text
                  text="검색 결과가 없어요"
                  color="auth-desc"
                  center
                  fontWeight="bold"
                />
              </TextWrapper>
            )}
          </FriendListContainer>
        </ScrollableBox>
      </FriendListContainer>
      <Divider color="tab2" />
    </InviteFriendModalBodyContainer>
  );
};

const InviteFriendModalBodyContainer = styled.div`
  padding: 0.5rem 0.5rem 0 0.5rem;
`;

const SearchInputWrapper = styled.div`
  margin-bottom: 16px;
`;

const Divider = styled.div<{ color: string }>`
  position: sticky;
  left: -1rem;
  height: 0.0625rem;
  width: 27.5rem;
  background-color: ${({ theme, color }) => theme.backgroundColor[color]};
`;

const FriendListContainer = styled.div`
  flex-direction: column;
  min-height: 5rem;
  max-height: 12.5rem;
`;

const TextWrapper = styled.div`
  ${flexCenter}
`;

export default InviteFriendModalBody;
