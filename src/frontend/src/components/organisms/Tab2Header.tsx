import styled from "styled-components";
import SearchButton from "../molecules/Button/SearchButton";

const Tab2Header = () => {
  return (
    <Tab2HeaderContainer>
      <SearchButton />
    </Tab2HeaderContainer>
  );
};

const Tab2HeaderContainer = styled.div`
  padding: 0 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
`;

export default Tab2Header;
