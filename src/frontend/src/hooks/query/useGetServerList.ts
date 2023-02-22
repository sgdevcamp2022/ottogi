import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import serverSettingApi from "@api/server";

const useGetServerList = ({ userId }: any) => {
  const [list, setList] = useState([]);
  const { data: res } = useQuery(
    ["ServerList", { userId }],
    serverSettingApi.getList
  );

  useEffect(() => {
    if (!res) return;

    const List = (res as any)?.data.data[0].split("},") || [];
    if (List[0] === "") {
      return setList([]);
    }

    const parsedData: any = [];
    if (List.length > 0) {
      for (let i = 0; i < List?.length; i++) {
        if (i !== List.length - 1) {
          parsedData.push(JSON.parse(List[i] + "}"));
        } else {
          parsedData.push(JSON.parse(List[i]));
        }
      }
    }

    setList(parsedData);
  }, [res]);

  return { list };
};

export default useGetServerList;
