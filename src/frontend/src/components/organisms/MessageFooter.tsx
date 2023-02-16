import FileUploadModal from "@components/molecules/Div/FileUploadeModal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MessageBox from "../molecules/Div/MessageBox";

const MessageFooter = () => {
  const { serverId: isServer } = useParams();
  const [value, setValue] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const onChange = (v: string) => setValue(v);

  return (
    <MessageFooterContainer isServer={!!isServer}>
      <MessageBox
        value={value}
        onChange={onChange}
        onClick={() => setShowUploadModal((prev) => !prev)}
        nickname="허다은"
      />
      {showUploadModal && <FileUploadModal />}
    </MessageFooterContainer>
  );
};

const MessageFooterContainer = styled.div<{ isServer: boolean }>`
  position: relative;
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
