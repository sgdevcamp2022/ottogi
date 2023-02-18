import { useMutation } from "@tanstack/react-query";
import userSettingApi from "@api/userSetting";

const useCommunityUpdate = () => {
  return useMutation(userSettingApi.communityUpdate);
};

export default useCommunityUpdate;
