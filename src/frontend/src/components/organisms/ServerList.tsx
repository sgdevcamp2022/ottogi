import styled from "styled-components";
import { Divider } from "../atoms/Div/Divider.stories";
import ServerImage from "../atoms/Div/ServerImage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ServerList = () => {
  const array: Number[] = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  const onMain = () => {
    navigate("/@me");
  };
  const onServer = (v: Number) => {
    navigate("/" + v);
  };
  return (
    <BarContainer>
      <ul>
        <li onClick={onMain}>
          <ServerImage name="메인" id={0} />
        </li>
        <Divider />
        {array &&
          array.map((v, index) => {
            return (
              <li onClick={() => onServer(v)}>
                <ServerImage name="서버1" id={v} />
              </li>
            );
          })}
        <li onClick={onMain}>
          <ServerImage name="서버 추가" id={array.length + 1} />
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
