import { useMutation } from "@tanstack/react-query";
import serverSettingApi from "@api/serverSetting";

const useCreateCommunity = () => {
  return useMutation(serverSettingApi.create);
};

export default useCreateCommunity;
