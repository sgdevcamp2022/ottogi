import styled from "styled-components";
import useMainStore from "../../../store/useMainStore";
import ButtonWrapper from "../../atoms/Button/ButtonWrapper";
import PersonIcon from "../../atoms/Icons/PersonIcon";
import Text from "../../atoms/Text/Text";

const FriendButton = () => {
  const { mainTab, setMainTab } = useMainStore(({ mainTab, setMainTab }) => ({ mainTab, setMainTab }));
  return (
    <ButtonWrapper active={mainTab === "친구"} onClick={() => setMainTab("친구")} height={42}>
      <FriendButtonContainer>
        <PersonIcon />
        <Text text="친구" color={mainTab === "친구" ? "white" : "inactive"} />
      </FriendButtonContainer>
    </ButtonWrapper>
  );
};

const FriendButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export default FriendButton;
