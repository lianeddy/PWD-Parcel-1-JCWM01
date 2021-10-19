import React from "react";
import "./WidgetSmall.css";

function WidgetSmall() {
  return (
    <div className="widget-small">
      <span className="wid-sm-title">New Join Members </span>
      <ul className="wid-sm-list">
        <li className="wid-sm-list-item">
          <img
            src="https://images.unsplash.com/photo-1634458328992-01e6ac742e4a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="wid-sm-img"
          />
          <div className="wid-sm-user">
            <span className="wid-sm-user-name">Anna Keller</span>
            <span className="wid-sm-user-title">Software Engineer</span>
          </div>
          <button className="wid-sm-button">
            <i className="far fa-eye"></i>
            <p className="wid-sm-button-text">Display</p>
          </button>
        </li>
        <li className="wid-sm-list-item">
          <img
            src="https://images.unsplash.com/photo-1634458328992-01e6ac742e4a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="wid-sm-img"
          />
          <div className="wid-sm-user">
            <span className="wid-sm-user-name">Anna Keller</span>
            <span className="wid-sm-user-title">Software Engineer</span>
          </div>
          <button className="wid-sm-button">
            <i className="far fa-eye"></i>
            <p className="wid-sm-button-text">Display</p>
          </button>
        </li>
        <li className="wid-sm-list-item">
          <img
            src="https://images.unsplash.com/photo-1634458328992-01e6ac742e4a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="wid-sm-img"
          />
          <div className="wid-sm-user">
            <span className="wid-sm-user-name">Anna Keller</span>
            <span className="wid-sm-user-title">Software Engineer</span>
          </div>
          <button className="wid-sm-button">
            <i className="far fa-eye"></i>
            <p className="wid-sm-button-text">Display</p>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default WidgetSmall;
