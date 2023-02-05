import styled from "styled-components";

interface WrapperProps {
  children: React.ReactElement;
}
//modal 이랑은 일단 달라서 이렇게 만들어둠.
const SettingWrapper = ({ children }: WrapperProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default SettingWrapper;

const Wrapper = styled.div`
  /* width: 100%; */
  min-width: 740px;
  height: 67.5rem;
  background-color: ${({ theme }) => theme.backgroundColor["tab3"]};
  padding: 3.75rem 2.5rem 5rem;
`;
