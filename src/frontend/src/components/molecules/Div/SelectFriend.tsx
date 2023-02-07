import styled from "styled-components";
import ButtonWrapper from "../../atoms/Button/ButtonWrapper";
import CheckboxOffIcon from "../../atoms/Icons/CheckboxOffIcon";
import CheckboxOnIcon from "../../atoms/Icons/CheckboxOnIcon";
import Text from "../../atoms/Text/Text";
import UserState32 from "./UserState32";

interface SelectFriendProps {
  check?: boolean;
}

const SelectFriend = ({ check = false }: SelectFriendProps) => {
  return (
    <ButtonWrapper onClick={() => null}>
      <SelectFriendContainer>
        <UserState32 />
        <UserNameWrapper>
          <Text text="name" />
        </UserNameWrapper>
        {check ? <CheckboxOnIcon /> : <CheckboxOffIcon />}
      </SelectFriendContainer>
    </ButtonWrapper>
  );
};

const SelectFriendContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  gap: 12px;
`;

const UserNameWrapper = styled.div`
  flex: 1;
`;

export default SelectFriend;
