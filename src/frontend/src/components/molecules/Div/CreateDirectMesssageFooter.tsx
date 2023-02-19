import DefaultButton from "@components/atoms/Button/DefaultButton";
import styled from "styled-components";

const CreateDirectMesssageFooter = () => {
  return (
    <CreateDirectMesssageFooterContainer>
      <DefaultButton text="DM 생성" height={38} onClick={() => null} />
    </CreateDirectMesssageFooterContainer>
  );
};

const CreateDirectMesssageFooterContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.borderColor.divider};
  padding: 16px;
`;

export default CreateDirectMesssageFooter;
