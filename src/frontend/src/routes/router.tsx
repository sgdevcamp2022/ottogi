import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Server from "../pages/Server";
import ProtectAuth from "../components/organisms/ProtectAuth";
import ProtectPage from "../components/organisms/ProtectHome";
import NotFound from "../pages/NotFound";
import Chat from "../pages/Chat";
import ServerSetting from "../pages/ServerSetting";
import UserSetting from "../pages/UserSetting";

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
      <Route
        path={"/@me"}
        element={
          <ProtectPage>
            <Main />
          </ProtectPage>
        }
      />
      <Route
        path="/@me/:userId"
        element={
          <ProtectPage>
            <Main />
          </ProtectPage>
        }
      />
      {/* 테스트 용으로 만들어 둔거. */}
      <Route path="/ServerSetting" element={<ServerSetting />} />
      <Route path="/UserSetting" element={<UserSetting />} />
      <Route path="/:serverId" element={<Server />} />
      <Route
        path="/:serverId"
        element={
          <ProtectPage>
            <Server />
          </ProtectPage>
        }
      />
      <Route
        path="/:serverId/:chatroomId"
        element={
          <ProtectPage>
            <Server />
          </ProtectPage>
        }
      />
      <Route path="chat" element={<Chat />} />
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
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
