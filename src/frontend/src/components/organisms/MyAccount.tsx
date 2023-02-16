import Text from "../atoms/Text/Text";
import AccountCard from "./AccountCard";
import SettingWrapper from "./SettingWrapper";
import { Divider } from "@mui/material";
import FieldButton from "../atoms/Button/fieldButton";
import styled from "styled-components";
import useDeleteUser from "@hooks/query/useDeleteUser";

const MyAccount = () => {
  const { mutate: deleteUser } = useDeleteUser();
  return (
    <SettingWrapper>
      <>
        <Text
          text={"내 계정"}
          color="white"
          fontWeight="bold"
          fontSize="xl"
          mb={20}
        />
        <AccountCard />
        <Divider
          sx={{ borderColor: "#96989D93", opacity: 0.5, mr: 9, mt: 5, mb: 5 }}
        />
        {/* <Text
          text="비밀번호"
          color="white"
          fontWeight="bold"
          fontSize="xl"
          mb={20}
        />
        <ButtonWrappper>
          <FieldButton
            text="비밀번호 변경하기"
            onClick={() => console.log(1)}
            fontWeight="bold"
          />
        </ButtonWrappper>
        <Divider
          sx={{ borderColor: "#96989D93", opacity: 0.5, mr: 9, mt: 5, mb: 5 }}
        /> */}
        <Text
          text={"계정 삭제하기"}
          color="setting-tab"
          fontSize="xs"
          mb={10}
        />
        <ButtonWrappper2>
          <FieldButton
            text="계정 삭제하기"
            onClick={() => deleteUser()}
            backgroundColor="voice-hangup"
            fontWeight="bold"
          />
        </ButtonWrappper2>
      </>
    </SettingWrapper>
  );
};

export default MyAccount;

const ButtonWrappper = styled.div`
  width: 10em;
  height: 2rem;
`;

const ButtonWrappper2 = styled.div`
  width: 7.5rem;
  height: 2rem;
`;
