import { useMutation } from "@tanstack/react-query";
import userSettingApi from "@api/userSetting";

const useModifyName = () => {
  return useMutation(userSettingApi.modifyName);
};

export default useModifyName;
