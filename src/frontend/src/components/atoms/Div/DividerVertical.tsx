import styled from "styled-components";

interface DividerVerticalProps {
  mv: number;
}

const DividerVertical = ({ mv }: DividerVerticalProps) => {
  return <Divider mv={mv} />;
};

const Divider = styled.div<DividerVerticalProps>`
  width: 0.0625rem;
  height: 100%;
  margin: 0 ${({ mv }) => mv}px;
  background-color: ${({ theme }) => theme.backgroundColor.divider};
`;

export default DividerVertical;
