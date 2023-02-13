import styled from "styled-components";
import FieldButton from "../../atoms/Button/fieldButton";
import Text from "../../atoms/Text/Text";
import UserState80 from "./UserState80";

const CardUserInfo = () => {
  return (
    <InfoContainer>
      <Logo>
        <UserState80 />
      </Logo>
      <NameWrapper>
        <Text text="UserName" fontSize="lg" fontWeight="bold" color="white" />
      </NameWrapper>
      <ButtonWrappper>
        <FieldButton text="사용자 프로필 편집" onClick={() => console.log(1)} />
      </ButtonWrappper>
    </InfoContainer>
  );
};

export default CardUserInfo;

const Logo = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${({ theme }) => theme.backgroundColor["voice-nobody"]};
  position: absolute;
  top: 75px;
  left: 20px;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  border-radius: 3rem;
  border: 0.25rem solid ${({ theme }) => theme.backgroundColor["voice-nobody"]}; ;
`;

const InfoContainer = styled.div`
  height: 72px;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 16px 16px 0 120px;
  background-color: ${({ theme }) => theme.backgroundColor["voice-nobody"]};
`;

const ButtonWrappper = styled.div`
  width: auto;
  height: 2rem;
`;

const NameWrapper = styled.div`
  width: auto;
  display: flex;
`;
