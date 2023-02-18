import { useQuery } from "@tanstack/react-query";
import serverApi from "@api/server";

const useGetCategoryList = ({ communityId, accessToken }: any) => {
  return useQuery(
    ["category", { communityId, accessToken }],
    serverApi.getChannel
  );
};

export default useGetCategoryList;
