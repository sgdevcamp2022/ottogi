import DefaultButton from "./DefaultButton";

export default {
  title: "atoms/Button",
  component: DefaultButton,
};

export const Default = () => (
  <DefaultButton text="로그인" onClick={() => console.log(1)} />
);
