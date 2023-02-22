import { useMutation, useQuery } from "@tanstack/react-query";
import serverApi from "@api/server";

const useModifyServerImage = () => {
  return useMutation(serverApi.modifyImage);
};

export default useModifyServerImage;
