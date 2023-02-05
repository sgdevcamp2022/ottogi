import { useQuery } from "@tanstack/react-query";
import friendApi from "../../api/friend";
import { UserInfoType } from "../../store/useUserStore";

const useGetFriendList = (userInfo: UserInfoType) => {
  return useQuery(["friend", { email: userInfo?.email, accessToken: userInfo?.accessToken }], friendApi.getAll);
};

export default useGetFriendList;
