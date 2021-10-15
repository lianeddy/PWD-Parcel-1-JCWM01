import React from "react";
import SalesReport from "../components/SalesReport";
import Sidebar from "../components/Sidebar";

function AdminSalesReport() {
  return (
    <>
      {/* <SalesReport /> */}
      <div className="container" style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: "4" }}>other page</div>
      </div>
    </>
  );
}

export default AdminSalesReport;
