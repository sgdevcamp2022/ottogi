import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/atoms/Div/PageContainer";
import HeaderHelmet from "../components/atoms/Helmet";
import MainPage from "../components/templates/MainPage";
import useMainStore from "../store/useMainStore";

const Main = () => {
  const navigate = useNavigate();
  const { mainTab } = useMainStore(({ mainTab }) => ({ mainTab }));

  useEffect(() => {
    if (mainTab === "친구") {
      return navigate("/");
    }
    return navigate(`/${mainTab}`);
  }, []);

  return (
    <>
      <HeaderHelmet title="• Discord | 친구" />
      <PageContainer>
        <MainPage />
      </PageContainer>
    </>
  );
};

export default Main;
