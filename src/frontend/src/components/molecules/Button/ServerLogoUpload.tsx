import CameraIcon from "@components/atoms/Icons/CameraIcon";
import ServerAddIcon from "@components/atoms/Icons/ServerAddIcon";
import Text from "@components/atoms/Text/Text";
import axios from "axios";
import { useRef, useState } from "react";
import styled from "styled-components";

const ServerLogoUpload = () => {
  const [file, setFile] = useState<File>();
  const onSelectFile = async (event: any) => {
    const junk = event.target.files[0];
    // setFile(file);
    console.log(junk);
    const convertedFile = await convertToBase64(junk);
    const s3URL = await axios.post("http://localhost:3001/upload", {
      image: convertedFile,
      imageName: junk.name,
    });
    // const reader = new FileReader();
    // reader.readAsDataURL(junk);
    // reader.onloadend = () => {
    //   setFile(reader.result);
    // };
    // Request will be sent from here in the future
  };
  const convertToBase64 = (file: Blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };
  return (
    <StyledBorder>
      <CameraIcon />
      <Text
        text={"UPLOAD"}
        color={"black"}
        fontWeight={"bold"}
        fontSize={"xs"}
      />
      <ServerAddIcon />
      <input
        type="file"
        tabIndex={0}
        onChange={onSelectFile}
        accept=".jpg,.jpeg,.png,.gif"
      />
    </StyledBorder>
  );
};

export default ServerLogoUpload;

const StyledBorder = styled.div`
  display: flex;
  justify-content: center;

  /* border 커스터마이징 안된다고 해서 만들어주는 사이트에서 들고와봄 */
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%23333' stroke-width='4' stroke-dasharray='5%2c 13' stroke-dashoffset='14' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 100px;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 80px;
  height: 80px;
  .CameraIcon {
    color: ${({ theme }) => theme.color["grey-1"]};
  }
  input {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    font-size: 0px;
  }
`;
