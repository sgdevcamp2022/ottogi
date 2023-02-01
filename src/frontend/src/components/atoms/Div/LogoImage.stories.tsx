import DivLogoImage from "./LogoImage";
import { action } from "@storybook/addon-actions";

export default {
  title: "atoms/div",
  component: DivLogoImage,
};

export const LogoImage = () => <DivLogoImage onClick={action("clicked")} />;
