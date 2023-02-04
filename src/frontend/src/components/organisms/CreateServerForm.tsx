import styled from "styled-components";
import ServerModal from "./WhiteModal";
import CreateServerText from "../molecules/Text/CreateServerText";
import ServerLogoUpload from "../molecules/Button/ServerLogoUpload";
import ServerInput from "../molecules/Input/ServerInput";
import DefaultButton from "../atoms/Button/DefaultButton";

const CreateServerForm = () => {
  return (
    <ServerModal width={440}>
      <ServerContainer>
        <ServerLogoUpload />
        <ServerInput />
        <Bottom>
          <DefaultButton text="만들기" onClick={() => console.log(1)} />
        </Bottom>
      </ServerContainer>
    </ServerModal>
  );
};

export default CreateServerForm;

const ServerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Bottom = styled.div`
  width: 100%;
  height: 4rem;
  margin-top: 4rem;
  background-color: ${({ theme }) => theme.backgroundColor["grey-7"]};
`;
