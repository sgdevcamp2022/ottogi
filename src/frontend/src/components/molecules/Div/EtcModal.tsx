import styled from "styled-components";
import { ColorType, FontSizeType } from "../../../styles/theme";

const EtcModal = () => {
  return (
    <EtcModalContainer>
      <TextWrapper hoverBackgroundColor="primary" color="auth-desc">
        <Text fontSize="sm">영상 통화 시작하기</Text>
      </TextWrapper>
      <TextWrapper hoverBackgroundColor="primary" color="auth-desc">
        <Text fontSize="sm">음성 통화 시작하기</Text>
      </TextWrapper>
      <TextWrapper hoverBackgroundColor="voice-hangup" color="red">
        <Text fontSize="sm">친구 삭제하기</Text>
      </TextWrapper>
    </EtcModalContainer>
  );
};

const EtcModalContainer = styled.div`
  border-radius: 4px;
  width: 188px;
  position: absolute;
  z-index: 1;
  padding: 8px;
  left: -150px;
  background-color: ${({ theme }) => theme.backgroundColor["voice-modal"]};
`;

const TextWrapper = styled.div<{
  hoverBackgroundColor: string;
  color: ColorType;
}>`
  border-radius: 2px;
  height: 32px;
  margin: 2px 0px;
  padding: 6px 8px;
  color: ${({ theme, color }) => theme.color[color]};

  &:hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme, hoverBackgroundColor }) =>
      theme.backgroundColor[hoverBackgroundColor]};
  }
`;

const Text = styled.p<{
  fontSize: FontSizeType;
}>`
  line-height: 20px;
  font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize]};
`;

export default EtcModal;
