import styled from "styled-components";
import { flexCenter } from "../../../styles/flexCenter";
import DeleteIcon from "../../atoms/Icons/DeleteIcon";
import EditIcon from "../../atoms/Icons/EditIcon";

const MessageHoverButtons = () => {
  return (
    <MessageHoverButtonsContainer className="msg-hover">
      <IconWrapper>
        <EditIcon />
      </IconWrapper>
      <IconWrapper style={{ color: "#ED4245" }}>
        <DeleteIcon />
      </IconWrapper>
    </MessageHoverButtonsContainer>
  );
};

const MessageHoverButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  z-index: 2;
  right: 1rem;
  height: 32px;
  visibility: hidden;
  margin-top: -16px;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.backgroundColor.tab2};
  background-color: ${({ theme }) => theme.backgroundColor.tab3};
  &:hover {
    box-shadow: 0px 1.5px 2px ${({ theme }) => theme.backgroundColor.tab2};
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
