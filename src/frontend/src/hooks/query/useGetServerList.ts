import { useQuery } from "@tanstack/react-query";
import serverSettingApi from "@api/server";

const useGetServerList = ({ userId }: any) => {
  return useQuery(["ServerList", { userId }], serverSettingApi.getList);
};

export default useGetServerList;
