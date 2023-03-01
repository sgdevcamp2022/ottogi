import styled from "styled-components";
import Text from "../atoms/Text/Text";
import SettingButton from "../atoms/Button/SettingButton";
import { Divider } from "@mui/material";
import SetDefaultButton from "../atoms/Button/SetDefaultButton";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@store/useUserStore";
import { COOKIE_KEY } from "@configs/cookie";
import { cookies } from "src/App";
import useLogout from "@hooks/query/useLogout";

const ServerSettingBar = () => {
  const navigate = useNavigate();
  const { resetUser } = useUserStore();
  const { mutate: logoutUser } = useLogout();

  const logout = async () => {
    cookies.remove(COOKIE_KEY);
    localStorage.clear();
    resetUser();

    logoutUser();
    navigate("/login");
  };

  return (
    <BarContainer>
      <Header>
        <Text
          text="사용자 설정"
          fontSize="xs"
          color="msg-hover"
          mb={6}
          fontWeight="bold"
        />
      </Header>
      <ul>
        <li>
          <SettingButton
            text="내 계정"
            status={"내 계정"}
            backgroundColor="voice-icon"
            onClick={() => {
              console.log(1);
            }}
          />
        </li>
        <li>
          <SettingButton
            text="프로필"
            status={"프로필"}
            backgroundColor="voice-icon"
            onClick={() => console.log(1)}
          />
        </li>
        {/* <li>
          <SettingButton
            text="알림"
            status={"알림"}
            backgroundColor="voice-icon"
            onClick={() => console.log(1)}
          />
        </li> */}

        <Divider
          sx={{ borderColor: "#96989D93", opacity: 0.5, mr: 1, mt: 1, mb: 1 }}
        />
        <li>
          <SetDefaultButton
            text="로그아웃"
            backgroundColor="voice-icon"
            onClick={logout}
          />
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
