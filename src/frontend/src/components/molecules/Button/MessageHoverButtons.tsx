import { useParams } from "react-router-dom";
import styled from "styled-components";
import { flexCenter } from "@styles/flexCenter";
import EditIcon from "@components/atoms/Icons/EditIcon";
import DeleteIcon from "@components/atoms/Icons/DeleteIcon";

const MessageHoverButtons = () => {
  const { serverId } = useParams();
  return (
    <MessageHoverButtonsContainer className="msg-hover" isServer={!!serverId}>
      <IconWrapper>
        <EditIcon />
      </IconWrapper>
      <IconWrapper style={{ color: "#ED4245" }}>
        <DeleteIcon />
      </IconWrapper>
    </MessageHoverButtonsContainer>
  );
};

const MessageHoverButtonsContainer = styled.div<{ isServer: boolean }>`
  display: flex;
  flex-direction: row;
  position: fixed;
  z-index: 2;
  height: 2rem;
  right: ${({ isServer }) => (isServer ? 1 : 23.125)}rem;
  visibility: hidden;
  margin-top: -1rem;
  border-radius: 0.25rem;
  border: 2px solid ${({ theme }) => theme.backgroundColor.tab2};
  background-color: ${({ theme }) => theme.backgroundColor.tab3};
  &:hover {
    box-shadow: 0px 0.0938rem 0.125rem
      ${({ theme }) => theme.backgroundColor.tab2};
  }
  @media (max-width: 1200px) {
    right: 1rem;
  }
`;

const IconWrapper = styled.div`
  ${flexCenter}
  border-radius: 4px;
  height: 100%;
  width: 2rem;
  padding: 0.25rem;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.color.icon};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.backgroundColor["msg-input"]};
  }
`;

export default MessageHoverButtons;
