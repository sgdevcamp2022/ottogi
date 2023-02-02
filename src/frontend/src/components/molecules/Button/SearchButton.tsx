import styled from "styled-components";
import DefaultInput from "../../atoms/Input/DefaultInput";

const SearchButton = () => {
  return (
    <SearchButtonContainer>
      <DefaultInput placeholder="대화 찾기 또는 시작하기" value="" onChange={() => null} />
    </SearchButtonContainer>
  );
};

const SearchButtonContainer = styled.div`
  input {
    cursor: pointer;
  }
`;

export default SearchButton;
