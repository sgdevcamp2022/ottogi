import styled from "styled-components";
import ServerModal from "./WhiteModal";
import CreateServerText from "../molecules/Text/CreateServerText";
import ServerLogoUpload from "../molecules/Button/ServerLogoUpload";
import DefaultButton from "../atoms/Button/DefaultButton";
import useInput from "@hooks/common/useInput";
import DefaultInput from "@components/atoms/Input/DefaultInput";
import { useMutation } from "@tanstack/react-query";
import serverSettingApi from "@api/server";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@store/useUserStore";
import { useState } from "react";
import BackgroundModal from "./BackgroundModal";

const CreateServerForm = () => {
  const { userInfo } = useUserStore();
  const navigate = useNavigate();
  let formData = new FormData();
  const [img, setImg] = useState<Blob | undefined>();
  const [name, changeName] = useInput();
  const [nickName, setNickName] = useState(userInfo.name);
  const { mutate: createServer } = useMutation(serverSettingApi.create, {
    onSuccess: () => {
      navigate(-1);
    },
  });

  const MakeServer = () => {
    formData.append("communityName", name);
    formData.append("userId", JSON.stringify(userInfo.id));
    if (!img) return 0;
    formData.append("img", img);
    formData.append(
      "profile",
      JSON.stringify({ userName: nickName, img: null, 한줄소개: "한줄소개" })
    );
    createServer({ formData });
    navigate(-1);
  };

  return (
    // <ServerModal width={440}>
    // <ServerContainer>
    <BackgroundModal width={440} p={0} onClick={() => null}>
      <ServerContainer>
        <CreateServerText />
        <ServerLogoUpload setImg={setImg} />
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
              MakeServer()
            }
          />
        </Bottom>
      </ServerContainer>
    </BackgroundModal>
    // {/* </ServerContainer> */}
    // </ServerModal>
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
  padding: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor["white"]};
`;

const Bottom = styled.div`
  width: 100%;
  height: 4rem;
  margin-top: 4rem;
  background-color: ${({ theme }) => theme.backgroundColor["grey-7"]};
`;
