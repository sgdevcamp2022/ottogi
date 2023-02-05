import styled from "styled-components";
import Banner from "../atoms/Div/Banner";
import CardUserInfo from "../molecules/Div/CardUserInfo";
import FieldList from "../molecules/Div/FieldList";

const AccountCard = () => {
  return (
    <Card>
      <Banner />
      <CardUserInfo />
      <FieldWrapper>
        <FieldList />
      </FieldWrapper>
    </Card>
  );
};

export default AccountCard;

const Card = styled.div`
  width: 660px;
  height: auto;
  background-color: ${({ theme }) => theme.backgroundColor["voice-nobody"]};
  box-sizing: border-box;
  padding-bottom: 0.5px;
  border-radius: 0 0 0.25rem 0.25rem;
  position: relative;
`;

const FieldWrapper = styled.div`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.backgroundColor["tab2"]};
  padding: 16px;
  margin: 8px 16px 16px;
  box-sizing: border-box;
`;
