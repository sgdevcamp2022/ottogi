import MainPage from "@components/templates/MainPage";
import HeaderHelmet from "@components/atoms/Helmet";
import PageContainer from "@components/atoms/Div/PageContainer";
import { useMatch, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import authApi from "@api/auth";
import { useCookies } from "react-cookie";
import { useUserStore } from "@store/useUserStore";
import { COOKIE_KEY } from "@configs/cookie";

const Main = () => {
  const navigate = useNavigate();
  const isMain = useMatch("/");
  const [cookies, setCookie, removeCookie] = useCookies([COOKIE_KEY]);
  const { resetUser } = useUserStore();

  useEffect(() => {
    if (isMain) {
      navigate("/@me");
    }
  }, []);

  return (
    <>
      <HeaderHelmet title="Discord | 친구" />
      <PageContainer>
        <MainPage />
      </PageContainer>
    </>
  );
};

export default Main;
