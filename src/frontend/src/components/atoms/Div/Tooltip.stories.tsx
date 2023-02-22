import DivTooltip from "./Tooltip";

export default {
  title: "atoms/div",
  component: DivTooltip,
};

export const Tooltip = () => (
  <DivTooltip place="right" title="test">
    <button>hello</button>
  </DivTooltip>
);
