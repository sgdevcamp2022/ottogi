import { useState } from "react";
import SearchInput from "./SearchInput";

export default {
  title: "molecules/Input",
  component: SearchInput,
};

export const Search = () => {
  const [value, setValue] = useState("");
  return <SearchInput size="m" value={value} onChange={({ target: { value } }) => setValue(value)} />;
};
