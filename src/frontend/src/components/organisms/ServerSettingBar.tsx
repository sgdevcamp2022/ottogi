import styled from "styled-components";
import Text from "../atoms/Text/Text";
import ServerSettingButton from "../atoms/Button/ServerSettingButton copy";

const ServerSettingBar = () => {
  return (
    <BarContainer>
      <Header>
        <Text
          text="개별 서버 방 이름"
          fontSize="xs"
          color="msg-hover"
          mb={6}
          fontWeight="bold"
        />
      </Header>
      <ul>
        <li>
          <ServerSettingButton
            status={"일반"}
            text="일반"
            backgroundColor="voice-icon"
            onClick={() => console.log(1)}
          />
        </li>
        <li>
          <ServerSettingButton
            text="멤버"
            status={"멤버"}
            backgroundColor="voice-icon"
            onClick={() => console.log(1)}
          />
        </li>
        <li>
          <ServerSettingButton
            text="초대"
            status={"초대"}
            backgroundColor="voice-icon"
            onClick={() => console.log(1)}
          />
        </li>
        {/* 
        <Divider
          sx={{ borderColor: "#96989D93", opacity: 0.5, mr: 1, mt: 1, mb: 2 }}
        /> */}
      </ul>
    </BarContainer>
  );
};

export default ServerSettingBar;

const BarContainer = styled.div`
  width: 12rem;
  height: 67.5rem;
  padding: 60px 6px 60px 20px;
  background-color: ${({ theme }) => theme.backgroundColor["voice-icon"]};
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
  }
  li {
    width: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
  }
`;

const Header = styled.div`
  width: 100%;
  padding: 0px 6px;
`;
