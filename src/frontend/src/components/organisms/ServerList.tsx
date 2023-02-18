import styled from "styled-components";
import { Divider } from "../atoms/Div/Divider.stories";
import ServerImage from "../atoms/Div/ServerImage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@components/atoms/Icons/AddIcon";
import useGetServerList from "@hooks/query/useGetServerList";
import { useUserStore } from "@store/useUserStore";

const ServerList = () => {
  interface community {
    img: string;
    community_id: Number;
    name: string;
  }
  const [userId, setUserId] = useState<Number>();
  const [data, setData] = useState<community[]>([]);

  const { userInfo, accessToken } = useUserStore();

  // setUserId(userInfo.id);
  const res = useGetServerList({ userId, accessToken });
  // setUserId(4);
  const GetList = () => {
    console.log(res);
    console.log("data", JSON.parse(res?.data?.data?.data[0]));
    setData(JSON.parse(res?.data?.data?.data[0]));
    // console.log(data?.community_id);
    return res;
  };

  const onList = () => {
    for (let i = 0; i < res?.data?.data?.data.length; i++) {
      console.log(i + ":" + res?.data?.data?.data[i]);
      data.push(JSON.parse(res?.data?.data?.data[i]));
      // setData((data) => {
      //   console.log(i + ":" + res?.data?.data?.data[i]);
      // return [...data, JSON.parse(res?.data?.data?.data[i])];
      //   data.push(JSON.parse(res?.data?.data?.data[i]));
      // });
    }
    setUserId(userInfo.id);
    // console.log(userInfo);
    console.log(GetList());
    console.log(data);
  };
  useEffect(() => {
    console.log(userInfo);
    setUserId(userInfo.id);
    console.log(res);
    for (let i = 0; i < res?.data?.data?.data.length; i++) {
      console.log(i + ":" + res?.data?.data?.data[i]);
      data.push(JSON.parse(res?.data?.data?.data[i]));
    }
  }, [userInfo.id, data]);

  const navigate = useNavigate();
  const onMain = () => {
    navigate("/@me");
  };
  const onServer = (v: Number) => {
    navigate("/" + v);
  };
  const onCreateServer = () => {
    navigate("/CreateServer");
  };
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
        {data &&
          data?.map((v, index) => {
            return (
              <li onClick={() => onServer(v.community_id)}>
                <ServerImage
                  avatarHeight={3}
                  avatarWidth={3}
                  name={v.name}
                  id={v.community_id}
                />
              </li>
            );
          })}
        <li onClick={onCreateServer}>
          <ServerImage
            avatarHeight={3}
            avatarWidth={3}
            name=""
            id={data.length + 1}
          >
            <AddIcon />
          </ServerImage>
        </li>
        <li onClick={onList}>
          <ServerImage
            avatarHeight={3}
            avatarWidth={3}
            name=""
            id={data.length + 2}
          >
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
