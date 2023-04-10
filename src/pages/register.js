import SEO from "@components/seo";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import RegisterArea from "@components/login-register/register-area";
import RegisterCont from "@components/login-register/register2";

export default function Register() {
  return (
    <Wrapper>
      <SEO pageTitle={"Register"} />
      <Header style_2={true} />
      <RegisterCont/>
      {/* <RegisterArea/> */}
      <Footer/>
    </Wrapper>
  );
}
