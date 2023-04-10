import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
// internal
import Menus from "./menus";
import logo from "@assets/img/logo/logo-black.svg"
import Heart1 from "@assets/img/logo/HEART.png";
import Heart2 from "@assets/img/logo/Group 18600.png";
import Heart3 from "@assets/img/logo/STAR.png";
import Notify from "@assets/img/logo/notify.png";
import { Cart, Heart, Search, User } from "@svg/index";
import useSticky from "@hooks/use-sticky";
import CartSidebar from "@components/common/sidebar/cart-sidebar";
import OffCanvas from "@components/common/off-canvas";
import useCartInfo from "@hooks/use-cart-info";
import SearchForm from "@components/forms/search-form";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { notifyError, notifySuccess } from "@utils/toast";
var bool = 0;
const Header = ({ style_2 = false }) => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const { sticky } = useSticky();
  const { quantity } = useCartInfo();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user: userInfo } = useSelector((state) => state.auth);
  const notify_div = useRef();
  const [notification, setnotification] = useState("")
  //  console.log(JSON.parse(result))

  if (userInfo) {

    useEffect(() => {

      const croppoints = userInfo.croppoints;
      let result = localStorage.getItem('auth');
      let tokenNew = JSON.parse(result)['accessToken'];
      if (tokenNew != undefined && tokenNew != "") {
        if (bool == 0) {
          notifySuccess("Login successfully");
          bool = 1;
        }
      }
      axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/userdata/levels`,
        { 'croppoints': `${croppoints}` },
        {
          headers: {
            'Authorization': `${tokenNew}`
          }
        }
      )
    }, [userInfo])

    useEffect(() => {
      let result = localStorage.getItem('auth');
      let tokenNew = JSON.parse(result)['accessToken'];
      axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/userdata/details`,
        {
          headers: {
            'Authorization': `${tokenNew}`
          }
        }
      ).then((item) => {
        setnotification(item.data.data.auditTrail)

        localStorage.setItem(
          "auth",
          JSON.stringify({
            accessToken: tokenNew,
            user: item.data.data,
          }));
      })
    }, [userInfo])
  }
  console.log(notification)

  const [isHovering, setIsHovering] = useState(false);
  const notifybutton = () => {
    if (isHovering === false) {
      setIsHovering(true)
    }
    else {
      setIsHovering(false)
    }
  }

  return (
    <>
      <header>
        <div className={`header__area ${style_2 ? "" : "header__transparent"}`}>
          <div
            className={`header__bottom-13 header__padding-7 header__black-3 header__bottom-border-4 ${style_2 ? "header__bottom-13-white" : "grey-bg-17"
              } header__sticky ${sticky ? "header-sticky" : ""}`}
            id="header-sticky">
            <div className="container-fluid">
              <div className="mega-menu-wrapper p-relative">
                <div className="row align-items-center">
                  <div className="col-xxl-1 col-xl-2 col-lg-4 col-md-4 col-sm-5 col-8" >
                    <div className="logo" >
                      <Link href="/">
                        <Image src={logo} alt="logo" width="120" height="62" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-xxl-7 col-xl-10 d-none d-xl-block">
                    <div className="main-menu main-menu-13 pl-45 main-menu-ff-space">
                      <nav id="mobile-menu-3">
                        <Menus />
                      </nav>
                    </div>
                    <div className="header__action-13  d-md-block" style={{ float: "right", marginTop: "-50px" }}>

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
                                <div>
                                  <Link href="/user-dashboard">
                                    <span style={{ marginRight: '30px' }}>
                                      <Image src={Heart1} width="30" height="30" style={{ marginBottom: '3px' }} />
                                      <span style={{ marginLeft: '5px' }}>{userInfo.cropid}</span>
                                    </span>
                                  </Link>
                                  <Link href="/user-dashboard">
                                    <span style={{ marginRight: '30px' }}>
                                      <Image src={Heart3} width="30" height="30" />
                                      <span style={{ marginLeft: '5px' }}>{userInfo.croppoints}</span>
                                    </span>
                                  </Link>
                                  <Link href="/user-dashboard">
                                    <span style={{ marginRight: '30px' }}>
                                      <Image src={Heart2} width="33" height="33" />
                                      <span style={{ marginLeft: '5px' }}>{userInfo.UserTier}</span>
                                    </span>
                                  </Link>

                                </div>
                              </li>
                            ) : (
                              <li>
                                {/* <span style={{paddingRight: "5%"}}> */}
                                <Link href="/login">
                                  <User />
                                </Link>
                                {/* </span> */}
                              </li>
                            )}
                          <li>
                          <Link href="/">
                            <div>
                              <div>
                                <div
                                  ref={notify_div}
                                  onClick={notifybutton}>
                                  <Image src={Notify} width="25" height="25" style={{ marginBottom: '5px' }} />
                                </div>
                                <span className="tp-item-count">
                              {notification.length}
                            </span>
                                {isHovering && (
                                  <div style={{ position: "absolute", width: "400px", height: "400px", backgroundColor: "#d1d1d1", right: "-50px", padding: "10px", margin: "10px", boxShadow: "0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",overflow: "scroll" }}>
                                    <div style={{ width: "100%" }}>
                                      <h4 style={{ textAlign: "center" }}>Notifications</h4>
                                      { notification ?  (notification.slice(0).reverse().map((item) => (
                                        <div style={{ width: "100%", backgroundColor: "white", padding: "10px", margin: "10px -2px", borderRadius: "2px" }}>
                                          <p>{item}</p>
                                        </div>
                                      ))) : (
                                        <div style={{ width: "100%", backgroundColor: "white", padding: "10px", margin: "10px -2px", borderRadius: "2px" }}>
                                        <p>No Notification received yet</p>
                                      </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        </li>
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
