import { useState } from "react";
import styled from "styled-components";
import TabDivider from "../atoms/Div/TabDivider";
import ArrowBottomIcon from "../atoms/Icons/ArrowBottomIcon";
import Text from "../atoms/Text/Text";
import ServerModal from "../molecules/Div/ServerModal";

const Tab2ServerHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const serverName = "자바스크립트 스터디";
  return (
    <>
      <Tab2HeaderContainer
        showModal={showModal}
        onClick={() => setShowModal(!showModal)}
      >
        <Text text={serverName} color="white" />
        <ArrowBottomIcon />
      </Tab2HeaderContainer>
      {showModal && <ServerModal setShowModal={setShowModal} />}
      <TabDivider />
    </>
  );
};

const Tab2HeaderContainer = styled.div<{ showModal: boolean }>`
  position: sticky;
  top: 0;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background-color: ${({ theme, showModal }) =>
    theme.backgroundColor[showModal ? "hover" : "trans"]};
  svg {
    color: ${({ theme }) => theme.color.icon};
  }
  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor.hover};
  }
`;

export default Tab2ServerHeader;
