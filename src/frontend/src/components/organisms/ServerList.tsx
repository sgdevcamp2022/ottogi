import styled from "styled-components";
import { Divider } from "../atoms/Div/Divider.stories";
import ServerImage from "../atoms/Div/ServerImage";

const ServerList = () => {
  return (
    <BarContainer>
      <ServerImage
        onMouseover={() => console.log(1)}
        onClick={() => console.log(1)}
      />
      <Divider />
      <ul>
        <li>
          <ClickedWrapper />
          <ServerImage
            onMouseover={() => console.log(1)}
            onClick={() => console.log(1)}
          />
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
  align-items: center;
  padding-top: 0.75rem;
  background-color: ${({ theme }) => theme.backgroundColor["black"]};
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
  }
  li {
    width: 100%;
    display: flex;
    margin-bottom: 1rem;
    justify-content: center;
    position: relative;
  }
`;

const ClickedWrapper = styled.div`
  height: 40px;
  left: 0px;
  list-style-type: none;
  line-height: 16px;
  width: 8px;
  top: 0px;
  background-color: #fff;
  border-radius: 0 1rem 1rem 0;
  justify-content: flex-start;
  vertical-align: baseline;
  user-select: none;
  margin-left: -0.25rem;
  margin-top: 0.125rem;
  opacity: 1;
  position: absolute;
`;
