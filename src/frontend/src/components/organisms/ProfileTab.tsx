import { useState } from "react";
import styled from "styled-components";
import ServerProfile from "./ServerProfile";
import UserProfilePage from "./UserProfilePage";
import Text from "@components/atoms/Text/Text";

// Styled-Component 라이브러리를 활용해 TabMenu 와 Desc 컴포넌트의 CSS를 구현.

export const Tab = () => {
  // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
  // const [currentTab, clickTab] = useState(0);

  // const menuArr = [
  //   { name: "사용자 프로필", content: <UserProfilePage /> },
  //   { name: "서버 프로필", content: <ServerProfile /> },
  // ];

  // const selectMenuHandler = (index: number) => {
  //   // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
  //   // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
  //   clickTab(index);
  // };

  return (
    <>
      {/* <div>
        <TabMenu>
          아래 하드코딩된 내용 대신에, map을 이용한 반복으로 코드를 수정 li
          엘리먼트의 class명의 경우 선택된 tab 은 'submenu focused', 나머지
          2개의 tab은 'submenu'
          <li className="submenu">{menuArr[0].name}</li>
          <li className="submenu">{menuArr[1].name}</li>
          <li className="submenu">{menuArr[2].name}</li>
          {menuArr.map((el, index) => (
            <li
              className={index === currentTab ? "submenu focused" : "submenu"}
              onClick={() => selectMenuHandler(index)}
            >
              {el.name}
            </li>
          ))}
        </TabMenu>
        <Desc>
          <p>{menuArr[currentTab].content}</p>
        </Desc>
      </div> */}
      <Text
        text="유저프로필"
        fontSize="base"
        color="setting-tab"
        mb={16}
        fontWeight="bold"
      />
      <UserProfilePage />
      <Text
        text="서버프로필"
        fontSize="base"
        color="setting-tab"
        mb={16}
        fontWeight="bold"
      />
      <ServerProfile />
    </>
  );
};

export default Tab;

const TabMenu = styled.ul`
  background-color: ${({ theme }) => theme.backgroundColor["tab3"]};
  color: ${({ theme }) => theme.color["setting-tab"]};
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-bottom: 16px;
  margin-top: 10px;
  border-bottom: 0.25px solid;
  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    /* justify-content: space-between;
    width: 380px;
    heigth: 30px; */
    /* width: calc(100% / 12);
     */
    padding-bottom: 1rem;
    margin-right: 1rem;
    font-size: base;
    /* transition: 0.5s; */
  }

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
    /* background-color: ${({ theme }) =>
      theme.backgroundColor["voice-nobody"]}; */
    border-bottom: 0.125rem solid
      ${({ theme }) => theme.backgroundColor["primary"]};
    color: ${({ theme }) => theme.color["white"]};
    z-index: 1;
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
  text-align: center;
`;
