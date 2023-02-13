import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/atoms/Div/PageContainer";
import HeaderHelmet from "../components/atoms/Helmet";
import ServerPage from "../components/templates/ServerPage";
import useMainStore from "../store/useMainStore";

const Server = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderHelmet title="• Discord | 친구" />
      <PageContainer>
        <ServerPage />
      </PageContainer>
    </>
  );
};

export default Server;
