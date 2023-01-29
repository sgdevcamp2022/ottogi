import { Helmet } from "react-helmet-async";
import BigTitle from "../components/atoms/Text/BigTitle";
import AuthModal from "../components/organisms/Modal/AuthModal";

const Register = () => {
  return (
    <>
      <Helmet>
        <title>회원가입 | Discord</title>
      </Helmet>
      <AuthModal>
        <BigTitle text="회원가입" />
      </AuthModal>
    </>
  );
};

export default Register;
