import styled from "styled-components";
import { BackgroundColorType } from "@styles/theme";
interface BannerProps {
  backgroundColor?: BackgroundColorType;
}

const Banner = ({ backgroundColor = "primary" }: BannerProps) => {
  return <Box backgroundColor={backgroundColor} />;
};

const Box = styled.div<{ backgroundColor: BackgroundColorType }>`
  width: 41.25rem;
  height: 6.25rem;
  min-height: 6.25rem;
  border-radius: 0.25rem 0.25rem 0 0;
  background-color: ${({ theme, backgroundColor }) =>
    theme.backgroundColor[backgroundColor]};
`;

export default Banner;
