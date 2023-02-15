import Text from "../atoms/Text/Text";
import SettingWrapper from "./SettingWrapper";
import FieldButton from "../atoms/Button/fieldButton";
import styled from "styled-components";
import ServerInput from "../molecules/Input/ServerInput";
import ServerLogoUpload from "../molecules/Button/ServerLogoUpload";

const SeverSettingDefault = () => {
  return (
    <SettingWrapper>
      <Text
        text={"서버 개요"}
        color="white"
        fontWeight="bold"
        fontSize="xl"
        mb={20}
      />
      <Summary>
        <LeftSide>
          <Mini>
            <ServerLogoUpload />
            <Text
              text={"최소 크기: 128*128"}
              color="auth-desc"
              fontSize="xxs"
              mb={20}
            />
          </Mini>
          <Mini>
            <Text
              text={"서버 이미지 해상도는 최소 512*512를 추천해요."}
              color="auth-desc"
              fontSize="sm"
            />
            <FieldButton
              text="이미지 업로드"
              color="white"
              onClick={() => console.log(1)}
              backgroundColor="tab3"
            />
          </Mini>
        </LeftSide>
        <RightSide>
          <ServerInput />
        </RightSide>
      </Summary>
    </SettingWrapper>
  );
};

export default SeverSettingDefault;

const Summary = styled.div`
  width: 100%;
  height: auto;
  gap: 2rem;
  display: flex;
  flex-direction: row;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const Mini = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  justify-items: left;
`;
const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  height: 30%;
`;
