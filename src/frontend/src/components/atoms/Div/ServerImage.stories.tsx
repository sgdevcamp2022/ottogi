import DivServerImage from "./ServerImage";
import { action } from "@storybook/addon-actions";

export default {
  title: "atoms/div",
  component: DivServerImage,
};

export const ServerImage = () => (
  <DivServerImage onMouseover={action("hover")} onClick={action("clicked")} />
);
