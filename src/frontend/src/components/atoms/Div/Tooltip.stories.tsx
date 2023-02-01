import DivTooltip from "./Tooltip";

export default {
  title: "atoms/div",
  component: DivTooltip,
};

export const Tooltip = () => (
  <DivTooltip place="bottom" title="test">
    <button>hello</button>
  </DivTooltip>
);
