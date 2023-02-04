import styled from "styled-components";
import useInput from "../../hooks/common/useInput";
import useMainStore from "../../store/useMainStore";
import DefaultButton from "../atoms/Button/DefaultButton";
import BigSearchInputBox from "../molecules/Div/BigSearchInputBox";
import EmptyContainer from "../molecules/Div/EmptyContainer";
import FriendBox from "../molecules/Div/FriendBox";
import LabelText from "../molecules/Text/LabelText";

const MainTotal = () => {
  const { setMainStatus } = useMainStore(({ setMainStatus }) => ({ setMainStatus }));
  const num = 0;
  const [value, onChangeValue] = useInput();
  return (
    <MainTotalContainer>
      {num > 0 ? (
        <>
          <BigSearchInputBox value={value} onChange={onChangeValue} />
          <LabelText label={"모든 친구"} num={num} />
          {new Array(num).fill(null).map((v, idx) => (
            <FriendBox id={idx} username="nno3onn" />
          ))}
        </>
      ) : (
        <>
          <EmptyContainer image="addFriend" text="Ottogi는 친구를 기다리고 있어요." />
          <ButtonWrapper>
            <DefaultButton text="친구 추가하기" onClick={() => setMainStatus("친구 추가하기")} height={38} width={110} fontSize="sm" />
          </ButtonWrapper>
        </>
      )}
    </MainTotalContainer>
  );
};

const MainTotalContainer = styled.div``;

const SearchInputContainer = styled.div`
  padding: 0 0.5rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
`;

export default MainTotal;
