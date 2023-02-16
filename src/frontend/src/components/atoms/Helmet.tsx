import { Helmet } from "react-helmet-async";

interface HeaderHelmetProps {
  title: string;
}

const HeaderHelmet = ({ title }: HeaderHelmetProps) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default HeaderHelmet;
