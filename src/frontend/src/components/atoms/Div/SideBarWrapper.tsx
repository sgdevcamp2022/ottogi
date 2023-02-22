import { ReactElement } from "react";
import styled from "styled-components";
import useGetFriendList from "@hooks/query/useGetFriendList";
import { useUserStore } from "@store/useUserStore";
import Text from "../Text/Text";
import NobodyActive from "./NobodyActive";

interface SideBarProps {
  children: ReactElement;
}

const SideBar = ({ children }: SideBarProps) => {
  const {
    userInfo: { email },
  } = useUserStore();
  const { data } = useGetFriendList(email);

  if (!data) return <></>;

  return (
    <SideBarContainer>
      <Text
        text="현재 활동 중"
        fontSize="xl"
        color="white"
        fontWeight="bold"
        mb={16}
      />
      <NobodyActive />
      {/* {data ? <>{children}</> : <NobodyActive />} */}
    </SideBarContainer>
  );
};

const SideBarContainer = styled.div`
  padding-top: 0.5rem;
  width: 22.375rem;
  padding: 1rem 0.5rem 1rem 1rem;
  margin-left: 0.125rem;
  border-left: 1px solid ${({ theme }) => theme.borderColor.divider};
  @media (max-width: 75rem) {
    display: none;
  }
`;

export default SideBar;
