import Router from "./routes/router";
import { Cookies, withCookies } from "react-cookie";

export const cookies = new Cookies();

function App() {
  return <Router />;
}

export default withCookies(App);
