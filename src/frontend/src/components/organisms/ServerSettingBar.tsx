import styled from "styled-components";
import Text from "../atoms/Text/Text";
import SettingButton from "../atoms/Button/SettingButton";

const ServerSettingBar = () => {
  return (
    <BarContainer>
      <Header>
        <Text text="사용자 설정" fontSize="xs" color="grey-2" mb={6} fontWeight="bold" />
      </Header>
      <ul>
        <li>
          <SettingButton text="내 계정" color="grey-4" onClick={() => console.log(1)} backgroundColor="grey-2" />
        </li>
        <li>
          <SettingButton text="프로필" color="grey-4" onClick={() => console.log(1)} backgroundColor="grey-2" />
        </li>
        <li>
          <SettingButton text="알림" color="grey-4" onClick={() => console.log(1)} backgroundColor="grey-2" />
        </li>
        <li>
          <SettingButton text="로그아웃" color="grey-4" onClick={() => console.log(1)} backgroundColor="grey-2" />
        </li>
      </ul>
    </BarContainer>
  );
};

export default ServerSettingBar;

const BarContainer = styled.div`
  width: 12rem;
  height: 67.5rem;
  padding: 60px 6px 60px 20px;
  background-color: ${({ theme }) => theme.backgroundColor["grey-2"]};
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
