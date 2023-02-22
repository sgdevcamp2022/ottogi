import { useMutation } from "@tanstack/react-query";
import serverSettingApi from "@api/server";

const useCreateCommunity = () => {
  return useMutation(serverSettingApi.create);
};

export default useCreateCommunity;
