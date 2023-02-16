import { MouseEventHandler } from "react";
import styled from "styled-components";
import { BackgroundColorType, ColorType } from "@styles/theme";
import useServerSetStore, { ServerSettingType } from "@store/useServerSetStore";

interface SettingButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  fontWeight?: "normal" | "bold";
  color?: ColorType;
  backgroundColor?: BackgroundColorType;
  disabled?: boolean;
  status: ServerSettingType;
}

const ServerSettingButton = ({
  text,
  onClick,
  fontWeight = "normal",
  color = "white",
  backgroundColor = "primary",
  disabled = false,
  status,
}: SettingButtonProps) => {
  const { setStatus, setSettingStatus } = useServerSetStore(
    ({ setStatus, setSettingStatus }) => ({
      setStatus,
      setSettingStatus,
    })
  );

  const getColor = (status: ServerSettingType) => {
    return status === setStatus ? "white" : "tab3-header";
  };

  const getBackgroundColor = (status: ServerSettingType) => {
    return status === setStatus ? "active" : "trans";
  };

  const changeUserStatus = (mainStatus: ServerSettingType) => {
    setSettingStatus(mainStatus);
  };
  return (
    <SettingButtonContainer
      onClick={() => changeUserStatus(status)}
      fontWeight={fontWeight}
      color={getColor(status)}
      backgroundColor={getBackgroundColor(status)}
    >
      {text}
    </SettingButtonContainer>
  );
};

export const SettingButtonContainer = styled.button<
  Pick<SettingButtonProps, "color" | "backgroundColor" | "fontWeight">
>`
  margin-bottom: 4px;
  text-align: left;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 16px;
  padding: 6px;
  box-sizing: border-box;
  color: ${({ theme, color }) => theme.color[color]};
  background-color: ${({ theme, backgroundColor }) =>
    theme.backgroundColor[backgroundColor]};
  font-weight: ${({ fontWeight }) => fontWeight};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.color["white"]};
    background-color: ${({ theme }) => theme.backgroundColor["setting"]};
  }
`;

export default ServerSettingButton;
