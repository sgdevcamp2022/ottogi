import DarkModal from "@components/atoms/Div/DarkModal";
import RadioButtonUncheckedIcon from "@components/atoms/Icons/RadioButtonUncheckedIcon";
import { RadioButtonChecked } from "@mui/icons-material";
import { useState } from "react";
import DarkModalButton from "../Button/DarkModalButton";

const NotificationModal = () => {
  const [type, setType] = useState(1);
  return (
    <DarkModal width={188} top={40} right={160}>
      <DarkModalButton
        text="카테고리 기본값 사용"
        color="auth-desc"
        onClick={() => setType(1)}
        Icon={
          type === 1 ? <RadioButtonChecked /> : <RadioButtonUncheckedIcon />
        }
      />
      <DarkModalButton
        text="모든 메시지"
        color="auth-desc"
        onClick={() => setType(2)}
        Icon={
          type === 2 ? <RadioButtonChecked /> : <RadioButtonUncheckedIcon />
        }
      />
      <DarkModalButton
        text="@mentions만"
        color="auth-desc"
        onClick={() => setType(3)}
        Icon={
          type === 3 ? <RadioButtonChecked /> : <RadioButtonUncheckedIcon />
        }
      />
      <DarkModalButton
        text="없음"
        color="auth-desc"
        onClick={() => setType(4)}
        fontSize="sm"
        Icon={
          type === 4 ? <RadioButtonChecked /> : <RadioButtonUncheckedIcon />
        }
      />
    </DarkModal>
  );
};

export default NotificationModal;
