import styled from "styled-components";
import DefaultInput from "../../atoms/Input/DefaultInput";

const SearchButton = () => {
  return (
    <SearchButtonContainer>
      <DefaultInput
        type="text"
        placeholder="대화 찾기 또는 시작하기"
        value=""
        onChange={() => null}
      />
    </SearchButtonContainer>
  );
};

const SearchButtonContainer = styled.div`
  width: 100%;
  height: 1.75rem;
  input {
    cursor: pointer;
  }
`;

export default SearchButton;
