import DefaultButton from "@components/atoms/Button/DefaultButton";
import DefaultInput from "@components/atoms/Input/DefaultInput";
import Text from "@components/atoms/Text/Text";
import useRequestFriend from "@hooks/query/useRequestFriend";
import { useUserStore } from "@store/useUserStore";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const InviteInput = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userInfo } = useUserStore();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("default");
  const { mutate: requestFriend } = useRequestFriend({
    onError: () => {
      setEmail("");
      setStatus("danger");
    },
    onSuccess: () => {
      setEmail("");
      setStatus("success");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["friendList"] });
    },
  });

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setEmail(value);
    if (status !== "default") {
      setStatus("default");
    }
  };

  const inviteFriend = () => {
    if (!userInfo) navigate("/login");
    requestFriend({ email });
  };

  return (
    <>
      <InviteInputContainer borderColor={status}>
        <DefaultInput
          maxLength={37}
          placeholder="사용자 이메일 입력"
          value={email}
          type="email"
          onChange={onChange}
          fontSize="base"
          backgroundColor="trans"
        />
        <DefaultButton
          disabled={email === "" ? true : false}
          text="친구 요청 보내기"
          onClick={inviteFriend}
          height={32}
          width={130}
          fontSize="sm"
        />
      </InviteInputContainer>
      {status === "success" && (
        <Text
          text={`${email}에게 성공적으로 친구 요청을 보냈어요.`}
          color="invite-success"
        />
      )}
      {status === "danger" && (
        <Text
          text="음, 안되네요. 이메일이 정확한지 다시 한 번 확인해주세요."
          color="invite-danger"
        />
      )}
    </>
  );
};

const InviteInputContainer = styled.label<{ borderColor: any }>`
  width: 100%;
  height: 3.125rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor.tab1};
  border-radius: 0.5rem;
  border: 2px solid
    ${({ theme, borderColor }) => theme.borderColor[borderColor]};
  padding: 0 0.75rem 0 0.125rem;
  margin-bottom: 0.5rem;

  &:has(input:focus) {
    border-color: ${({ theme, borderColor }) =>
      borderColor === "default"
        ? theme.borderColor.focus
        : theme.borderColor[borderColor]};
  }
`;

export default InviteInput;
