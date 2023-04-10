import React, { useState } from "react";
// internal
import { ShopShortSelect, ShopShortTab, ShowingResult } from "./shop-top-bar";
import ShopSidebar from "@components/common/sidebar/shop-sidebar";
import ProductGridItems from "./prd-grid-items";
import ProductListItems from "./prd-list-items";
import ErrorMessage from "@components/error-message/error";
import ProductLoader from "@components/loader/product-loader";
import SingleProduct from "@components/products/single-product";

const ShopArea = ({ products,all_products,shortHandler,isError, isLoading }) => {

  const tabs = ["Top Rated", "Best Selling", "Latest Products"];
  const [activeTabs, setActiveTabs] = useState("Top Rated");
  const [showingGridItems, setShowingGridItems] = useState(0);
  const [showingListItems, setShowingListItems] = useState(0);
  const [tabActive, setActiveTab] = useState("grid");

  let show_prd = [];
  // decide what to render
  let content = null;

  const handleTabProduct = (value) => {
    setActiveTabs(value);
  };

  const handleTab = (value) => {
    setActiveTab(value);
  };

  if (isLoading) {
    content = (
      <ProductLoader loading={isLoading} />
    );
  }

  if (!isLoading && isError) {
    content = <ErrorMessage message="There was an error" />;
  }

  if (!isLoading && !isError && products?.length === 0) {
    content = <ErrorMessage message="No products found!" />;
  }

  if (!isLoading && !isError && products?.length > 0) {

  const prd_items = products;
  for(let i=0;i<prd_items.length;i++){
    if(prd_items[i].type == activeTabs){
      show_prd.push(prd_items[i])
    }
  }
}

  // content = show_prd.map((product) => (
  //   <div key={product._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
  //     <SingleProduct product={product} />
  //   </div>
  // ));

  return (
    <section className="shop__area pb-60">
      <div className="container">
        <div className="shop__top mb-50">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-5">
              <ShowingResult
                show={
                  tabActive === "grid" ? showingGridItems : showingListItems
                }
                total={products.length}
              />
            </div>
            <div className="col-lg-6 col-md-7">
              <div className="shop__sort d-flex flex-wrap justify-content-md-end align-items-center">
              
                <ShopShortSelect shortHandler={shortHandler}/>
              </div>
              
            </div>
          </div>
          
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="product__tab tp-tab  mb-35">
                <ul
                  className="nav nav-tabs justify-content-md-end"
                  id="productTab"
                >
                  {tabs.map((tab, i) => (
                    <li
                      key={i}
                      className="nav-item"
                      onClick={() => handleTabProduct(tab)}
                    >
                      <button
                        className={`nav-link text-capitalize ${
                          activeTabs === tab ? "active" : ""
                        }`}
                        id="top-tab"
                        type="button"
                      >
                        {tab.split("-").join(" ")}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              </div>

       
        <div className="shop__main">
          <div className="row">
            <div className="col-lg-3">
              {/* sidebar start */}
              {/* <ShopSidebar all_products={all_products} /> */}
              {/* sidebar end */}
            </div>
            <div className={`col-lg-12 order-first order-lg-last`}>
              <div className="shop__tab-content mb-40">
                <div className="tab-content" id="shop_tab_content">
                  <ProductGridItems
                    itemsPerPage={9}
                    items={show_prd}
                    setShowingGridItems={setShowingGridItems}
                  />
                  <ProductListItems
                    itemsPerPage={5}
                    items={show_prd}
                    setShowingListItems={setShowingListItems}
                  />
                </div>
                {/* pagination*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopArea;
