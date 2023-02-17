import Text from "../atoms/Text/Text";
import SettingWrapper from "./SettingWrapper";
import { Divider } from "@mui/material";
import styled from "styled-components";
import LogoImage from "../atoms/Div/LogoImage";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";

const SeverSettingInvite = () => {
  return (
    <SettingWrapper>
      <>
        <Text
          text={"초대"}
          color="white"
          fontWeight="bold"
          fontSize="xl"
          mb={20}
        />
        <Text
          text={"활성화된 모든 초대 링크 목록입니다. 이 중에서 취소가능합니다."}
          color="setting-tab"
          fontSize="sm"
          mb={20}
        />
        <Divider
          sx={{ borderColor: "#96989D93", opacity: 0.5, mt: 1, mb: 1 }}
        />
        <Member>
          <Mini1>
            <Text text="초대자" color="setting-tab" fontSize="xs" />
          </Mini1>
          <Mini1>
            <Text text="초대코드" color="setting-tab" fontSize="xs" />
          </Mini1>
          <Mini2>
            <Text text="사용 횟수" color="setting-tab" fontSize="xs" />
          </Mini2>
          <Mini2>
            <Text text="남은시간" color="setting-tab" fontSize="xs" />
          </Mini2>
        </Member>
        <Member>
          <Mini1>
            <LogoImage height={3} width={3} onClick={() => console.log(1)} />
            <Text text={"김현우"} color="white" fontSize="sm" />
          </Mini1>
          <Mini1>
            <Text text="초대코드" color="white" fontSize="xs" />
          </Mini1>
          <Mini2>
            <Text text="사용 횟수" color="white" fontSize="xs" />
          </Mini2>
          <Mini2>
            <Text text="남은시간" color="white" fontSize="xs" />
          </Mini2>
          <IconButton>
            <CancelButton className="Cancel" />
          </IconButton>
        </Member>
      </>
    </SettingWrapper>
  );
};

export default SeverSettingInvite;

const Member = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor.divider};
  flex-grow: 1;
  .Cancel {
    display: none;
  }
  &:hover {
    .Cancel {
      display: block;
    }
  }
`;

const Mini1 = styled.div`
  width: 35%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const Mini2 = styled.div`
  width: 15%;
`;

const CancelButton = styled(HighlightOffIcon)`
  color: ${({ theme }) => theme.color.red};
  position: absolute;
  right: 0;
  top: 0;
`;
