import styled from "styled-components";
import useInput from "../../hooks/common/useInput";
import BigSearchInputBox from "../molecules/Div/BigSearchInputBox";
import EmptyContainer from "../molecules/Div/EmptyContainer";
import FriendBox from "../molecules/Div/FriendBox";
import LabelText from "../molecules/Text/LabelText";

const MainWaiting = () => {
  const [value, onChangeValue] = useInput();
  const num = 0;
  return (
    <MainWaitingContainer>
      {num > 0 ? (
        <>
          <BigSearchInputBox value={value} onChange={onChangeValue} />
          <LabelText label={"대기 중"} num={num} />
          {new Array(num).fill(null).map((v, idx) => (
            <FriendBox id={idx} username="nno3onn" />
          ))}
        </>
      ) : (
        <EmptyContainer image="waiting" text="대기 중인 친구 요청이 없네요. 그래도 옆에 Ottogi는 있네요." />
      )}
    </MainWaitingContainer>
  );
};

const MainWaitingContainer = styled.div``;

export default MainWaiting;
