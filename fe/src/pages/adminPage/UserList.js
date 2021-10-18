import React from "react";
import TestMysql from "../../components/adminComponents/TestMysql";
import WidgetBigOrder from "../../components/adminComponents/WidgetBigOrder";
import WidgetSmall from "../../components/adminComponents/WidgetSmall";
import "./UserList.css";

function UserList() {
  return (
    <div className="user-list">
      {/* <TestMysql /> */}
      <div className="user-widget">
        <WidgetSmall />
        <WidgetBigOrder />
      </div>
    </div>
  );
}

export default UserList;
