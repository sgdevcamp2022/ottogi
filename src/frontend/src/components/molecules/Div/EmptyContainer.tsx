import Text from "@components/atoms/Text/Text";
import { flexCenter } from "@styles/flexCenter";
import styled from "styled-components";
import addFriend from "../../../assets/images/addFriend.svg";
import sleep from "../../../assets/images/sleep.svg";
import waiting from "../../../assets/images/waiting.svg";

interface EmptyContainerProps {
  text: string;
  image: "addFriend" | "sleep" | "waiting";
}

const getImage = {
  addFriend: addFriend,
  sleep: sleep,
  waiting: waiting,
};

const EmptyContainer = ({ text, image }: EmptyContainerProps) => {
  const img = getImage[image];

  return (
    <Empty>
      <img src={img} alt="" />
      <Text text={text} color="auth-desc" />
    </Empty>
  );
};

const Empty = styled.div`
  height: 100%;
  ${flexCenter}
  flex-direction: column;
  gap: 2.5rem;
  margin-top: 25vh;
`;

export default EmptyContainer;
