import React from "react";
import AdminTopNavComponent from "../../components/admin/AdminTopNavComponent";
import AdminSidebarNavComponent from "../../components/admin/AdminSidebarNavComponent";

const AdminLayoutComponent = (props) => {
  return (
    <div>
      <AdminSidebarNavComponent />
      <div className="ml-0 md:ml-64">
        <AdminTopNavComponent />
        {props.children}
      </div>
    </div>
  );
};

export default AdminLayoutComponent;
