import DarkModal from "@components/atoms/Div/DarkModal";
import UploadIcon from "@components/atoms/Icons/UploadIcon";
import Text from "@components/atoms/Text/Text";
import styled from "styled-components";

const FileUploadModal = () => {
  return (
    <DarkModal width={200} top={-60}>
      <FileUploadModalWrapper>
        <UploadIconWrapper onClick={() => null}>
          <UploadIcon />
        </UploadIconWrapper>
        <Text text="파일 업로드" fontSize="sm" />
      </FileUploadModalWrapper>
    </DarkModal>
  );
};

const UploadIconWrapper = styled.div``;

const FileUploadModalWrapper = styled.div`
  padding: 4px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.color["auth-desc"]};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.backgroundColor.primary};
  }
`;

export default FileUploadModal;
