import Router from "./routes/router";
import { Cookies, withCookies } from "react-cookie";
import useLogout from "@hooks/query/useLogout";

export const cookies = new Cookies();

function App() {
  const { mutate: logout } = useLogout();

  const handleLogout = async () => {
    document.onkeydown = (event: KeyboardEvent) => {
      if (
        (event.metaKey && (event.code === "KeyR" || event.code === "F5")) ||
        event.code === "F5"
      ) {
        return;
      }

      logout();
    };
  };

  window.onbeforeunload = handleLogout;

  return <Router />;
}

export default withCookies(App);
