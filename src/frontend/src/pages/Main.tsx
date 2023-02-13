import PageContainer from "../components/atoms/Div/PageContainer";
import HeaderHelmet from "../components/atoms/Helmet";
import MainPage from "../components/templates/MainPage";

const Main = () => {
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
