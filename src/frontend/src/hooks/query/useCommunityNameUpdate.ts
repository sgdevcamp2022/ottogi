import { useMutation } from "@tanstack/react-query";
import serverSettingApi from "@api/serverSetting";

const useModifyPassword = () => {
  return useMutation(serverSettingApi.update);
};

export default useModifyPassword;
