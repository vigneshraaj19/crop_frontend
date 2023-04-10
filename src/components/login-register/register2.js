import React,{useState,useRef} from "react";
import Link from "next/link";
// internal
import Shapes from "./shapes";
import RegisterForm from "@components/forms/register-form";

const RegisterCont=()=>{
    const registerBox1=useRef();
    const registerBox2=useRef();
    const registerBox3=useRef();
    const registerBox4=useRef();
    const [boxDiv,setBoxDiv]=useState("");
    const [btnText,setBtnText]=useState("Next");

    function nextPage(event){
        if(boxDiv==""){
            registerBox1.current.style.left="-1000px";
            registerBox2.current.style.left="0px";
            setBoxDiv("registerBox2");
        }
        else if(boxDiv=="registerBox2"){
            registerBox2.current.style.left="-1000px";
            registerBox3.current.style.left="0px";
            setBoxDiv("registerBox3");
        }
        else if(boxDiv=="registerBox3"){
            registerBox3.current.style.left="-1000px";
            registerBox4.current.style.left="0px";
            setBoxDiv("registerBox4");
            setBtnText("Submit")
        }
    }

    return(
        <section className="login__area pt-110 pb-110">
        <div className="container">
          <div className="login__inner p-relative z-index-1">
            <Shapes />
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div className="login__wrapper">
                  <div className="login__top mb-30 text-center">
                    <h3 className="login__title">Register Now!</h3>
                    <p>You can signup with you social account below</p>
                  </div>
                  <div className="login__form">
                    {/* register form start */}
                    <div className="registerDiv">
                        <div ref={registerBox1} className="registerBox1">
                            <div className="mobileNumInp">
                                <select>
                                    <option>+91</option>
                                    <option>+41</option>
                                </select>
                                <input className="phnoInp" type="text" placeholder="Enter phNo"/>
                            </div>
                            <input type="text" className="emailInp" placeholder="Enter email"/>
                        </div>
                        <div ref={registerBox2} className="registerBox2">
                            <label>Enter OTP</label>
                            <div className="verifyCodeText">
                                <input type="number"/>
                                <input type="number"/>
                                <input type="number"/>
                                <input type="number"/>
                                <input type="number"/>
                                <input type="number"/>
                            </div>
                            <span class="resendBoxDiv">Resend OTP</span>
                        </div>
                        <div ref={registerBox3} className="registerBox3">
                            <input type="text" placeholder="Enter FirstName"/>
                            <input type="text" placeholder="Enter LastName"/>
                            <div className="promoDiv">
                                <label>Promo if any?</label>
                                <input type="number"/>
                            </div>
                            <div className="termsandcond">
                                <input type="checkbox"/>
                                <label>By clicking on Sign Up I agree to the Terms & Conditions of CROPs</label>
                            </div>
                            <div className="termsandcond">
                                <input type="checkbox"/>
                                <label>I would like to receive important notifications, reminders and updates</label>
                            </div>
                        </div>
                        <div ref={registerBox4} className="registerBox4">
                            <div className="pinTextDiv">
                                <label>Enter Pin</label>
                                <div className="pinTextInp">
                                    <input type="number"/>
                                    <input type="number"/>
                                    <input type="number"/>
                                    <input type="number"/>
                                </div>
                            </div>

                            <div className="pinTextDiv">
                                <label>Confirm Pin</label>
                                <div className="pinTextInp">
                                    <input type="number"/>
                                    <input type="number"/>
                                    <input type="number"/>
                                    <input type="number"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="RegisterBtn" onClick={nextPage}>{btnText}</button>
                    {/* register form end */}
                    {/* <div className="login__register-now">
                      <p>
                        Already have an account? <Link href="/login">Log in</Link>
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default RegisterCont;