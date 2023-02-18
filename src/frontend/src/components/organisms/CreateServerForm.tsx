import styled from "styled-components";
import ServerModal from "./WhiteModal";
import CreateServerText from "../molecules/Text/CreateServerText";
import ServerLogoUpload from "../molecules/Button/ServerLogoUpload";
import DefaultButton from "../atoms/Button/DefaultButton";
import useInput from "@hooks/common/useInput";
import DefaultInput from "@components/atoms/Input/DefaultInput";
import { useMutation } from "@tanstack/react-query";
import serverSettingApi from "@api/serverSetting";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@store/useUserStore";
import { useState } from "react";

const CreateServerForm = () => {
  const { userInfo, accessToken } = useUserStore();
  const navigate = useNavigate();
  let formData = new FormData();
  const [name, changeName] = useInput();
  const [nickName, setNickName] = useState(userInfo.name);
  const { mutate: createServer } = useMutation(serverSettingApi.create, {
    onSuccess: () => {
      navigate(-1);
    },
  });
  formData.append("communityName", name);
  formData.append("img", "");
  formData.append("userId", "4");
  formData.append(
    "profile",
    JSON.stringify({ userName: nickName, img: null, 한줄소개: "한줄소개" })
  );
  console.log(formData);

  return (
    <ServerModal width={440}>
      <ServerContainer>
        <CreateServerText />
        <ServerLogoUpload />
        <DefaultInput value={name} onChange={changeName} type="text" />
        <Bottom>
          <DefaultButton
            text="만들기"
            onClick={() =>
              // createServer({
              //   accessToken,
              //   communityName: name,
              //   img: null,
              //   userId: 4,
              //   profile: {
              //     userName: { nickName },
              //     img: null,
              //     한줄소개: "한줄소개",
              //   },
              // })
              createServer({ formData, accessToken })
            }
          />
        </Bottom>
      </ServerContainer>
    </ServerModal>
  );
};

export default CreateServerForm;

const ServerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Bottom = styled.div`
  width: 100%;
  height: 4rem;
  margin-top: 4rem;
  background-color: ${({ theme }) => theme.backgroundColor["grey-7"]};
`;
