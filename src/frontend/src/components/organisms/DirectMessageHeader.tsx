import useInput from "@hooks/common/useInput";
import styled from "styled-components";
import Status from "../atoms/Div/Status";
import Tip from "../atoms/Div/Tooltip";
import AtIcon from "../atoms/Icons/AtIcon";
import CallWifiIcon from "../atoms/Icons/CallWifiIcon";
import VideocamIcon from "../atoms/Icons/VideocamIcon";
import Text from "../atoms/Text/Text";
import SearchInput from "../molecules/Input/SearchInput";

interface DirectMessageHeaderProps {
  name: string;
  status: "0" | "1" | "2" | "3";
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
        <Tip title="음성 통화 시작하기" place="bottom">
          <ButtonWrapper>
            <CallWifiIcon />
          </ButtonWrapper>
        </Tip>
        <Tip title="영상 통화 시작하기" place="bottom">
          <ButtonWrapper>
            <VideocamIcon />
          </ButtonWrapper>
        </Tip>
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
