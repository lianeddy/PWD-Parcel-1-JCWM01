import React from "react";
import "./FeaturedInfo.css";

function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="fe-item">
        <span className="fe-title">Revenue</span>
        <div className="fe-money-container">
          <span className="fe-money">$2.405</span>
          <span className="fe-money-rate ">-11.4</span>
          <i className="fas fa-chevron-up" />
        </div>
        <span className="fe-sub">Compared to last month</span>
      </div>
      <div className="fe-item">
        <span className="fe-title">Sales</span>
        <div className="fe-money-container">
          <span className="fe-money">$2.405</span>
          <span className="fe-money-rate ">-11.4</span>
          <i className="fas fa-chevron-down" />
        </div>
        <span className="fe-sub">Compared to last month</span>
      </div>
      <div className="fe-item">
        <span className="fe-title">Cost</span>
        <div className="fe-money-container">
          <span className="fe-money">$2.405</span>
          <span className="fe-money-rate ">-11.4</span>
          <i className="fas fa-chevron-up" />
        </div>
        <span className="fe-sub">Compared to last month</span>
      </div>
    </div>
  );
}

export default FeaturedInfo;
