import SpanText from "./SpanText";

export default {
  title: "atoms/Text",
  component: SpanText,
};

export const Span = () => <SpanText text="*" color="red" />;
