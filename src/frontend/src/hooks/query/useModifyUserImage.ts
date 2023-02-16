import { useMutation, useQuery } from "@tanstack/react-query";
import userSettingApi from "@api/userSetting";

const useModifyUserImage = () => {
  return useMutation(userSettingApi.modifyImage);
};

export default useModifyUserImage;
