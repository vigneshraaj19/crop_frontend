import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
// internal
import Menus from "./menus";
import logo from "@assets/img/logo/logo-black.png";
import { Cart, Heart, Search, User } from "@svg/index";
import useSticky from "@hooks/use-sticky";
import CartSidebar from "@components/common/sidebar/cart-sidebar";
import OffCanvas from "@components/common/off-canvas";
import useCartInfo from "@hooks/use-cart-info";
import SearchForm from "@components/forms/search-form";
import axios from "axios";

const Header = ({ style_2 = false }) => {
  ''
  const { sticky } = useSticky();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const { quantity } = useCartInfo();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user: userInfo } = useSelector((state) => state.auth);
  
 var result=localStorage.getItem("auth");
 console.log(result.accessToken)

if(userInfo)
{
  useEffect(()=>{
    const token=userInfo.token;
  axios.get(
    "http://192.168.0.254:7000/api/userdata/details",
    {headers: {
      'Authorization': `${token}`
    }}
  )
  },[userInfo])

  useEffect(()=>{     
  const croppoints=userInfo.croppoints;
  const token=userInfo.token;
  axios.put(
    "http://192.168.0.254:7000/api/userdata/levels",
    { 'croppoints': `${croppoints}`},
    {headers: {
      'Authorization': `${token}`
    }}
  )
  },[userInfo])
}

return(
    <>
      <header>
        <div className={`header__area ${style_2 ? "" : "header__transparent"}`}>
          <div
            className={`header__bottom-13 header__padding-7 header__black-3 header__bottom-border-4 ${
              style_2 ? "header__bottom-13-white" : "grey-bg-17"
            } header__sticky ${sticky ? "header-sticky" : ""}`}
            id="header-sticky">
            <div className="container-fluid">
              <div className="mega-menu-wrapper p-relative">
                <div className="row align-items-center">
                  <div className="col-xxl-1 col-xl-2 col-lg-4 col-md-4 col-sm-5 col-8" >
                    <div className="logo" >
                      <Link href="/">
                        <Image src={logo} alt="logo"  width="120" height="62"  />
                      </Link>
                    </div>                  
                  </div>
                  <div className="col-xxl-6 col-xl-7 d-none d-xl-block">
                    <div className="main-menu main-menu-13 pl-45 main-menu-ff-space">
                      <nav id="mobile-menu-3">
                        <Menus />
                      </nav>
                    </div>                    
                  </div>
                  <div className="header__action-13 d-none d-md-block">
                    
                      <ul>                       
                          {
                          // userInfo?.imageURL ? (
                          //   <li>
                          //     <Link href="/user-dashboard">
                          //       <Image
                          //         src={userInfo.imageURL}
                          //         alt="user img"
                          //         width={35}
                          //         height={35}
                          //         style={{
                          //           objectFit: "cover",
                          //           borderRadius: "50%",
                          //         }}
                          //       />
                          //     </Link>
                          //   </li>
                          // ) :
                           userInfo?.cropid
                           ? (
                            <li>
                              <Link href="/user-dashboard">
                                <div >
                                 
                                  {userInfo.cropid}
                                  {userInfo.croppoints}
                                  {userInfo.UserTier}

                                </div>
                              </Link>
                            </li>
                          ) : (
                            <li>
                              <Link href="/login">
                                <User />
                              </Link>
                            </li>
                          )}
                          <li>
                            <Link href="/wishlist">
                              <Heart />
                              <span className="tp-item-count">
                                {wishlist.length}
                              </span>
                            </Link>
                          </li>
                          <li>
                            <button
                              className="cartmini-open-btn"
                              onClick={() => setIsCartOpen(!isCartOpen)}
                            >
                              <Cart />
                              <span className="tp-item-count">{quantity}</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                  <div className=" col-lg-8 col-md-8 col-sm-7 col-4">
                    <div className="header__bottom-right-13 d-flex justify-content-end align-items-center pl-30">
                      <div className="header__hamburger ml-30 d-xl-none">
                        <button
                          onClick={() => setIsOffCanvasOpen(true)}
                          type="button"
                          className="hamburger-btn hamburger-btn-black offcanvas-open-btn">
                          <span></span>
                          <span></span>
                          <span></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* cart mini area start */}
      <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      {/* cart mini area end */}

      {/* off canvas start */}
      <OffCanvas
        isOffCanvasOpen={isOffCanvasOpen}
        setIsOffCanvasOpen={setIsOffCanvasOpen}
      />
      {/* off canvas end */}
    </>
  );
};

export default Header;
