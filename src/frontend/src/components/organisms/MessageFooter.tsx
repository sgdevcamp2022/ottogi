import FileUploadModal from "@components/molecules/Div/FileUploadeModal";
import useSendToStore from "@store/useSendToStore";
import { Dispatch, SetStateAction, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MessageBox from "../molecules/Div/MessageBox";

interface MessageFooterProps {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  addChatMessage: () => void;
}

const MessageFooter = ({
  message,
  setMessage,
  addChatMessage,
}: MessageFooterProps) => {
  const { serverId } = useParams();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { sendTo } = useSendToStore();

  const onChange = (v: string) => {
    // enter 누르면 onClick처리
    setMessage(v);
  };

  return (
    <MessageFooterContainer isServer={!!serverId}>
      <MessageBox
        value={message}
        onChange={onChange}
        onClick={() => setShowUploadModal((prev) => !prev)}
        nickname={sendTo}
        addChatMessage={addChatMessage}
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
