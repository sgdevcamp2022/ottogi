import { useParams } from "react-router-dom";
import styled from "styled-components";
import useInput from "../../hooks/common/useInput";
import MessageBox from "../molecules/Div/MessageBox";

const MessageFooter = () => {
  const { serverId: isServer } = useParams();

  const [value, onChange] = useInput();
  console.log(value);
  return (
    <MessageFooterContainer isServer={!!isServer}>
      <MessageBox
        value={value}
        onChange={onChange}
        onClick={() => {}}
        nickname="허다은"
      />
    </MessageFooterContainer>
  );
};

const MessageFooterContainer = styled.div<{ isServer: boolean }>`
  background-color: ${({ theme }) => theme.backgroundColor.tab3};
  width: ${({ isServer }) =>
    isServer ? "calc(100vw - 19.6875rem)" : "calc(100vw - 41.875rem)"};
  position: absolute;
  bottom: 0;
  padding: 0 1rem 1.5rem 1rem;
  @media (max-width: 75rem) {
    width: calc(100vw - 19.6875rem);
  }
`;

export default MessageFooter;
