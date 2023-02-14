import ArrowBottomIcon from "@components/atoms/Icons/ArrowBottomIcon";
import Text from "@components/atoms/Text/Text";
import styled from "styled-components";

interface ServerLabelProps {
  text: string;
}

const ServerLabel = ({ text }: ServerLabelProps) => {
  return (
    <ServerLabelContainer>
      <ArrowBottomIcon />
      <Text text={text} fontSize="xs" fontWeight="bold" />
    </ServerLabelContainer>
  );
};

const ServerLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding-top: 1rem;
  padding-left: 0.25rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.color.inactive};
  svg {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
  &:hover {
    color: ${({ theme }) => theme.color.white};
  }
`;

export default ServerLabel;
