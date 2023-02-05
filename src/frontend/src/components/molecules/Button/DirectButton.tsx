import styled from "styled-components";
import useMainStore from "../../../store/useMainStore";
import ButtonWrapper from "../../atoms/Button/ButtonWrapper";
import Text from "../../atoms/Text/Text";
import UserState, { StateType } from "../Div/UserState32";

interface DirectButtonProps {
  id: number;
  name: string;
  active?: boolean;
  status?: StateType;
}

const DirectButton = ({ id, name, active = false, status = "on" }: DirectButtonProps) => {
  const { mainTab, setMainTab } = useMainStore(({ mainTab, setMainTab }) => ({ mainTab, setMainTab }));

  const goChatRoom = () => {
    setMainTab(id.toString());
  };

  return (
    <ButtonWrapper active={Number(mainTab) === id} onClick={goChatRoom} height={42}>
      <DirectButtonContainer>
        <UserState status={status} />
        <Text text={name} />
      </DirectButtonContainer>
    </ButtonWrapper>
  );
};

const DirectButtonContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 0.75rem;
`;

export default DirectButton;
