import React, { useState } from "react";
// internal
import bg from "@assets/img/cta/13/cta-bg-1.jpg";

const ShopCta = () => {
  // handleSubmit
  const[value,setvalue]=useState()
  const handleSubmit = e => {
    e.preventDefault();
    console.log(value)
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
                    <input type="email" onChange= { event => setvalue(event.target.value)} placeholder="Enter Your Email" />
                    <button onClick={handleSubmit} className="tp-btn">
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
