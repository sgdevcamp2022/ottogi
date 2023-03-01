import { useMutation, useQuery } from "@tanstack/react-query";
import userSettingApi from "@api/userSetting";

const useModifyUserImage = (options: any) => {
  return useMutation(userSettingApi.modifyImage, options);
};

export default useModifyUserImage;
