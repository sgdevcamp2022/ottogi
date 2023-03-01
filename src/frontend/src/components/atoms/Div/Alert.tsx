import Alert from "@mui/material/Alert";
import styled from "styled-components";

interface AlertProps {
  text: string;
}

const DivAlert = ({ text }: AlertProps) => {
  return (
    // icon에 원하는 아이콘 or 값 넣으면 추가 가능, 텍스트&아이콘 추가 해서 사용 가능함.
    <StyledAlert
      sx={{ backgroundColor: "#e4ac56", borderRadius: 1.5, color: "white" }}
      icon={false}
    >
      {text}
    </StyledAlert>
  );
};

const StyledAlert = styled(Alert)`
  color: #fff;
  background-color: #e4ac56;
  border-radius: 1.5;
`;

export default DivAlert;
