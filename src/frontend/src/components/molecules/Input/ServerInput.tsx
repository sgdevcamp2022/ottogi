import Text from "../../atoms/Text/Text";
import DefaultInput from "../../atoms/Input/DefaultInput";
import styled from "styled-components";
import { useState } from "react";

const ServerInput = () => {
  const [text, setText] = useState("");
  return (
    <ServerInputContainer>
      <Text
        text="서버 이름"
        color="setting-tab"
        fontSize="xs"
        mb={10}
        fontWeight="bold"
      />
      <DefaultInput
        value={text}
        onChange={({ target: { value } }) => setText(value)}
        backgroundColor="server-input"
        fontSize="base"
        color="black"
      />
      {/* <input
        value={text}
        onChange={({ target: { value } }) => setText(value)}
      /> */}
    </ServerInputContainer>
  );
};
export default ServerInput;

const ServerInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: left;
  flex-direction: column;
  input {
    height: 2.5em;
    padding: 1rem;
    border-radius: 0.3rem;
    flex: 1;
    font-size: ${({ theme }) => theme.fontSize.base};
    border: none;
    box-sizing: border-box;
    color: ${({ theme }) => theme.color["white"]};
    background-color: ${({ theme }) => theme.backgroundColor["voice-nobody"]};
    &:focus {
      outline: none;
    }
    ::placeholder {
      color: ${({ theme }) => theme.color["grey-2"]};
    }
  }
`;
