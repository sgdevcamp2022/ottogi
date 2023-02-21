import { useMutation } from "@tanstack/react-query";
import userSettingApi from "@api/userSetting";

const useCreateCommunity = () => {
  return useMutation(userSettingApi.modifyImage);
};

export default useCreateCommunity;
