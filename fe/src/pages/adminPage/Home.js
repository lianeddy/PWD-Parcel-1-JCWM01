import React from "react";
import Chart from "../../components/adminComponents/Chart";
import FeaturedInfo from "../../components/adminComponents/FeaturedInfo";
import "./Home.css";
import { userData } from "../../components/adminComponents/dummyData";
import WidgetSmall from "../../components/adminComponents/WidgetSmall";
import WidgetBig from "../../components/adminComponents/WidgetBig";

function Home() {
  return (
    <div className="home">
      {/* <FeaturedInfo /> */}
      <Chart />
      {/* <div className="home-widgets">
        <WidgetSmall />
        <WidgetBig />
      </div> */}
    </div>
  );
}

export default Home;
