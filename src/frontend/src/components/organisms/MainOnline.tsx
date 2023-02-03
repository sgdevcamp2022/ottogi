import styled from "styled-components";
import useInput from "../../hooks/common/useInput";
import { flexCenter } from "../../styles/flexCenter";
import Text from "../atoms/Text/Text";
import EmptyContainer from "../molecules/Div/EmptyContainer";
import FriendBox from "../molecules/Div/FriendBox";
import SearchInput from "../molecules/Input/SearchInput";
import LabelText from "../molecules/Text/LabelText";

const MainOnline = () => {
  const num = 0;
  const [value, onChangeValue] = useInput();
  return (
    <MainOnlineContainer>
      {num > 0 ? (
        <>
          <SearchInputContainer>
            <SearchInput size="m" value={value} onChange={onChangeValue} />
          </SearchInputContainer>
          <LabelText label={"온라인"} num={num} />
          <div>
            {new Array(num).fill(null).map((v) => (
              <FriendBox username="nno3onn" />
            ))}
          </div>
        </>
      ) : (
        <EmptyContainer image="sleep" text="아무도 Ottogi와 놀고 싶지 않은가 봐요." />
      )}
    </MainOnlineContainer>
  );
};

const MainOnlineContainer = styled.div``;

const SearchInputContainer = styled.div`
  padding: 0 0.5rem;
`;

export default MainOnline;
