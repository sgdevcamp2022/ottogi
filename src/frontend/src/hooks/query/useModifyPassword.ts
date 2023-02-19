import { useMutation } from "@tanstack/react-query";
import userSettingApi from "@api/userSetting";

const useModifyPassword = () => {
  return useMutation(userSettingApi.modifyPassword);
};

export default useModifyPassword;
