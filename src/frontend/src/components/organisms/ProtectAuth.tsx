import { COOKIE_KEY } from "@configs/cookie";
import { ReactElement } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

interface ProtectAuthProps {
  children: ReactElement;
}

const ProtectAuth = ({ children }: ProtectAuthProps) => {
  const [cookies] = useCookies([COOKIE_KEY]);

  return <>{cookies[COOKIE_KEY] ? <Navigate replace to="/@me" /> : children}</>;
};

export default ProtectAuth;
