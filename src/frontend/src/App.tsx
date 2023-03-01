import Router from "./routes/router";
import "./App.css";
import { Cookies } from "react-cookie";

export const cookies = new Cookies();

function App() {
  return <Router />;
}

export default App;
