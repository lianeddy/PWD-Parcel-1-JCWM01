import React from "react";
import RestockProduct from "../../components/adminComponents/RestockProduct";
import "./Restock.css";

function Restock() {
  return (
    <div className="restock-list">
      <div className="restock-widget">
        <RestockProduct />
      </div>
    </div>
  );
}

export default Restock;
