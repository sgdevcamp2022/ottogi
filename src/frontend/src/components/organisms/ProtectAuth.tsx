import { COOKIE_KEY } from "@configs/cookie";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { cookies } from "src/App";

interface ProtectAuthProps {
  children: ReactElement;
}

const ProtectAuth = ({ children }: ProtectAuthProps) => {
  const cookie = cookies.get(COOKIE_KEY);
  const accessToken = localStorage.getItem("accessToken");

  return (
    <>{cookie && accessToken ? <Navigate replace to="/@me" /> : children}</>
  );
};

export default ProtectAuth;
