import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Server from "../pages/Server";
import ProtectAuth from "../components/organisms/ProtectAuth";
import ProtectPage from "../components/organisms/ProtectHome";
import ServerSetting from "../pages/ServerSetting";
import UserSetting from "../pages/UserSetting";
import CreateServer from "@pages/CreateServer";
import NotFound from "@pages/NotFound";
import Home from "src/video-broadcast/home";
import BroadHome from "src/video-broadcast";

const Router = () => {
  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <ProtectPage>
            <Main />
          </ProtectPage>
        }
      />
      <Route path="/Home" element={<Home />} />
      <Route path="/broadcast/:view" element={<BroadHome />} />

      <Route
        path="/login"
        element={
          <ProtectAuth>
            <Login />
          </ProtectAuth>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectAuth>
            <Register />
          </ProtectAuth>
        }
      />

      <Route
        path={"/@me"}
        element={
          <ProtectPage>
            <Main />
          </ProtectPage>
        }
      />
      <Route
        path="/@me/:channelId"
        element={
          <ProtectPage>
            <Main />
          </ProtectPage>
        }
      />

      {/* 테스트 용으로 만들어 둔거. */}
      <Route path="/ServerSetting" element={<ServerSetting />} />
      <Route path="/UserSetting" element={<UserSetting />} />
      <Route path="/CreateServer" element={<CreateServer />} />
      {/* <Route path="/:serverId/" element={<Server />} /> */}

      <Route
        path="/:serverId"
        element={
          // <ProtectPage>
          <Server />
          // </ProtectPage>
        }
      />
      <Route
        path="/:serverId/:channelId"
        element={
          // <ProtectPage>
          <Server />
          // </ProtectPage>
        }
      />

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
