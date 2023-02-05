import { useUserStore } from "./../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { COOKIE_KEY } from "../configs/cookie";

const Logout = () => {
  const navigate = useNavigate();
  const [coookies, setCookie, removeCookie] = useCookies([COOKIE_KEY]);
  const { resetUserInfo } = useUserStore();

  removeCookie(COOKIE_KEY);
  resetUserInfo();
  navigate("/login");
};

export default Logout;
