import MainPage from "@components/templates/MainPage";
import HeaderHelmet from "@components/atoms/Helmet";
import PageContainer from "@components/atoms/Div/PageContainer";
import { useMatch, useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const isMain = useMatch("/");

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
