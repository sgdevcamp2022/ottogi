import DefaultModal from "./DefaultModal";

export default {
  title: "Organisms/Modal",
  component: DefaultModal,
};

export const Modal = () => {
  return (
    <DefaultModal width={480}>
      <p>test</p>
    </DefaultModal>
  );
};
