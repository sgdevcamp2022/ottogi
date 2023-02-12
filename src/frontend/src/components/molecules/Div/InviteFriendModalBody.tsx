import styled from "styled-components";
import useInput from "../../../hooks/common/useInput";
import { flexCenter } from "../../../styles/flexCenter";
import Text from "../../atoms/Text/Text";
import SearchInput from "../Input/SearchInput";
import InviteFriendBox from "./InviteFriendBox";
import ScrollableBox from "./scrollableBox";

const InviteFriendModalBody = () => {
  const [search, changeSearch] = useInput();
  const num = 10;
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
  /* margin-top: 1rem; */
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
