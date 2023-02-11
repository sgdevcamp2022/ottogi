import styled from "styled-components";
import useInput from "../../hooks/common/useInput";
import MessageBox from "../molecules/Div/MessageBox";

const MessageFooter = () => {
  const [value, onChange] = useInput();
  console.log(value);
  return (
    <MessageFooterContainer>
      <MessageBox
        value={value}
        onChange={onChange}
        onClick={() => {}}
        nickname="허다은"
      />
    </MessageFooterContainer>
  );
};

const MessageFooterContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.tab3};
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 0 16px 24px 16px;
`;

export default MessageFooter;
