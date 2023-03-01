import styled from "styled-components";
import Text from "@components/atoms/Text/Text";
import DefaultInput from "@components/atoms/Input/DefaultInput";
import useInput from "@hooks/common/useInput";

const ServerInput = ({ name, changeName }: any) => {
  // setCommunityName(name);
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
        value={name}
        type="text"
        onChange={changeName}
        backgroundColor="server-input"
        fontSize="base"
        color="black"
      />
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
