import React, { useState } from "react";
// internal
import bg from "@assets/img/cta/13/cta-bg-1.jpg";
import { notifyError, notifySuccess } from "@utils/toast";
import axios from "axios";

const ShopCta = () => {
  // handleSubmit

const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');
const[available,setavailable]=useState(false)

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const handleEmailChange = (e) => {
  const value = e.target.value;
  setEmail(value);
  if (value.trim() === '') {
    setEmailError('Email is required');
    setavailable(false)
  } else if (!validateEmail(value)) {
    setEmailError('Invalid email format');
    setavailable(false)
  }else if (validateEmail(value)) {
    setavailable(true)
  } else {
    setEmailError('');
  }
}

const handlesubmit=(e)=>{
  if(available===true)
  {
    axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}api/userdata/newsletter`,
      { 'email': `${email}` },
    ).then((data)=>{
      console.log(data)
    })
  }
  else
  {
    notifyError(emailError)
  }
}
  return (
    <section
      className="cta__area pt-50 pb-50 p-relative include-bg jarallax"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="container">
        <div className="cta__inner-13 white-bg">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="cta__content-13">
                <h3 className="cta__title-13">
                  Subscribe for <br />
                  Latest Trends & Offers
                </h3>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="cta__form-13">
                
                  <div className="cta__input-13">
                  <input type="email" value={email} onChange={handleEmailChange} />
                    {emailError && <div>{emailError}</div>}
                    <button onClick={handlesubmit} className="tp-btn">
                      Subscribe
                    </button>
                  </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCta;
