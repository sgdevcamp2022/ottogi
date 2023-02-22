import { useMutation } from "@tanstack/react-query";
import serverSettingApi from "@api/server";

const useModifyPassword = () => {
  return useMutation(serverSettingApi.update);
};

export default useModifyPassword;
