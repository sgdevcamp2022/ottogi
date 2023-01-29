import DivAlert from "./Alert";

export default {
  title: "atoms/Div",
  component: DivAlert,
};

export const Alert = () => (
  <DivAlert text="정말 GDSC KNU 2-Frontend Study 3팀 채널을 삭제하시겠어요? 삭제된 채널은 복구할 수 없어요." />
);
