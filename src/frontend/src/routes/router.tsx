import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Verify from "../pages/Verify";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;