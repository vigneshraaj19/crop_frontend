import React, { useEffect } from "react";
import { useRouter } from "next/router";
// internal
import SEO from "@components/seo";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import Footer from "@layout/footer";
import { useGetUserOrdersQuery } from "src/redux/features/orderApi";
import DashboardArea from "@components/user-dashboard/dashboard-area";
import Loader from "@components/loader/loader";

const UserOrders = () => {
  const {
    data: orderData,
    isError,
    isLoading,
    error,
    refetch,
  } = useGetUserOrdersQuery();
  
  const router = useRouter();
  useEffect(() => {
    const isAuthenticate = localStorage.getItem("auth");
    if (!isAuthenticate) {
      router.push("/login");
    }
    if (orderData) {
      refetch();
    }
  }, [router, orderData, refetch]);
  if (isLoading) {
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Loader loading={isLoading} />
    </div>;
  }

  return (
    <Wrapper>
      <SEO pageTitle={"User Dashboard"} />
      <Header style_2={true} />
      <DashboardArea orderData={orderData} />
      <Footer />
    </Wrapper>
  );
};

export default UserOrders;
