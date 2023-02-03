import { Helmet } from "react-helmet-async";
import MainPage from "../components/templates/MainPage";

const Main = () => {
  return (
    <>
      <Helmet>
        <title>• Discord | 친구</title>
      </Helmet>
      <MainPage />
    </>
  );
};

export default Main;
