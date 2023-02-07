import styled from "styled-components";
import TabDivider from "../atoms/Div/TabDivider";
import ArrowBottomIcon from "../atoms/Icons/ArrowBottomIcon";
import Text from "../atoms/Text/Text";

const Tab2ServerHeader = () => {
  const serverName = "test";
  return (
    <>
      <Tab2HeaderContainer>
        <Text text={serverName} color="white" />
        <ArrowBottomIcon />
      </Tab2HeaderContainer>
      <TabDivider />
    </>
  );
};

const Tab2HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  svg {
    color: ${({ theme }) => theme.color.icon};
  }
  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor.hover};
  }
`;

export default Tab2ServerHeader;
