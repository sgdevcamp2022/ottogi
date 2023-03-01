import { useQuery } from "@tanstack/react-query";
import serverApi from "@api/server";

const useGetCategoryList = ({ communityId }: any) => {
  return useQuery(["category", { communityId }], serverApi.getChannel);
};

export default useGetCategoryList;
