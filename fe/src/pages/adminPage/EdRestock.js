import React from "react";
import EdRestockProduct from "../../components/adminComponents/EdRestockProduct";
import "./EdRestock.css";

function EdRestock() {
  return (
    <div className="restock-list">
      <p>Edited</p>
      <div className="restock-widget">
        <EdRestockProduct />
      </div>
    </div>
  );
}

export default EdRestock;
