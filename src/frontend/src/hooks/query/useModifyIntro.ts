import { useMutation } from "@tanstack/react-query";
import userSettingApi from "@api/userSetting";

const useModifyIntro = () => {
  return useMutation(userSettingApi.modifyIntro);
};

export default useModifyIntro;
