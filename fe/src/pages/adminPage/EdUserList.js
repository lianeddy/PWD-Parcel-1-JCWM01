import React from "react";
import TestMysql from "../../components/adminComponents/TestMysql";
import EdWidgetBigOrder from "../../components/adminComponents/EdWidgetBigOrder";
import WidgetSmall from "../../components/adminComponents/WidgetSmall";
import "./EdUserList.css";

function EdUserList() {
  return (
    <div className="user-list">
      <p>Edited</p>
      {/* <TestMysql /> */}
      <div className="user-widget">
        {/* <WidgetSmall /> */}
        <EdWidgetBigOrder />
      </div>
    </div>
  );
}

export default EdUserList;
