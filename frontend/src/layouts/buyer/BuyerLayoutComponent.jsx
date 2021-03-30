import React from "react";
import BuyerSidebarNavComponent from "../../components/buyer/BuyerSidebarNavComponent";
import BuyerTopNavComponent from "../../components/buyer/BuyerTopNavComponent";

const BuyerLayoutComponent = (props) => {
  return (
    <div>
      <BuyerSidebarNavComponent />
      <div className="ml-0 md:ml-64">
        <BuyerTopNavComponent />
        {props.children}
      </div>
    </div>
  );
};

export default BuyerLayoutComponent;
