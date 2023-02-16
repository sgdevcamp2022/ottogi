import ButtonWrapper from "./ButtonWrapper";

export default {
  title: "atoms/Button",
  component: ButtonWrapper,
};

export const Wrapper = () => (
  <ButtonWrapper onClick={() => console.log(1)}>
    <>test text</>
  </ButtonWrapper>
);
