import styled from "styled-components";

interface SpanProps {
  text: string;
}

const Span = ({ text }: SpanProps) => {
  return <SpanBlock>{text}</SpanBlock>;
};

const SpanBlock = styled.span`
  color: ${({ theme }) => theme.color["red-1"]};
`;

export default Span;
