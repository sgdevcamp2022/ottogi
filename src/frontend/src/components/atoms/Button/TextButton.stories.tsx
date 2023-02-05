import TextButton from "./TextButton";

export default {
  title: "atoms/Button",
  component: TextButton,
};

export const Text = () => (
  <TextButton
    text="온라인"
    color="white"
    backgroundColor="black"
    onClick={() => console.log(1)}
  />
);
