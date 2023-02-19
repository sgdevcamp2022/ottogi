import styled from "styled-components";

const TabDivider = () => {
  return <Divider />;
};

const Divider = styled.div`
  width: 100%;
  height: 0.0938rem;
  /* margin-bottom: 0.5rem; */
  background-color: ${({ theme }) => theme.backgroundColor["user-tab"]};
`;

export default TabDivider;
