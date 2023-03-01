import DivLogoImage from "./LogoImage";
import { action } from "@storybook/addon-actions";

export default {
  title: "atoms/div",
  component: DivLogoImage,
};

export const LogoImage = () => (
  <DivLogoImage height={3} width={3} onClick={action("clicked")} />
);
