import Text from "@components/atoms/Text/Text";
import { flexCenter } from "@styles/flexCenter";
import styled from "styled-components";

interface EmptyContainerProps {
  text: string;
  image: string;
}

const EmptyContainer = ({ text, image }: EmptyContainerProps) => {
  return (
    <Empty>
      <img src={`@assets/images/${image}.svg`} alt="" />
      <Text text={text} color="auth-desc" />
    </Empty>
  );
};

const Empty = styled.div`
  height: 100%;
  ${flexCenter}
  flex-direction: column;
  gap: 2.5rem;
`;

export default EmptyContainer;
