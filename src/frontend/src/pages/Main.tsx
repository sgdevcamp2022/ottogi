import MainPage from "@components/templates/MainPage";
import HeaderHelmet from "@components/atoms/Helmet";
import PageContainer from "@components/atoms/Div/PageContainer";
import { useMatch, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUserSettingModalStore from "@store/useUserSettingModalStore";

const Main = () => {
  const { setUserSettingModal } = useUserSettingModalStore();
  const navigate = useNavigate();
  const isMain = useMatch("/");

  useEffect(() => {
    setUserSettingModal(false);
  }, []);

  if (isMain) {
    navigate("/@me");
  }

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
