import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface ProtectAuthProps {
  children: ReactElement;
}

const ProtectAuth = ({ children }: ProtectAuthProps) => {
  const accessToken = sessionStorage.getItem("accessToken");

  return <>{accessToken ? <Navigate replace to="/@me" /> : children}</>;
};

export default ProtectAuth;
