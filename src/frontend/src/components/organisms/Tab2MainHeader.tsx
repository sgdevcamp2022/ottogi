import styled from "styled-components";
import TabDivider from "../atoms/Div/TabDivider";
import SearchButton from "../molecules/Button/SearchButton";

const Tab2Header = () => {
  return (
    <Tab2HeaderContainer>
      <ButtonWrapper>
        <SearchButton />
      </ButtonWrapper>
      <TabDivider />
    </Tab2HeaderContainer>
  );
};

const Tab2HeaderContainer = styled.div`
  position: sticky;
  top: 0;
`;

const ButtonWrapper = styled.div`
  padding: 0 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 240px;
`;

export default Tab2Header;
