import DirectButton from "./DirectButton";

export default {
  title: "molecules/Button",
  component: DirectButton,
};

export const Direct = () => <DirectButton id={1} username="허다은" status="empty" />;
