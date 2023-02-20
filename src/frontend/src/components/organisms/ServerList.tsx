import styled from "styled-components";
import { Divider } from "../atoms/Div/Divider.stories";
import ServerImage from "../atoms/Div/ServerImage";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@components/atoms/Icons/AddIcon";
import useGetServerList from "@hooks/query/useGetServerList";
import { useUserStore } from "@store/useUserStore";
import ScrollableBox from "@components/molecules/Div/scrollableBox";

interface Community {
  img: string;
  community_id: Number;
  name: string;
}

const ServerList = () => {
  const navigate = useNavigate();
  // console.log(params !== null);
  const data = [];
  const { userInfo } = useUserStore();
  const { data: res, isSuccess } = useGetServerList({
    userId: userInfo.id,
  });
  // console.log(res);
  const onMain = () => {
    navigate("/@me");
  };
  const onServer = (v: Number) => {
    navigate("/" + v);
  };

  const onCreateServer = () => {
    navigate("/CreateServer");
  };
  const params = useParams();
  if (params === null) {
    onMain();
  }
  if (!isSuccess) {
    return (
      <BarContainer>
        <ScrollableBox>
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

            <li onClick={onCreateServer}>
              <ServerImage avatarHeight={3} avatarWidth={3} name="" id={10001}>
                <AddIcon />
              </ServerImage>
            </li>
          </ul>
        </ScrollableBox>
      </BarContainer>
    );
  }
  const List = res?.data.data[0].split("},");
  if (List.length > 0) {
    for (let i = 0; i < List?.length; i++) {
      if (i !== List.length - 1) {
        data.push(JSON.parse(List[i] + "}"));
      }
      data.push(JSON.parse(List[i]));
    }
  }
  return (
    <BarContainer>
      <ScrollableBox>
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
          {data.map((v: any) => {
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
            <ServerImage avatarHeight={3} avatarWidth={3} name="" id={10001}>
              <AddIcon />
            </ServerImage>
          </li>
        </ul>
      </ScrollableBox>
    </BarContainer>
  );
};

export default ServerList;

const BarContainer = styled.div`
  width: 4.5rem;
  height: 100%;
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
