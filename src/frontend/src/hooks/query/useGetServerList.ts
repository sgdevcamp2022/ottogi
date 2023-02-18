import { useQuery } from "@tanstack/react-query";
import serverSettingApi from "@api/server";

const useGetServerList = ({ userId, accessToken }: any) => {
  return useQuery(
    ["ServerList", { userId, accessToken }],
    serverSettingApi.getList
  );
};

export default useGetServerList;
