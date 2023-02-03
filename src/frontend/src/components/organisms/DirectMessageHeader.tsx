import styled from "styled-components";
import useInput from "../../hooks/common/useInput";
import Status from "../atoms/Div/Status";
import AtIcon from "../atoms/Icons/AtIcon";
import CallWifiIcon from "../atoms/Icons/CallWifiIcon";
import VideocamIcon from "../atoms/Icons/VideocamIcon";
import Text from "../atoms/Text/Text";
import { StateType } from "../molecules/Div/UserState32";
import SearchInput from "../molecules/Input/SearchInput";

interface DirectMessageHeaderProps {
  username: string;
  status: StateType;
}

const DirectMessageHeader = ({ username, status }: DirectMessageHeaderProps) => {
  const [search, onChangeSearch] = useInput();

  return (
    <DirectMessageHeaderContainer>
      <RightContainer>
        <AtIconWrapper>
          <AtIcon />{" "}
        </AtIconWrapper>
        <Text text={username} color="white" />
        <Status status={status} fontSize="14px" />
      </RightContainer>
      <LeftContainer>
        <ButtonWrapper>
          <CallWifiIcon />
        </ButtonWrapper>
        <ButtonWrapper>
          <VideocamIcon />
        </ButtonWrapper>
        <ButtonWrapper>
          <SearchInput size="s" value={search} onChange={onChangeSearch} />
        </ButtonWrapper>
      </LeftContainer>
    </DirectMessageHeaderContainer>
  );
};

const DirectMessageHeaderContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.tab3}; // test
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AtIconWrapper = styled.div`
  color: ${({ theme }) => theme.color.icon};
  margin-top: -0.3125rem;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.375rem;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const ButtonWrapper = styled.div`
  color: ${({ theme }) => theme.color.icon};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.white};
  }
`;

export default DirectMessageHeader;
