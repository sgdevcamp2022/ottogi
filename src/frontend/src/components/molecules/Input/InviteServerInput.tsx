import DefaultButton from "@components/atoms/Button/DefaultButton";
import DefaultInput from "@components/atoms/Input/DefaultInput";
import { flexCenter } from "@styles/flexCenter";
import styled from "styled-components";

interface InviteServerInput {
  url: string;
}

const InviteServerInput = ({ url }: InviteServerInput) => {
  return (
    <InviteServerInputContainer>
      <DefaultInput value={url} onChange={() => null} type="text" />
      <DefaultButton text="복사" onClick={() => null} width={75} height={32} />
    </InviteServerInputContainer>
  );
};

const InviteServerInputContainer = styled.label`
  ${flexCenter}
  background-color: ${({ theme }) => theme.backgroundColor.tab1};
  display: flex;
  flex-direction: row;
  padding: 0.25rem;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
`;

export default InviteServerInput;
