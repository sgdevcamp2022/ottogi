import { UserInfoType } from "@store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import friendApi from "@api/friend";

const useGetFriendList = (userInfo: UserInfoType) => {
  return useQuery(
    [
      "friendList",
      { email: userInfo?.email, accessToken: userInfo?.accessToken },
    ],
    friendApi.getAll
  );
};

export default useGetFriendList;
