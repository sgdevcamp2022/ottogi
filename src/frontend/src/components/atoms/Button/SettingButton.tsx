import { MouseEventHandler } from "react";
import styled from "styled-components";
import { BackgroundColorType, ColorType } from "@styles/theme";
import useUserSetStore, { UserSettingType } from "@store/useUserSetStore";

interface SettingButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  fontWeight?: "normal" | "bold";
  color?: ColorType;
  backgroundColor?: BackgroundColorType;
  disabled?: boolean;
  status: UserSettingType;
}

const SettingButton = ({
  text,
  onClick,
  fontWeight = "normal",
  disabled = false,
  status,
  backgroundColor,
}: SettingButtonProps) => {
  const { userStatus, userSettingStatus } = useUserSetStore(
    ({ userStatus, userSettingStatus }) => ({
      userStatus,
      userSettingStatus,
    })
  );

  const getColor = (status: UserSettingType) => {
    return status === userStatus ? "white" : "tab3-header";
  };

  // const getHoverColor = (status: UserSettingType) => {
  //   return status === userStatus ? "white" : "icon";
  // };

  const getBackgroundColor = (status: UserSettingType) => {
    return status === userStatus ? "active" : "trans";
  };

  // const getHoverBackgroundColor = () => {
  //   return "active";
  // };

  const changeUserStatus = (mainStatus: UserSettingType) => {
    userSettingStatus(mainStatus);
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

export default SettingButton;
