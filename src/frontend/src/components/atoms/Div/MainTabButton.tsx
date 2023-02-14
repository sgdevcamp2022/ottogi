import { useNavigate } from "react-router-dom";
import useMainStore, { MainStatusType } from "@store/useMainStore";
import TextButton from "../Button/TextButton";

interface MainTabButtonProps {
  status: MainStatusType;
}

const MainTabButton = ({ status }: MainTabButtonProps) => {
  const navigate = useNavigate();
  const { mainStatus, setMainStatus } = useMainStore(
    ({ mainStatus, setMainStatus }) => ({ mainStatus, setMainStatus })
  );

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
    navigate("/@me");
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
