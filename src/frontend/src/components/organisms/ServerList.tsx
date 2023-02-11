import styled from "styled-components";
import { Divider } from "../atoms/Div/Divider.stories";
import ServerImage from "../atoms/Div/ServerImage";
import { useState } from "react";

const ServerList = () => {
  const array: Number[] = [1, 2, 3, 4, 5];
  const [isSelect, SetIsSelect] = useState(false);

  return (
    <BarContainer>
      <ul>
        <li>
          <ServerImage id={0} onClick={() => console.log(1)} />
        </li>
        <Divider />
        {array &&
          array.map((index) => {
            return (
              <li>
                <ServerImage id={index} onClick={() => console.log(1)} />
              </li>
            );
          })}
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
