import { useQuery, useQueryClient } from "@tanstack/react-query";
import serverSettingApi from "@api/server";

const useGetServerList = ({ userId }: any) => {
  const queryClient = useQueryClient();
  return useQuery(["ServerList", { userId }], serverSettingApi.getList, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ServerList"] });
    },
  });
};

export default useGetServerList;
