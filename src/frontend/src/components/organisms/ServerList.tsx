import styled from "styled-components";
import { Divider } from "../atoms/Div/Divider.stories";
import ServerImage from "../atoms/Div/ServerImage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@components/atoms/Icons/AddIcon";
import useGetServerList from "@hooks/query/useGetServerList";
import { useUserStore } from "@store/useUserStore";

interface community {
  img: string;
  community_id: Number;
  name: string;
}

const ServerList = () => {
  // const [userId, setUserId] = useState<Number>();
  const navigate = useNavigate();
  const [data, setData] = useState<community[]>([]);
  const { userInfo, accessToken } = useUserStore();
  const { data: res, isLoading } = useGetServerList({
    userId: userInfo.id,
    accessToken,
  });
  const [num, setNum] = useState<Number>();
  const onMain = () => {
    navigate("/@me");
  };
  const onServer = (v: Number) => {
    setNum(v);
    navigate("/" + v);
  };
  const onCreateServer = () => {
    navigate("/CreateServer");
  };

  // console.log(res);
  // console.log(res?.data.data);
  // if (isLoading) {
  //   return <></>;
  // }
  const List = res?.data.data[0].split("},");
  // console.log(List);
  if (data.length < List?.length) {
    for (let i = 0; i < List?.length; i++) {
      if (i !== List.length - 1) {
        data.push(JSON.parse(List[i] + "}"));
      } else {
        data.push(JSON.parse(List[i]));
      }
    }
  }
  // useEffect(() => {
  //   console.log(res);
  //   console.log("hello");

  // }, [data, List]);

  // if (!res?.data) return <></>;

  return (
    <BarContainer>
      <ul>
        <li onClick={onMain}>
          <ServerImage
            avatarHeight={3}
            avatarWidth={3}
            name="메인"
            id={10000}
          />
        </li>
        <Divider />
        {!isLoading &&
          data.map((v: any) => {
            return (
              <li onClick={() => onServer(v.community_id)}>
                <ServerImage
                  avatarHeight={3}
                  avatarWidth={3}
                  name={v.name}
                  // name="name"
                  id={v.community_id}
                  // id={1}
                />
              </li>
            );
          })}
        <li onClick={onCreateServer}>
          <ServerImage avatarHeight={3} avatarWidth={3} name="" id={10001}>
            <AddIcon />
          </ServerImage>
        </li>
      </ul>
    </BarContainer>
  );
};

export default ServerList;

const BarContainer = styled.div`
  width: 4.5rem;
  height: 67.5rem;
  display: flex;
  flex-direction: column;
  padding-top: 0.75rem;
  background-color: ${({ theme }) => theme.backgroundColor.tab1};
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
  }
  li {
    width: 100%;
    display: flex;
    position: relative;
    padding: 0;
    left: 0;
  }
`;
