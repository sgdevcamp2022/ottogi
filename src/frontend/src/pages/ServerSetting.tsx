import styled from "styled-components";
import ServerSettingBar from "../components/organisms/ServerSettingBar";
import ServerSettingMember from "../components/organisms/ServerSettingMember";
import useServerSetStore, {
  ServerSettingType,
} from "../store/useServerSetStore";
import ServerSettingDefault from "../components/organisms/ServerSettingDefault";
import ServerSettingInvite from "../components/organisms/ServerSettingInvite";

const serverComponent = {
  일반: ServerSettingDefault,
  멤버: ServerSettingMember,
  초대: ServerSettingInvite,
};

const getStatus = (status: ServerSettingType) => {
  const Component = serverComponent[status];
  return <Component />;
};

const ServerSetting = () => {
  const { setStatus, setSettingStatus } = useServerSetStore(
    ({ setStatus, setSettingStatus }) => ({
      setStatus,
      setSettingStatus,
    })
  );
  return (
    <SettingBox>
      <Side>
        <ServerSettingBar />
      </Side>
      <Container>
        {/* <SeverSettingMember />
         */}
        {getStatus(setStatus)}
      </Container>
    </SettingBox>
  );
};

export default ServerSetting;

const SettingBox = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: row;
  background-color: ${({ theme }) => theme.backgroundColor["voice-icon"]};
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 800px;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.backgroundColor["tab3"]};
`;
const Side = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-end;
`;
