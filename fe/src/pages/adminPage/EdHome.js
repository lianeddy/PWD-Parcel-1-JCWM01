import React from "react";
import EdChart from "../../components/adminComponents/EdChart";
import "./EdHome.css";

function EdHome() {
  return (
    <div className="ed-home">
      <p>Edited</p>
      {/* <FeaturedInfo /> */}
      <EdChart />
      {/* <div className="home-widgets">
        <WidgetSmall />
        <WidgetBig />
      </div> */}
    </div>
  );
}

export default EdHome;
