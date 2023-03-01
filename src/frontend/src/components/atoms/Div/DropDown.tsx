import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import styled from "styled-components";

const DropDown = () => {
  const [server, setServer] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setServer(event.target.value as string);
  };

  return (
    <StyledFormControl>
      <Select
        value={server}
        onChange={handleChange}
        sx={{ color: "white", display: "flex", flexDirection: "row" }}
      >
        <StyledItem value={10}>Ten</StyledItem>
        <StyledItem value={20}>Twenty</StyledItem>
        <StyledItem value={30}>Thirty</StyledItem>
      </Select>
    </StyledFormControl>
  );
};

const StyledFormControl = styled(FormControl)`
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor["tab1"]};
  color: ${({ theme }) => theme.color["white"]};
  margin-bottom: 1rem;
`;

const StyledItem = styled(MenuItem)`
  background-color: ${({ theme }) => theme.backgroundColor["setting-tab"]};
  color: ${({ theme }) => theme.color["white"]};
  display: flex;
`;

export default DropDown;
