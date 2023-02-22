import { useEffect } from "react";
import PageContainer from "../components/atoms/Div/PageContainer";
import HeaderHelmet from "../components/atoms/Helmet";
import ServerPage from "../components/templates/ServerPage";

const Server = () => {
  const chatroomName = "welcome";

  return (
    <>
      <HeaderHelmet title={`• Discord | ${chatroomName}`} />
      <PageContainer>
        <ServerPage />
      </PageContainer>
    </>
  );
};

export default Server;
