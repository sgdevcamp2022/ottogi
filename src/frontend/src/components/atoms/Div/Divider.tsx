import styled from "styled-components";

const Divider = () => {
  return <DividerContainer />;
};

const DividerContainer = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.backgroundColor.border};
`;

export default Divider;
