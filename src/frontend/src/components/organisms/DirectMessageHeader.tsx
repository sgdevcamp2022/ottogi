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
  name: string;
  status: StateType;
}

const DirectMessageHeader = ({ name, status }: DirectMessageHeaderProps) => {
  const [search, onChangeSearch] = useInput();

  return (
    <DirectMessageHeaderContainer>
      <LeftContainer>
        <AtIconWrapper>
          <AtIcon />
        </AtIconWrapper>
        <Text text={name} color="white" />
        <Status status={status} fontSize="14px" />
      </LeftContainer>
      <RightContainer>
        <ButtonWrapper>
          <CallWifiIcon />
        </ButtonWrapper>
        <ButtonWrapper>
          <VideocamIcon />
        </ButtonWrapper>
        <ButtonWrapper>
          <SearchInput size="s" value={search} onChange={onChangeSearch} />
        </ButtonWrapper>
      </RightContainer>
    </DirectMessageHeaderContainer>
  );
};

const DirectMessageHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;

const AtIconWrapper = styled.div`
  color: ${({ theme }) => theme.color.icon};
  margin-top: -0.25rem;
`;

const LeftContainer = styled.div`
  padding-top: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 0.375rem;
`;

const RightContainer = styled.div`
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
