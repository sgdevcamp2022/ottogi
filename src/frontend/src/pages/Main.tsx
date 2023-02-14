import MainPage from "@components/templates/MainPage";
import HeaderHelmet from "@components/atoms/Helmet";
import PageContainer from "@components/atoms/Div/PageContainer";

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
