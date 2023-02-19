import Text from "../atoms/Text/Text";
import SettingWrapper from "./SettingWrapper";
import { Divider } from "@mui/material";
import styled from "styled-components";
import LogoImage from "../atoms/Div/LogoImage";

const SeverSettingMember = () => {
  return (
    <SettingWrapper>
      <Text
        text={"서버 멤버"}
        color="white"
        fontWeight="bold"
        fontSize="xl"
        mb={20}
      />
      <Text text={"멤버 총 x명"} color="setting-tab" fontSize="sm" mb={20} />
      <Divider sx={{ borderColor: "#96989D93", opacity: 0.5, mt: 1, mb: 1 }} />
      <Member>
        <LogoImage height={3} width={3} onClick={() => console.log(1)} />
        <Text text={"김현우"} color="white" fontSize="sm" />
      </Member>
    </SettingWrapper>
  );
};

export default SeverSettingMember;

const Member = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor.divider}; ;
`;

const Mini = styled.div`
  display: flex;
  flex-direction: column;
`;
