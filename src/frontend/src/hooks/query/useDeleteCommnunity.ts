import { useMutation, useQuery } from "@tanstack/react-query";
import serverSettingApi from "@api/serverSetting";

const useDeleteCommunity = () => {
  return useMutation(serverSettingApi.delete);
};

export default useDeleteCommunity;
