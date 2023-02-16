import DivServerImage from "./ServerImage";
import { action } from "@storybook/addon-actions";

export default {
  title: "atoms/div",
  component: DivServerImage,
};

export const ServerImage = () => <DivServerImage id={3} name="서버1" />;
