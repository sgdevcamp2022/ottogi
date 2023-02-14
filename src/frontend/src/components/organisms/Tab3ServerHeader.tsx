import useInput from "@hooks/common/useInput";
import { useState } from "react";
import styled from "styled-components";
import TabDivider from "../atoms/Div/TabDivider";
import NotificationsIcon from "../atoms/Icons/NotificationsIcon";
import TagIcon from "../atoms/Icons/TagIcon";
import Text from "../atoms/Text/Text";
import NotificationModal from "../molecules/Div/NotificationModal";
import SearchInput from "../molecules/Input/SearchInput";

const Tab3ServerHeader = () => {
  const chatroomName = "test";
  const [value, onChange] = useInput();
  const [showNotiModal, setShowNotiModal] = useState(false);
  return (
    <>
      <Tab3ServerHeaderContainer>
        <HeaderLeftWrapper>
          <TagIcon />
          <Text text={chatroomName} color="white" />
        </HeaderLeftWrapper>
        <HeaderRightWrapper>
          <div onClick={() => setShowNotiModal(!showNotiModal)}>
            <NotificationsIcon />
          </div>
          {showNotiModal && <NotificationModal />}
          <SearchInputWrapper>
            <SearchInput size="s" value={value} onChange={onChange} />
          </SearchInputWrapper>
        </HeaderRightWrapper>
      </Tab3ServerHeaderContainer>
      <TabDivider />
    </>
  );
};

const Tab3ServerHeaderContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 99;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  svg {
    font-size: ${({ theme }) => theme.fontSize.xxl};
    color: ${({ theme }) => theme.color.icon};
  }
`;

const HeaderLeftWrapper = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const HeaderRightWrapper = styled.div`
  margin-right: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  svg {
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.color.white};
    }
  }
`;

const SearchInputWrapper = styled.div`
  width: 9rem;
`;

export default Tab3ServerHeader;
