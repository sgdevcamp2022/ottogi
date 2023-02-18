import styled from "styled-components";
import { Divider } from "../atoms/Div/Divider.stories";
import ServerImage from "../atoms/Div/ServerImage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@components/atoms/Icons/AddIcon";
import useGetServerList from "@hooks/query/useGetServerList";
import { useUserStore } from "@store/useUserStore";

const ServerList = () => {
  const [userId, setUserId] = useState<Number>();

  const { userInfo, accessToken } = useUserStore();
  setUserId(userInfo.id);
  const res = useGetServerList({ userId, accessToken });
  // setUserId(4);
  const GetList = () => {
    console.log(res);
    return res;
  };

  const onList = () => {
    console.log(GetList());
  };

  const array: Number[] = [1, 2, 3, 4, 5];
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
          <ServerImage avatarHeight={3} avatarWidth={3} name="메인" id={0} />
        </li>
        <Divider />
        {array &&
          array.map((v, index) => {
            return (
              <li onClick={() => onServer(v)}>
                <ServerImage
                  avatarHeight={3}
                  avatarWidth={3}
                  name="서버1"
                  id={v}
                />
              </li>
            );
          })}
        <li onClick={onCreateServer}>
          <ServerImage
            avatarHeight={3}
            avatarWidth={3}
            name=""
            id={array.length + 1}
          >
            <AddIcon />
          </ServerImage>
        </li>
        <li onClick={onList}>
          <ServerImage
            avatarHeight={3}
            avatarWidth={3}
            name=""
            id={array.length + 2}
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
