import styled from "styled-components";
import { Divider } from "../atoms/Div/Divider.stories";
import ServerImage from "../atoms/Div/ServerImage";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ServerList = () => {
  const [array, setArray] = useState([
    { id: "1", title: "공부" },
    { id: "2", title: "헬스" },
    { id: "3", title: "독서" },
    { id: "4", title: "산책" },
    { id: "5", title: "요리" },
  ]);
  // const array = [
  //   { id: "1", title: "공부" },
  //   { id: "2", title: "헬스" },
  //   { id: "3", title: "독서" },
  //   { id: "4", title: "산책" },
  //   { id: "5", title: "요리" },
  // ];

  // const navigate = useNavigate();
  // const onMain = () => {
  //   navigate("/@me");
  // };
  // const onServer = (v: Number) => {
  //   navigate("/:" + v);
  // };

  const handleChange = (result: any) => {
    if (!result.destination) return;
    const items = [...array];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setArray(items);
  };

  return (
    <BarContainer>
      <DragDropContext onDragEnd={handleChange}>
        <Droppable droppableId="servers">
          {(provided) => (
            <ul
              className="servers"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              ...
              <Divider />
              {array &&
                array.map(({ id, title }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          onClick={() => console.log({ index })}
                        >
                          <ServerImage
                            avatarHeight={3}
                            avatarWidth={3}
                            name="서버1"
                            id={index}
                          />
                        </li>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
              ...
            </ul>
          )}
        </Droppable>
      </DragDropContext>
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
