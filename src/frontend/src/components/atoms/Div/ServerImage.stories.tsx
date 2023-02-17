import DivServerImage from "./ServerImage";
import { action } from "@storybook/addon-actions";
import AddIcon from "../Icons/AddIcon";

export default {
  title: "atoms/div",
  component: DivServerImage,
};

export const ServerImage = () => (
  <DivServerImage avatarHeight={3} avatarWidth={3} id={3} name="서버1">
    <AddIcon />
  </DivServerImage>
);
