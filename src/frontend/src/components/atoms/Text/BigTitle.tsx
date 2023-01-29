import styled from "styled-components";

interface BigTitleProps {
  text: string;
}

const BigTitle = ({ text }: BigTitleProps) => <BigTitleBlock>{text}</BigTitleBlock>;

const BigTitleBlock = styled.h1`
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export default BigTitle;
