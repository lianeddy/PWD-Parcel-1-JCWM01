import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-menu">
          <h3 className="sidebar-title">Dashboard</h3>
          <ul className="sidebar-list">
            <li className="sidebar-list-item active">
              <i className="fas fa-home" />
              Home
            </li>
            <li className="sidebar-list-item">
              <i className="fas fa-chart-line" />
              Analytics
            </li>
            <li className="sidebar-list-item">
              <i className="fas fa-chart-bar" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebar-menu">
          <h3 className="sidebar-title">Quick Menu</h3>
          <ul className="sidebar-list">
            <li className="sidebar-list-item active">
              <i className="fas fa-home" />
              Home
            </li>
            <li className="sidebar-list-item">
              <i className="fas fa-chart-line" />
              Analytics
            </li>
            <li className="sidebar-list-item">
              <i className="fas fa-chart-bar" />
              Sales
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
