import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-menu">
          <h3 className="sidebar-title">Dashboard</h3>
          <ul className="sidebar-list">
            <li className="sidebar-list-item active">
              <Link to="/admin/salesreport" className="side-link">
                <i className="fas fa-home" />
                <p className="side-link-text">Home</p>
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/admin/salesreport/users" className="side-link">
                <i className="fas fa-chart-line" />
                <p className="side-link-text">Graph</p>
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/admin/salesreport/users" className="side-link">
                <i className="fas fa-chart-bar" />
                <p className="side-link-text">Graph</p>
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className="sidebar-menu">
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
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;