import { useMutation } from "@tanstack/react-query";
import userSettingApi from "@api/userSetting";

const useDeleteUser = () => {
  return useMutation(userSettingApi.deleteUser);
};

export default useDeleteUser;
