import useMainStore, { MainStatusType } from "../../../store/useMainStore";
import TextButton from "../Button/TextButton";

interface MainTabButtonProps {
  status: MainStatusType;
}

const MainTabButton = ({ status }: MainTabButtonProps) => {
  const { mainStatus, setMainStatus, setMainTab } = useMainStore(({ mainStatus, setMainStatus, setMainTab }) => ({
    mainStatus,
    setMainStatus,
    setMainTab,
  }));

  const getColor = (status: MainStatusType) => {
    if (status === "친구 추가하기") {
      return status === mainStatus ? "invite-success" : "white";
    }
    return status === mainStatus ? "white" : "tab3-header";
  };

  const getHoverColor = (status: MainStatusType) => {
    if (status === "친구 추가하기") {
      return status === mainStatus ? "invite-success" : "white";
    }
    return status === mainStatus ? "white" : "icon";
  };

  const getBackgroundColor = (status: MainStatusType) => {
    if (status === "친구 추가하기") {
      return status === mainStatus ? "trans" : "add-friend";
    }
    return status === mainStatus ? "active" : "trans";
  };

  const getHoverBackgroundColor = (status: MainStatusType) => {
    if (status === "친구 추가하기") {
      return status === mainStatus ? "trans" : "add-friend";
    }
    return "active";
  };

  const changeMainStatus = (mainStatus: MainStatusType) => {
    setMainStatus(mainStatus);
    setMainTab("친구");
  };

  return (
    <TextButton
      text={status}
      color={getColor(status)}
      hoverColor={getHoverColor(status)}
      backgroundColor={getBackgroundColor(status)}
      hoverBackgroundColor={getHoverBackgroundColor(status)}
      onClick={() => changeMainStatus(status)}
    />
  );
};

export default MainTabButton;
