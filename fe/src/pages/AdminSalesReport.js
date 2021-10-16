import React from "react";
import SalesReport from "../components/adminComponents/SalesReport";
import Sidebar from "../components/adminComponents/Sidebar";
import Home from "./adminPage/Home";

function AdminSalesReport() {
  return (
    <>
      {/* <SalesReport /> */}
      <div className="container" style={{ display: "flex" }}>
        <Sidebar />
        <Home />
      </div>
    </>
  );
}

export default AdminSalesReport;
