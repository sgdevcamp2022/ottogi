import DarkModal from "../../atoms/Div/DarkModal";
import DarkModalButton from "../Button/DarkModalButton";

const EtcModal = () => {
  return (
    <DarkModal width={188} left={-150}>
      <>
        <DarkModalButton text="영상 통화 시작하기" onClick={() => null} />
        <DarkModalButton text="음성 통화 시작하기" onClick={() => null} />
        <DarkModalButton
          text="친구 삭제하기"
          color="red"
          hoverBackgroundColor="voice-hangup"
          onClick={() => null}
        />
      </>
    </DarkModal>
  );
};

export default EtcModal;
