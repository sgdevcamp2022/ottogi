import { useMutation } from "@tanstack/react-query";
import serverSettingApi from "@api/server";

const useDeleteCommunity = () => {
  return useMutation(serverSettingApi.delete);
};

export default useDeleteCommunity;
