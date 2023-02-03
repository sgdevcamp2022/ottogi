import styled from "styled-components";
import useInput from "../../hooks/common/useInput";
import FriendBox from "../molecules/Div/FriendBox";
import SearchInput from "../molecules/Input/SearchInput";
import LabelText from "../molecules/Text/LabelText";

const MainTotal = () => {
  const [value, onChangeValue] = useInput();
  return (
    <MainTotalContainer>
      <SearchInputContainer>
        <SearchInput size="m" value={value} onChange={onChangeValue} />
      </SearchInputContainer>
      <LabelText label={"모든 친구"} num={10} />
      <div>
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
        <FriendBox username="nno3onn" />
      </div>
    </MainTotalContainer>
  );
};

const MainTotalContainer = styled.div``;

const SearchInputContainer = styled.div`
  padding: 0 0.5rem;
`;

export default MainTotal;
