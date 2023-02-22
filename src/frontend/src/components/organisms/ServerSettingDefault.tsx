import Text from "../atoms/Text/Text";
import SettingWrapper from "./SettingWrapper";
import FieldButton from "../atoms/Button/fieldButton";
import styled from "styled-components";
import ServerInput from "../molecules/Input/ServerInput";
import ServerLogoUpload from "../molecules/Button/ServerLogoUpload";
import { useState } from "react";
import userSettingApi from "@api/userSetting";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@mui/material";
import serverApi from "@api/server";
import { useUserStore } from "@store/useUserStore";
import { useNavigate, useParams } from "react-router-dom";
import useInput from "@hooks/common/useInput";
import useModifyServerImage from "@hooks/query/useModifyServerImage";
import useDeleteCommunity from "@hooks/query/useDeleteCommnunity";

const SeverSettingDefault = () => {
  // const [formData, setFormData] = useState<FormData>();
  let formData = new FormData();
  const { data: res, mutate: modifyImage } = useModifyServerImage();
  const [img, setImg] = useState();
  const { serverId: communityId } = useParams();
  const { userInfo } = useUserStore();
  const { data: resp, mutate: update } = useMutation(serverApi.update);
  const [name, changeName] = useInput();
  const onChangeName = () => {
    console.log(name);
    update({ communityName: name, communityId, userId: userInfo.id });
  };
  const navigate = useNavigate();
  const { mutate: deleteCommunity } = useDeleteCommunity();
  const DeleteServer = () => {
    if (!communityId) return;
    deleteCommunity({ communityId, userId: userInfo.id });
    console.log(resp);
    window.location.replace("/@me");
  };
  const changeImage = () => {
    console.log(communityId, userInfo.id);
    console.log(typeof communityId);
    console.log(typeof userInfo.id);
    if (!communityId) return;
    formData.append("communityId", communityId);
    formData.append("userId", JSON.stringify(userInfo.id));
    if (!img) return;
    formData.append("img", img);
    console.log("img", img);
    modifyImage({ formData });
    console.log("res", res);
  };
  return (
    <SettingWrapper>
      <Text
        text={"서버 개요"}
        color="white"
        fontWeight="bold"
        fontSize="xl"
        mb={20}
      />
      <Summary>
        <LeftSide>
          <Text
            text={"서버 이미지 해상도는 최소 512*512를 추천해요."}
            color="auth-desc"
            fontSize="sm"
          />
          <Text
            text={"최소 크기: 128*128"}
            color="auth-desc"
            fontSize="xxs"
            mb={20}
          />
          <Mini>
            <ServerLogoUpload setImg={setImg} />
          </Mini>
          <ButtonWrapper>
            <FieldButton text="아바타 변경하기" onClick={() => changeImage()} />
          </ButtonWrapper>
        </LeftSide>
        <RightSide></RightSide>
      </Summary>
      <ServerInput name={name} changeName={changeName} />
      <ButtonWrapper>
        <FieldButton text="서버이름 변경하기" onClick={() => onChangeName()} />
      </ButtonWrapper>
      <ButtonWrapper>
        <FieldButton
          text="서버 삭제하기"
          onClick={() => DeleteServer()}
          backgroundColor="voice-hangup"
          fontWeight="bold"
        />
      </ButtonWrapper>
    </SettingWrapper>
  );
};

export default SeverSettingDefault;

const ButtonWrapper = styled.div`
  width: 140px;
  height: 40px;
  margin-top: 0.5rem;
`;
const Summary = styled.div`
  width: 100%;
  height: auto;
  gap: 2rem;
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Mini = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
`;
const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  height: 30%;
`;
