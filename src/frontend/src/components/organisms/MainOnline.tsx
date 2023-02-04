import styled from "styled-components";
import useInput from "../../hooks/common/useInput";
import BigSearchInputBox from "../molecules/Div/BigSearchInputBox";
import EmptyContainer from "../molecules/Div/EmptyContainer";
import FriendBox from "../molecules/Div/FriendBox";
import ScrollableBox from "../molecules/Div/scrollableBox";
import LabelText from "../molecules/Text/LabelText";

const MainOnline = () => {
  const num = 10;
  const [value, onChangeValue] = useInput();
  return (
    <MainOnlineContainer>
      {num > 0 ? (
        <>
          <BigSearchInputBox value={value} onChange={onChangeValue} />
          <LabelText label={"온라인"} num={num} />
          <ScrollableBox>
            <>
              {new Array(num).fill(null).map((v, idx) => (
                <FriendBox id={idx} name="nno3onn" />
              ))}
            </>
          </ScrollableBox>
        </>
      ) : (
        <EmptyContainer image="sleep" text="아무도 Ottogi와 놀고 싶지 않은가 봐요." />
      )}
    </MainOnlineContainer>
  );
};

const MainOnlineContainer = styled.div``;

export default MainOnline;
