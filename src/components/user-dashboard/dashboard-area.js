import React from "react";
// internal
import OrderInfo from "./order-info";
import ProfileShapes from "./profile-shapes";
import ProfileNav from './profile-nav';
import MyOrders from './my-orders';
import ChangePassword from './change-password';
import UpdateUser from './update-user';
import CropCard from './CropCard';

const DashboardArea = ({orderData}) => {
  return (
    <>
      <section className="profile__area pt-180 pb-120">
        <div className="container">
          <div className="profile__inner p-relative">
            <ProfileShapes/>
            <div className="row">
              <div className="col-xxl-4 col-lg-4">
                <ProfileNav/>
              </div>
              <div className="col-xxl-8 col-lg-8">
                <div className="profile__tab-content">
                  <div className="tab-content" id="profile-tabContent">
                    {/* dashboard  */}
                    <div
                      className="tab-pane fade show active v"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      <OrderInfo orderData={orderData}/>
                    </div>
                    {/* my order tab */}
                    <div
                      className="tab-pane fade"
                      id="nav-order"
                      role="tabpanel"
                      aria-labelledby="nav-order-tab"
                    >
                      <MyOrders orderData={orderData} />
                    </div>

                    {/* profile__info */}
                    <div
                      className="tab-pane fade"
                      id="nav-information"
                      role="tabpanel"
                      aria-labelledby="nav-information-tab"
                    >
                      <UpdateUser/>
                    </div>
                    {/* change password */}
                    <div
                      className="tab-pane fade"
                      id="nav-password"
                      role="tabpanel"
                      aria-labelledby="nav-password-tab"
                    >
                      <ChangePassword/>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-card"
                      role="tabpanel"
                      aria-labelledby="nav-card-tab"
                    >
                      <CropCard />
                    </div>
                    {/*  */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardArea;
