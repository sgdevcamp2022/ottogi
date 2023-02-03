import styled from "styled-components";
import useInput from "../../hooks/common/useInput";
import FriendBox from "../molecules/Div/FriendBox";
import SearchInput from "../molecules/Input/SearchInput";
import LabelText from "../molecules/Text/LabelText";

const MainOnline = () => {
  const [value, onChangeValue] = useInput();
  return (
    <MainOnlineContainer>
      <SearchInputContainer>
        <SearchInput size="m" value={value} onChange={onChangeValue} />
      </SearchInputContainer>
      <LabelText label={"온라인"} num={10} />
      <div>
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
      </div>
    </MainOnlineContainer>
  );
};

const MainOnlineContainer = styled.div``;

const SearchInputContainer = styled.div`
  padding: 0 0.5rem;
`;

export default MainOnline;
