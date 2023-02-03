import styled from "styled-components";
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
  border-radius: 4px;
  border-color: ${({ theme }) => theme.backgroundColor.tab2};
  background-color: ${({ theme }) => theme.backgroundColor.tab3};
  position: absolute;
  right: 1.875rem;
  height: 32px;
  margin-left: 32px;
  margin-right: 14px;
  visibility: hidden;
  margin-top: -16px;
  &:hover {
    box-shadow: 0px 1.5px 2px ${({ theme }) => theme.backgroundColor.tab2};
  }
`;

const IconWrapper = styled.div`
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
