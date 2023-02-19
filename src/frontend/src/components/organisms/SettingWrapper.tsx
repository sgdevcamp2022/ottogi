import styled from "styled-components";

//modal 이랑은 일단 달라서
const SettingWrapper = styled.div`
  /* width: 100%; */
  min-width: 740px;
  height: 67.5rem;
  background-color: ${({ theme }) => theme.backgroundColor["tab3"]};
  padding: 3.75rem 2.5rem 5rem;
`;

export default SettingWrapper;
