import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const CouponForm = ({ handleCouponCode, couponRef }) => {
  const { coupon_info } = useSelector((state) =>
  (state.coupon
  )
  );
  console.log(coupon_info)
  // const dispatch = useDispatch();

  // const handleClick = () => {
  //   dispatch(coupon_info);
  // };

  return (
    <form onSubmit={handleCouponCode}>
      {coupon_info?.couponCode ? (
        <p>coupon applied</p>
      ) : (
        <p className="checkout-coupon">
          <input ref={couponRef} type="text" placeholder="Coupon Code" />
          <button className="tp-btn" type="submit">
            Apply Coupon
          </button>
        </p>
      )}
    </form>
  );
};

export default CouponForm;
