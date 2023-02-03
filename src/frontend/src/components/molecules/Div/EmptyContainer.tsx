import styled from "styled-components";
import { flexCenter } from "../../../styles/flexCenter";
import Text from "../../atoms/Text/Text";

interface EmptyContainerProps {
  text: string;
  image: string;
}

const EmptyContainer = ({ text, image }: EmptyContainerProps) => {
  return (
    <Empty>
      <img src={`${image}.svg`} alt="" />
      <Text text={text} color="auth-desc" />
    </Empty>
  );
};

const Empty = styled.div`
  ${flexCenter}
  flex-direction: column;
  gap: 2.5rem;
  flex: 1;
`;

export default EmptyContainer;
