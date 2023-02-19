import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface ProtectAuthProps {
  children: ReactElement;
}

const ProtectPage = ({ children }: ProtectAuthProps) => {
  const accessToken = sessionStorage.getItem("accessToken");

  return <>{accessToken ? children : <Navigate replace to="/login" />}</>;
};

export default ProtectPage;
